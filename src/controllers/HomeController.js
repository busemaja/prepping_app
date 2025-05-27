/**
 * @file Defines the HomeController class.
 * @module controllers/HomeController
 * @author Maria Jansson
 */

// import { handle404 } from '../../middlewares/errors/error404.js'

/**
 * Encapsulates a controller.
 */
export class HomeController {
  /**
   * Handles GET requests to the / endpoint.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  index (req, res, next) {
    res.render('home/index')
  }

  /**
   * Handles GET requests to the /om endpoint.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  about (req, res, next) {
    res.render('home/about')
  }

  /**
   * Handles GET requests to the /kallor endpoint.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  sources (req, res, next) {
    res.render('home/sources')
  }
}
