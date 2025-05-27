/**
 * @file Middleware to handle JSON parsing errors.
 * @module middlewares/syntaxErrorHandler
 * @author Maria Jansson
 */

import { handle400 } from './error400.js'

/**
 * Middleware to handle JSON parsing errors (SyntaxError).
 *
 * @param {object} err - The error object.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
export const syntaxErrorHandler = (err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    handle400(err, next)
  } else {
    next(err)
  }
}
