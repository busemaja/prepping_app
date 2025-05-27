/**
 * @file Defines the checklist router.
 * @module checklistRouter
 * @author Maria Jansson
 */

import express from 'express'
import { ChecklistController } from '../controllers/ChecklistController.js'
import { JsonWebToken } from '../lib/JsonWebToken.js'

export const router = express.Router()

const controller = new ChecklistController()

router.post('/:type', JsonWebToken.authenticateJWT, (req, res, next) => controller.updateList(req, res, next))
