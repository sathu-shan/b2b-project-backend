const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db'); // Path to your sequelize configuration

class Investor extends Model {}


Investor.init({
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
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
    allowNull: true,
  },

  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  companyRole: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  numberOfEmployees: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },

  assetsUnderManagement: {
    type: DataTypes.DECIMAL,
    allowNull: true,
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
    type: DataTypes.JSON,
    allowNull: false,
  },

  investmentTypeDescription: {
    type: DataTypes.STRING,
    allowNull:true,
  },

  investmentIndustryPreference1: {
    type: DataTypes.STRING,
    allowNull:false,
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
