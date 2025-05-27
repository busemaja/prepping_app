/**
 * @file Defines the main router.
 * @module routes/router
 * @author Maria Jansson
 */

import express from 'express'
import { handle404 } from '../middlewares/errors/error404.js'
import { router as homeRouter } from './homeRouter.js'
import { router as prepareRouter } from './prepareRouter.js'
import { router as emergencyRouter } from './emergencyRouter.js'
import { router as userRouter } from './userRouter.js'
import { router as checklistRouter } from './checklistRouter.js'

export const router = express.Router()

router.use('/', homeRouter)
router.use('/redo', prepareRouter)
router.use('/akut', emergencyRouter)
router.use('/konto', userRouter)
router.use('/checklist', checklistRouter)

// Catch 404 (ALWAYS keep this as the last route).
router.use(handle404)
