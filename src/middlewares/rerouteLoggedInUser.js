/**
 * Middleware to reroute logged-in users to their dashboard if they try to access the login or register page.
 *
 * @file Defines the rerouteLoggedInUser middleware.
 * @module middleware/rerouteLoggedInUser
 * @author Maria Jansson
 */

/**
 * Reroute logged-in users to their dashboard.
 *
 * @returns {Function} Express middleware function.
 */
export function rerouteLoggedInUser () {
  return (req, res, next) => {
    if (req.session.user && req.cookies['access-token']) {
      const { username } = req.session.user
      // Only redirect if not already on the dashboard
      if (req.originalUrl !== `./konto/${username}`) {
        return res.redirect(`./konto/${username}`)
      }
    } else {
      // User is not logged in, proceed to the next middleware
      next()
    }
  }
}
