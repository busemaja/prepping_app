/**
 * @file Defines the database connection and models for the application.
 * This file initializes Sequelize and loads all models in the directory.
 * @module models/index
 * @author Maria Jansson
 */

import { readdirSync } from 'fs'
import { basename as _basename, join, dirname } from 'path'
import { fileURLToPath, pathToFileURL } from 'url'
import { DataTypes } from 'sequelize'
import sequelize from '../config/sequelize.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const basename = _basename(__filename)

const database = {
  models: {}
}

const files = readdirSync(__dirname).filter(
  file =>
    file.indexOf('.') !== 0 &&
    file !== basename &&
    file.slice(-3) === '.js'
)

// for (const file of files) {
//   const module = await import(pathToFileURL(join(__dirname, file)).href)
//   if (!module.modelName || !module.default) continue
//   const defineModel = module.default
//   const model = defineModel(sequelize, DataTypes)
//   database[module.modelName] = model
// }

for (const file of files) {
  const module = await import(pathToFileURL(join(__dirname, file)).href)
  if (!module.modelName || !module.default) continue
  const model = module.default(sequelize, DataTypes)
  database.models[module.modelName] = model
}

// Connect models to each other
// for (const modelName of Object.keys(database)) {
//   if (database[modelName].associate) {
//     database[modelName].associate(database)
//   }
// }
for (const modelName of Object.keys(database.models)) {
  if (database.models[modelName].associate) {
    database.models[modelName].associate(database.models)
  }
}

database.sequelize = sequelize

if (process.env.NODE_ENV === 'development') {
  // Sync the database with the models
  // This will create the tables if they do not exist
  // and drop them if they do exist
  database.sequelize.sync({ force: true })
  console.log('Database synced')
}

export default database
