/**
 * @file Defines the UserController class.
 * @module controllers/UserController
 * @author Maria Jansson
 */

// import { handle404 } from '../../middlewares/errors/error404.js'
import bcrypt from 'bcryptjs'
import { JsonWebToken } from '../lib/JsonWebToken.js'
import database from '../models/index.js'
const { User, FireChecklist, FloodChecklist, PoweroutageChecklist, StormChecklist } = database.models

/**
 * Encapsulates a controller.
 */
export class UserController {
  /**
   * Handles GET requests to the / endpoint.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  entry (req, res, next) {
    res.render('user/entry')
  }

  /**
   * Handles POST requests to the /register endpoint.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @returns {Promise<void>} - A promise that resolves when the registration is successful.
   */
  async register (req, res, next) {
    try {
      const { username, password } = req.body
      if (username.length < 3) {
        throw new Error('Användarnamnet måste vara minst 3 tecken långt.')
      }
      if (password.length < 12) {
        throw new Error('Lösenordet är för kort.')
      }
      // Hash the password and create the user with 4 checklists.
      const passwordHash = await bcrypt.hash(password, 10)
      const user = await User.create({ username, passwordHash })
      await Promise.all([
        user.createFireChecklist({ userId: user.id }),
        user.createFloodChecklist({ userId: user.id }),
        user.createPoweroutageChecklist({ userId: user.id }),
        user.createStormChecklist({ userId: user.id })
      ])
      if (req.headers.accept?.includes('application/json')) {
        return res.status(201).json()
      } else {
        req.session.flash = { type: 'success', text: 'Konto skapat!' }
        res.redirect('.')
      }
    } catch (error) {
      console.log(error)
      if (error.name === 'SequelizeUniqueConstraintError') {
        if (req.headers.accept?.includes('application/json')) {
          return res.status(400).json()
        } else {
          req.session.flash = { type: 'danger', text: 'Det användarnamnet är redan taget.' }
          res.redirect('.')
        }
      } else if (error.message === 'Lösenordet är för kort.') {
        if (req.headers.accept?.includes('application/json')) {
          return res.status(400).json()
        } else {
          req.session.flash = { type: 'danger', text: error.message }
          res.redirect('.')
        }
      } else {
        if (req.headers.accept?.includes('application/json')) {
          return res.status(400).json()
        } else {
          req.session.flash = { type: 'danger', text: error.message }
          res.redirect('.')
        }
      }
    }
  }

  /**
   * Handles POST requests to the /login endpoint.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @returns {Promise<void>} - A promise that resolves when the login is successful.
   */
  async login (req, res, next) {
    try {
      const { username, password } = req.body
      const user = await User.findOne({ where: { username } })
      if (!user) {
        throw new Error('Ogiltiga uppgifter.')
      }
      const isPasswordValid = await bcrypt.compare(password, user.passwordHash)
      if (!isPasswordValid) {
        throw new Error('Ogiltiga uppgifter.')
      }
      // Convert Sequelize instance to plain object
      const userPlainObject = user.get({ plain: true })
      const accessToken = await JsonWebToken.issueJWT(userPlainObject, process.env.ACCESS_TOKEN_LIFE)
      // Set the JWT as an HTTP-only cookie
      res.cookie('access-token', accessToken, {
        httpOnly: true, // Prevents JavaScript access
        secure: process.env.NODE_ENV === 'production', // Ensures cookies are sent over HTTPS in production
        maxAge: parseInt(process.env.ACCESS_TOKEN_LIFE) * 60 * 60 * 1000 // Set cookie expiration
      })

      if (req.headers.accept?.includes('application/json')) {
        return res.status(200).json({ token: accessToken })
      } else {
        // Save user info in session
        // req.session.user = { username: userPlainObject.username }
        req.session.user = { username }
        console.log('REQ SESSION USER:', req.session.user)
        // Redirect to the user's dashboard
        res.redirect(`./${username}`)
      }
    } catch (error) {
      console.log(error)
      if (req.headers.accept?.includes('application/json')) {
        return res.status(401).json()
      } else {
        req.session.flash = { type: 'danger', text: error.message }
        res.redirect('.')
      }
    }
  }

  /**
   * Handles GET requests to the /:username endpoint.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @returns {Promise<void>} - A promise that resolves when the dashboard is successfully rendered.
   */
  async dashboard (req, res, next) {
    try {
      const username = req.session.user.username
      const user = await User.findOne({
        where: { username },
        include: [
          { model: FireChecklist, as: 'fireChecklist' },
          { model: FloodChecklist, as: 'floodChecklist' },
          { model: PoweroutageChecklist, as: 'poweroutageChecklist' },
          { model: StormChecklist, as: 'stormChecklist' }
        ]

      })

      res.render('user/dashboard', {
        viewData: {
          username,
          checklists: [
            { name: 'Brand', data: user.fireChecklist?.get({ plain: true }) },
            { name: 'Översvämning', data: user.floodChecklist?.get({ plain: true }) },
            { name: 'Strömavbrott', data: user.poweroutageChecklist?.get({ plain: true }) },
            { name: 'Storm', data: user.stormChecklist?.get({ plain: true }) }
          ]
        }
      })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Handles GET requests to the /:username/logout endpoint.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @returns {Promise<void>} - A promise that resolves when the logout is successful.
   */
  async logout (req, res, next) {
    try {
      // Clear the JWT cookie
      res.clearCookie('access-token')
      // Destroy the session
      req.session.destroy((err) => {
        if (err) {
          console.error('Error destroying session:', err)
          return res.status(500).json({ error: 'Internal server error' })
        }
        // Redirect to the entry page
        res.redirect(`${process.env.BASE_URL}`)
      })
    } catch (error) {
      console.log(error)
      req.session.flash = { type: 'danger', text: error.message }
      res.redirect(`${process.env.BASE_URL}`)
    }
  }
}
