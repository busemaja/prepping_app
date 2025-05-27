/**
 * @file Middleware to handle errors.
 * @module middlewares/errorHandler
 * @author Maria Jansson
 */

import http from 'node:http'

/**
 * Middleware to handle errors thrown in the app.
 *
 * @param {object} err - The error object.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void} The response object.
 */
export const errorHandler = (err, req, res, next) => {
  console.error(err.message, { error: err })

  if (process.env.NODE_ENV === 'production') {
    // Ensure a valid status code is set for the error.
    // If the status code is not provided, default to 500 (Internal Server Error).
    // This prevents leakage of sensitive error details to the client.
    if (!err.status) {
      err.status = 500
      err.message = http.STATUS_CODES[err.status]
      err.message = 'An unexpected condition was encountered.'
    }

    // Send only the error message and status code to prevent leakage of
    // sensitive information.
    res
      .status(err.status)
      .json({
        status: err.status,
        message: err.message
      })

    return
  }

  // ---------------------------------------------------
  // ⚠️ WARNING: Development Environment Only!
  //             Detailed error information is provided.
  // ---------------------------------------------------

  // Deep copies the error object and returns a new object with
  // enumerable and non-enumrele properties (cyclical structures are handled).
  const copy = JSON.decycle(err, { includeNonEnumerableProperties: true })

  return res
    .status(err.status || 500)
    .json(copy)
}
