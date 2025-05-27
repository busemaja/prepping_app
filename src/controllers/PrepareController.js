/**
 * @file Defines the PrepareController class.
 * @module controllers/PrepareController
 * @author Maria Jansson
 */

/**
 * Encapsulates a controller.
 */
export class PrepareController {
  /**
   * Handles GET requests to the /redo endpoint.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  index (req, res, next) {
    res.render('prepare/index')
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
    res.render(`prepare/${category}`)
  }
}
