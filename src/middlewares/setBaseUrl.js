/**
 * @file Middleware to make the base URL available to all views.
 * @module middlewares/setBaseUrl
 * @author Maria Jansson
 */

/**
 * Middleware to make the base URL available to all views.
 *
 * @param {string} baseURL - The base URL of the application (from environment or default).
 * @returns {Function} Express middleware function that sets res.locals.baseURL.
 */
export function setBaseUrl (baseURL) {
  return (req, res, next) => {
    res.locals.baseURL = baseURL

    next()
  }
}
