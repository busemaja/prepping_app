/**
 * @file Defines the FloodChecklist model.
 * @module models/FloodChecklist.js
 * @author Maria Jansson
 */

export const modelName = 'FloodChecklist'

/**
 * Defines the FloodChecklist model.
 *
 * @param {object} sequelize - The Sequelize instance.
 * @param {object} DataTypes - The Sequelize data types.
 * @returns {object} The FloodChecklist model.
 */
export default (sequelize, DataTypes) => {
  const FloodChecklist = sequelize.define(modelName, {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    vattentät_förvaring_för_viktiga_dokument: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    vattentät_förvaring_för_småelektronik: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    dricksvatten: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    konserver_och_torrvaror: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    gummistövlar_och_regnkläder: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    powerbank_och_extra_batterier: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    ficklampa_eller_huvudlampa: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    första_hjälpen_kit: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    hygienartiklar_inkl_våtservetter_och_hårdtvål: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    evakueringsplan_och_väskor: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    lista_över_viktiga_telefonnummer: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    sandsäckar_eller_vattenbarriärer_om_möjligt_och_nödvändigt: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  })

  /**
   * Associates the FloodChecklist model with other models.
   *
   * @param {object} models - The models available for association.
   */
  FloodChecklist.associate = (models) => {
    FloodChecklist.belongsTo(models.User, { foreignKey: 'userId', as: 'user' })
  }

  return FloodChecklist
}
