/**
 * @file Defines the User Sequelize model.
 * @module models/User
 * @author Maria Jansson
 */

export const modelName = 'User'

/**
 * Defines the User model.
 *
 * @param {object} sequelize - The Sequelize instance.
 * @param {object} DataTypes - The DataTypes object from Sequelize.
 * @returns {object} The User model.
 */
export default (sequelize, DataTypes) => {
  const User = sequelize.define(modelName, {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false
    }
  })

  /**
   * Associates the User model with other models.
   *
   * @param {object} models - The models to associate with.
   */
  User.associate = (models) => {
    User.hasOne(models.FireChecklist, { foreignKey: 'userId', as: 'fireChecklist' })
    User.hasOne(models.FloodChecklist, { foreignKey: 'userId', as: 'floodChecklist' })
    User.hasOne(models.PoweroutageChecklist, { foreignKey: 'userId', as: 'poweroutageChecklist' })
    User.hasOne(models.StormChecklist, { foreignKey: 'userId', as: 'stormChecklist' })
  }

  return User
}
