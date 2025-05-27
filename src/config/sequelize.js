/**
 * @file Defines the configuration of Sequelize.
 * @module config/sequelize
 * @author Maria Jansson
 */

import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

// Load environment variables from .env file
dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` })

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: process.env.DB_DIALECT || 'mariadb',
    logging: false
    // logging: console.log
  }
)

export default sequelize
