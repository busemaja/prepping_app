/**
 * @file This module contains the options object for the session middleware.
 * @module sessionOptions
 * @author Maria Jansson
 */

import session from 'express-session'
import connectSessionSequelize from 'connect-session-sequelize'
import db from '../models/index.js'

const SequelizeStore = connectSessionSequelize(session.Store)

const store = new SequelizeStore({
  db: db.sequelize,
  tableName: 'Sessions',
  checkExpirationInterval: 15 * 60 * 1000, // cleanup expired sessions every 15 minutes
  expiration: 24 * 60 * 60 * 1000 // 1 day
})

export const sessionOptions = {
  name: process.env.SESSION_NAME,
  secret: process.env.SESSION_SECRET,
  store,
  resave: false, // Resave even if a request is not changing the session.
  saveUninitialized: false, // Don't save a created but not modified session.
  cookie: {
    httpOnly: true, // Reduce XSS attack vector.
    maxAge: 1000 * 60 * 60 * 24,
    sameSite: 'strict'
  }
}

if (process.env.NODE_ENV === 'production') {
  sessionOptions.cookie.secure = true
}
