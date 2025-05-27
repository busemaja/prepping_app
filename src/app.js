/**
 * @file Defines and exports the Express app
 * @module src/app
 * @author Maria Jansson
 */

// Module imports
import '@lnu/json-js-cycle'
import express from 'express'
import expressLayouts from 'express-ejs-layouts'
import session from 'express-session'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { morganLogger } from './config/morgan.js'
import { router } from './routes/router.js'
import { errorHandler } from './middlewares/errors/errorHandler.js'
import { syntaxErrorHandler } from './middlewares/errors/syntaxErrorHandler.js'
import { setBaseUrl } from './middlewares/setBaseUrl.js'
import { sessionOptions } from './config/sessionOptions.js'
import { setSession } from './middlewares/setSession.js'
import hasAccessToken from './middlewares/hasAccessToken.js'

// Create an Express application.
const app = express()

// Set various HTTP headers to make the application little more secure (https://www.npmjs.com/package/helmet).
app.use(helmet())

// Parse requests of the content type application/json.
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Use a morgan logger.
app.use(morganLogger)

// Get the directory name of this module's path.
const directoryFullName = dirname(fileURLToPath(import.meta.url))

// Set the base URL to use for all relative URLs in a document if one is present in .env.
const baseURL = process.env.BASE_URL || '/'

// View engine setup.
app.set('view engine', 'ejs')
app.set('views', join(directoryFullName, 'views'))
app.set('layout', join(directoryFullName, 'views', 'layouts', 'default'))
app.set('layout extractScripts', true)
app.set('layout extractStyles', true)
app.use(expressLayouts)

// Serve static files.
app.use(baseURL, express.static(join(directoryFullName, '..', 'public')))

// Setup and use session middleware (https://github.com/expressjs/session)
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1) // trust first proxy
}
sessionOptions.store.sync() // Sync the session store with the database.
app.use(session(sessionOptions))
app.use(setSession())

// Add cookie-parser middleware
app.use(cookieParser())

// Set the base URL for all views.
app.use(setBaseUrl(baseURL))

// Use hasAccessToken middleware BEFORE registering routes so res.locals.hasAccessToken is available in all views
app.use(hasAccessToken)

// Register routes.
app.use(baseURL, router)

// Handle 400 errors caused by JSON parsing.
app.use(syntaxErrorHandler)

// Generic error handler.
app.use(errorHandler)

export default app
