/**
 * @file  Provides helper methods for working with JSON Web Tokens (JWTs).
 * @module lib/JsonWebTokens
 * @author Mats Loock
 * @author Maria Jansson
 * @version 1.0.2
 */

import fs from 'fs'
import path from 'path'
import jwt from 'jsonwebtoken'

let cachedPrivateKey
let cachedPublicKey

/**
 * Reads and caches the private key used for signing JWTs.
 *
 * @returns {string} The private key.
 * @throws {Error} If the environment variable is not set or file cannot be read.
 */
function getPrivateKey () {
  if (!cachedPrivateKey) {
    if (!process.env.JWT_PRIVATE_KEY_PATH) {
      throw new Error('Missing environment variable: JWT_PRIVATE_KEY_PATH')
    }
    cachedPrivateKey = fs.readFileSync(path.resolve(process.env.JWT_PRIVATE_KEY_PATH), 'utf8')
  }
  return cachedPrivateKey
}

/**
 * Reads and caches the public key used for verifying JWTs.
 *
 * @returns {string} The public key.
 * @throws {Error} If the environment variable is not set or file cannot be read.
 */
function getPublicKey () {
  if (!cachedPublicKey) {
    if (!process.env.JWT_PUBLIC_KEY_PATH) {
      throw new Error('Missing environment variable: JWT_PUBLIC_KEY_PATH')
    }
    cachedPublicKey = fs.readFileSync(path.resolve(process.env.JWT_PUBLIC_KEY_PATH), 'utf8')
  }
  return cachedPublicKey
}

/**
 * Exposes methods for working with JSON Web Tokens (JWTs).
 */
export class JsonWebToken {
  /**
   * Encodes user information into a JSON Web Token (JWT) payload.
   *
   * @param {object} user - The user object containing user information to encode.
   * @param {string|number} expiresIn - The expiration time for the JWT, specified in seconds or as a string describing a time span (e.g., '1d', '2h') using the vercel/ms library.
   * @returns {Promise<string>} A Promise that resolves to the generated JWT.
   */
  static async issueJWT (user, expiresIn) {
    const payload = {
      sub: user.id, // Unique identifier for the user (e.g., database ID)
      username: user.username, // Username for identification
      iat: Math.floor(Date.now() / 1000) // Issued at timestamp (optional but recommended)
    }

    return new Promise((resolve, reject) => {
      jwt.sign(payload, getPrivateKey(), { algorithm: 'RS256', expiresIn }, (error, token) => {
        if (error) {
          reject(error)
          return
        }
        resolve(token)
      })
    })
  }

  /**
   * Authenticates a request based on a JSON Web Token (JWT).
   *
   * This middleware checks the authorization header of the request, verifies the authentication scheme,
   * decodes the JWT using the provided secret key, and attaches the decoded user object to the `req.user` property.
   * If the authentication fails, an unauthorized response with a 401 Unauthorized status code is sent.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @returns {Promise<void>} - A promise that resolves when the user is authenticated or rejects with an error.
   */
  static async authenticateJWT (req, res, next) {
    try {
      let token

      // Check for the token in the Authorization header
      if (req.headers.authorization) {
        const [authenticationScheme, extractedToken] = req.headers.authorization.split(' ')
        if (authenticationScheme !== 'Bearer') {
          throw new Error('Invalid authentication scheme.')
        }
        token = extractedToken
      }

      // If no token in the Authorization header, check the cookies
      if (!token && req.cookies['access-token']) {
        token = req.cookies['access-token']
      }

      if (!token) {
        throw new Error('No token provided.')
      }

      // Verify the token
      req.user = await JsonWebToken.verifyToken(token)

      next()
    } catch (error) {
      // Authentication failed
      req.session.flash = { type: 'danger', text: 'Du måste logga in för att se den sidan.' }
      console.log('Authentication failed:', error.message)
      res.redirect('/krisguiden/konto')
    }
  }

  /**
   * Verifies a JSON Web Token (JWT) and decodes its payload.
   *
   * @param {string} token - The JWT to verify.
   * @returns {Promise<object>} A Promise that resolves to the decoded payload if the token is valid.
   * @throws {Error} If the token is invalid or verification fails.
   */
  static async verifyToken (token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, getPublicKey(), { algorithms: ['RS256'] }, (error, decoded) => {
        if (error) {
          reject(error)
          return
        }
        const user = {
          id: decoded.sub,
          username: decoded.username,
          issuedAt: decoded.iat
        }

        resolve(user)
      })
    })
  }
}
