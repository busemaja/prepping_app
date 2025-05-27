/**
 * @file Defines the user router.
 * @module userRouter
 * @author Maria Jansson
 */

import express from 'express'
import { UserController } from '../controllers/UserController.js'
import { JsonWebToken } from '../lib/JsonWebToken.js'
import { rerouteLoggedInUser } from '../middlewares/rerouteLoggedInUser.js'

export const router = express.Router()

const controller = new UserController()

router.get('/', rerouteLoggedInUser(), (req, res, next) => controller.entry(req, res, next))

router.post('/register', (req, res, next) => controller.register(req, res, next))
router.post('/login', (req, res, next) => controller.login(req, res, next))

router.get('/:username', JsonWebToken.authenticateJWT, (req, res, next) => controller.dashboard(req, res, next))
router.get('/:username/logout', (req, res, next) => controller.logout(req, res, next))
