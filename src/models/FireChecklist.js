/**
 * @file Defines the FireChecklist model.
 * @module models/FireChecklist.js
 * @author Maria Jansson
 */

export const modelName = 'FireChecklist'

/**
 * Defines the FireChecklist model.
 *
 * @param {object} sequelize - The Sequelize instance.
 * @param {object} DataTypes - The Sequelize data types.
 * @returns {object} The FireChecklist model.
 */
export default (sequelize, DataTypes) => {
  const FireChecklist = sequelize.define(modelName, {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    brandsläckare: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    brandfilt: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    brandvarnare: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    utrymningsplan_och_packade_väskor: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    lista_över_viktiga_telefonnummer: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    första_hjälpen_kit: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    laddad_och_fungerande_mobil: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    mapp_med_viktiga_dokument_att_ta_med: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  })

  /**
   * Associates the FireChecklist model with other models.
   *
   * @param {object} models - The models available for association.
   */
  FireChecklist.associate = (models) => {
    FireChecklist.belongsTo(models.User, { foreignKey: 'userId', as: 'user' })
  }

  return FireChecklist
}
