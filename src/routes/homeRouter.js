/**
 * @file Defines the home router.
 * @module homeRouter
 * @author Maria Jansson
 */

import express from 'express'
import { HomeController } from '../controllers/HomeController.js'

export const router = express.Router()

const controller = new HomeController()

router.get('/', (req, res, next) => controller.index(req, res, next))
router.get('/om', (req, res, next) => controller.about(req, res, next))
router.get('/kallor', (req, res, next) => controller.sources(req, res, next))
