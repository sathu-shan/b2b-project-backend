const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db'); // Path to your sequelize configuration

class Company extends Model {}

Company.init({
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  companyName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dateOfIncorporation: {
    type: DataTypes.DATE,
    allowNull: false
  },
  partnershipType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  investmentTypeDescription: {
    type: DataTypes.STRING,
    allowNull: true
  },
  elevatorPitch: { 
     type: DataTypes.STRING,
     allowNull: false
  },
  
  partnershipRequirement: {
    type: DataTypes.STRING,
    allowNull: false
  },
  whatOnOffer: { 
    type: DataTypes.STRING,
    allowNull: false
  },
  isSustainable: {
    type: DataTypes.STRING,
    allowNull: false
  },
  numberOfEmployees: {
    type: DataTypes.STRING,
    allowNull: false
  },
  
  productMaturity: {
    type: DataTypes.STRING,
    allowNull: false
  },
  productDescription: {
    type: DataTypes.STRING,
    allowNull: false
  },
  businessProblemSolved: {
    type: DataTypes.STRING,
    allowNull: false
  },
  numberOfInstallations: {
    type: DataTypes.STRING,
    allowNull: false
  },
  productType: {
    type: DataTypes.STRING,
    allowNull: false
  },

  technologyEmployed: {
    type: DataTypes.STRING,
    allowNull: false
  },
  technologyEmployedDescription: {
    type: DataTypes.STRING,
    allowNull: true
  },
  productIndustry1: {
    type: DataTypes.STRING,
    allowNull: false
  },
  productIndustry2: {
    type: DataTypes.STRING,
    allowNull: true
  },
  productIndustry3: {
    type: DataTypes.STRING,
    allowNull: true
  },
  productIndustry4: {
    type: DataTypes.STRING,
    allowNull: true
  },

  natureOfBusiness: {
    type: DataTypes.STRING,
    allowNull: false
  },
  companyIndustry1: {
    type: DataTypes.STRING,
    allowNull: false
  },
  companyIndustry2: {
    type: DataTypes.STRING,
    allowNull: true
  },
  companyIndustry3: {
    type: DataTypes.STRING,
    allowNull: true
  },
  companyIndustry4: {
    type: DataTypes.STRING,
    allowNull: true
  },
  
  businessProcess: {
    type: DataTypes.STRING,
    allowNull: true
  },
  companyProducts: {
    type: DataTypes.STRING,
    allowNull: true
  },
  companyResources: {
    type: DataTypes.STRING,
    allowNull: true
  },
  managementEmployees: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  managementExperience: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  technicalEmployees: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  technicalExperience: {
    type: DataTypes.INTEGER,
    allowNull: true
  },  
  adminEmployees: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  adminExperience: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  marketingEmployees: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  marketingExperience: {
    type: DataTypes.INTEGER,
    allowNull: true
  },  
  otherHrField: {
    type: DataTypes.STRING,
    allowNull: true
  },
  otherHrEmployees: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  otherHrExperience: {
    type: DataTypes.INTEGER,
    allowNull: true
  },

  keyValueProposition: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  sequelize,
  modelName: 'Company',
});

module.exports = Company;
