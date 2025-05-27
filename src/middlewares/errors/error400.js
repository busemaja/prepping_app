/**
 * @file Middleware to handle 400 errors.
 * @module middlewares/error400
 * @author Maria Jansson
 */

import http from 'node:http'

/**
 * Middleware to handle errors thrown in the app.
 *
 * @param {object} error - The error object.
 * @param {Function} next - The next middleware function.
 */
export const handle400 = (error, next) => {
  const statusCode = 400
  const err = new Error(http.STATUS_CODES[statusCode])
  err.status = statusCode
  err.message = 'The request cannot or will not be processed due to something that is perceived to be a client error (for example, validation error).'
  err.cause = error
  next(err)
}
