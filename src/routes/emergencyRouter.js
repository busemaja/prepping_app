/**
 * @file Defines the emergency router.
 * @module emergencyRouter
 * @author Maria Jansson
 */

import express from 'express'
import { EmergencyController } from '../controllers/EmergencyController.js'

export const router = express.Router()

const controller = new EmergencyController()

router.get('/', (req, res, next) => controller.index(req, res, next))
router.get('/:category', (req, res, next) => controller.handleCrisis(req, res, next))
