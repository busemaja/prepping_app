/**
 * @file Defines the prepare router.
 * @module prepareRouter
 * @author Maria Jansson
 */

import express from 'express'
import { PrepareController } from '../controllers/PrepareController.js'

export const router = express.Router()

const controller = new PrepareController()

router.get('/', (req, res, next) => controller.index(req, res, next))
router.get('/:category', (req, res, next) => controller.handleCrisis(req, res, next))
