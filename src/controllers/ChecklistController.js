/**
 * @file Defines the ChecklistController class.
 * @module controllers/ChecklistController
 * @author Maria Jansson
 */

import database from '../models/index.js'

const { User, FireChecklist, FloodChecklist, PoweroutageChecklist, StormChecklist } = database.models

/**
 *
 */
export class ChecklistController {
  /**
   * Updates a user's checklist of a specific type based on the submitted form data.
   *
   * @param {import('express').Request} req - The Express request object containing session and body data.
   * @param {import('express').Response} res - The Express response object used to redirect after update.
   * @param {Function} next - The next middleware function for error handling.
   */
  async updateList (req, res, next) {
    try {
      const username = req.session.user.username
      const user = await User.findOne({ where: { username } })

      const checklistType = req.params.type
      const modelMap = {
        brand: FireChecklist,
        oversvamning: FloodChecklist,
        stromavbrott: PoweroutageChecklist,
        storm: StormChecklist
      }

      const ChecklistModel = modelMap[checklistType.toLowerCase()]
      if (!ChecklistModel) throw new Error('Ogiltig checklista')

      const checklist = await ChecklistModel.findOne({ where: { userId: user.id } })
      if (!checklist) throw new Error('Checklista ej hittad')

      const updates = {}
      // Use the same cleanName logic as in the EJS
      const cleanName = checklistType.toLowerCase().normalize('NFD').replace(/[^a-z]/g, '')
      for (const key in checklist.toJSON()) {
        if (typeof checklist[key] === 'boolean') {
          const uniqueKey = `${cleanName}_${key}`
          updates[key] = Object.prototype.hasOwnProperty.call(req.body, uniqueKey)
        }
      }

      await checklist.update(updates)
      req.session.flash = { type: 'success', text: 'Lista uppdaterad!' }
      res.redirect(`../konto/${username}`)
    } catch (error) {
      next(error)
    }
  }
}
