/**
 * Middleware to set hasAccessToken for all views based on the presence of the 'access-token' cookie.
 *
 * @file Defines the hasAccessToken middleware.
 * @module middleware/hasAccessToken
 * @author Maria Jansson
 */

/**
 * Middleware that sets res.locals.hasAccessToken based on the presence of the 'access-token' cookie.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const hasAccessToken = (req, res, next) => {
  res.locals.hasAccessToken = !!req.cookies['access-token']
  next()
}

export default hasAccessToken
