/**
 * @file Middleware to set the session.
 * @module middlewares/setSession
 * @author Maria Jansson
 */

/**
 * Middleware to set session data and make it available to views.
 *
 * @returns {Function} Express middleware function.
 */
export function setSession () {
  return (req, res, next) => {
    if (req.session.flash) {
      res.locals.flash = req.session.flash
      delete req.session.flash
    }

    // Make the session available to all views
    res.locals.session = req.session

    next()
  }
}
