/**
 * @file Defines the PoweroutageChecklist model.
 * @module models/PoweroutageChecklist.js
 * @author Maria Jansson
 */

export const modelName = 'PoweroutageChecklist'

/**
 * Defines the PoweroutageChecklist model.
 *
 * @param {object} sequelize - The Sequelize instance.
 * @param {object} DataTypes - The Sequelize data types.
 * @returns {object} The PoweroutageChecklist model.
 */
export default (sequelize, DataTypes) => {
  const PoweroutageChecklist = sequelize.define(modelName, {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    ficklampa: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    powerbank_och_extra_batterier: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    radio_med_batteri_eller_vev: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    konserver_och_mat_som_inte_behöver_tillagas: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    vatten_för_dryck_och_hygien: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    hygienartiklar_inkl_våtservetter_och_hårdtvål: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    första_hjälpen_kit: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    ljus_och_säkra_behållare: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    tändstickor_eller_tändare: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    filtar_eller_varma_kläder: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    gas_eller_spritkök_med_ventilation: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    torrtoalett_eller_kraftiga_påsar_till_toalett: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    spel_eller_böcker: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    laddad_och_fungerande_mobil: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    lista_över_viktiga_telefonnummer: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  })

  /**
   * Associates the PoweroutageChecklist model with other models.
   *
   * @param {object} models - The models available for association.
   */
  PoweroutageChecklist.associate = (models) => {
    PoweroutageChecklist.belongsTo(models.User, { foreignKey: 'userId', as: 'user' })
  }

  return PoweroutageChecklist
}
