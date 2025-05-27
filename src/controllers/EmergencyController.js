/**
 * @file Defines the EmergencyController class.
 * @module controllers/EmergencyController
 * @author Maria Jansson
 */

// import { handle404 } from '../../middlewares/errors/error404.js'

/**
 * Encapsulates a controller.
 */
export class EmergencyController {
  /**
   * Handles GET requests to the /akut endpoint.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  index (req, res, next) {
    res.render('emergency/index')
  }

  /**
   * Show the crisis page for a specific category.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  handleCrisis (req, res, next) {
    const category = req.params.category
    res.render(`emergency/${category}`)
  }
}
