/**
 * @file Middleware to handle 404 errors.
 * @module middlewares/error404
 * @author Maria Jansson
 */

import http from 'node:http'

/**
 * Middleware to handle errors thrown in the app.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
export const handle404 = (req, res, next) => {
  const statusCode = 404
  const error = new Error(http.STATUS_CODES[statusCode])
  error.status = statusCode
  error.message = 'The requested resource was not found.'
  next(error)
}
