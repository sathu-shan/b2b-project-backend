const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db'); // Path to your sequelize configuration

class Investor extends Model {}


Investor.init({
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  companyRole: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  numberOfEmployees: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  assetsUnderManagement: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },

  investorType: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  investorTypeDescription: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  investmentType: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  investmentTypeDescription: {
    type: DataTypes.STRING,
    allowNull:true,
  },

  investmentIndustryPreference1: {
    type: DataTypes.STRING,
    allowNull:true,
  },

  investmentIndustryPreference2: {
    type: DataTypes.STRING,
    allowNull:true,
  },

  investmentIndustryPreference3: {
    type: DataTypes.STRING,
    allowNull:true,
  },

  investmentIndustryPreference4: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'Investor',
});

module.exports = Investor;
