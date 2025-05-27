/**
 * @file Starts the Express server.
 * @module src/server
 * @author Maria Jansson
 */

// Module imports
import app from './app.js'

try {
  const server = app.listen(process.env.PORT, () => {
    console.info(`Server running at http://localhost:${server.address().port}`)
    console.info('Press Ctrl-C to terminate...')
  })
} catch (err) {
  console.error(err.message)
  process.exitCode = 1
}
