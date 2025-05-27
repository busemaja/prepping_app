/**
 * @file Defines the StormChecklist model.
 * @module models/StormChecklist.js
 * @author Maria Jansson
 */

export const modelName = 'StormChecklist'

/**
 * Defines the StormChecklist model.
 *
 * @param {object} sequelize - The Sequelize instance.
 * @param {object} DataTypes - The Sequelize data types.
 * @returns {object} The StormChecklist model.
 */
export default (sequelize, DataTypes) => {
  const StormChecklist = sequelize.define(modelName, {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    säkra_lösa_föremål_utomhus: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    ficklampa: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    batteri_eller_vevradio: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    powerbank_och_extra_batterier: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    första_hjälpen_kit: {
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
    matförråd_för_minst_72_timmar: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    filtar_eller_varma_kläder: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    evakueringsplan_och_väskor: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    mapp_med_viktiga_dokument_att_ta_med: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    lista_över_viktiga_telefonnummer: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    laddad_och_fungerande_mobil: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    kunskap_om_hur_du_bryter_strömmen_hemma: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    information_om_säkra_utrymmen_i_bostaden: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  })

  /**
   * Associates the StormChecklist model with other models.
   *
   * @param {object} models - The models available for association.
   */
  StormChecklist.associate = (models) => {
    StormChecklist.belongsTo(models.User, { foreignKey: 'userId', as: 'user' })
  }

  return StormChecklist
}
