const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db'); // Path to your sequelize configuration

class Company extends Model {}

Company.init({
  dateOfIncorporation: DataTypes.DATE,
  partnershipType: DataTypes.STRING,
  investmentType: DataTypes.STRING,
  investmentTypeDescription: DataTypes.STRING,
  elevatorPitch: DataTypes.STRING,
  partnershipRequirement: DataTypes.STRING,
  whatOnOffer: DataTypes.STRING,
  isSustainable: DataTypes.STRING,
  numberOfEmployees: DataTypes.STRING,
  productMaturity: DataTypes.STRING,
  productDescription: DataTypes.STRING,
  technologyEmployed: DataTypes.STRING,
  technologyEmployedDescription: DataTypes.STRING,
  collaterals: DataTypes.JSON, 
  referrals: DataTypes.JSON,
  productIndustry1: DataTypes.STRING,
  productIndustry2: DataTypes.STRING,
  productIndustry3: DataTypes.STRING,
  natureOfBusiness: DataTypes.STRING,
  companyIndustry1: DataTypes.STRING,
  companyIndustry2: DataTypes.STRING,
  companyIndustry3: DataTypes.STRING,
  businessProcess: DataTypes.STRING,
  companyProducts: DataTypes.STRING,
  companyResources: DataTypes.STRING,
  managementEmployee: DataTypes.STRING,
  managementExperience: DataTypes.STRING,
  technicalEmployee: DataTypes.STRING,
  technicalExperience: DataTypes.STRING,
  adminEmployees: DataTypes.STRING,
  adminExperience: DataTypes.STRING,
  marketingEmployees: DataTypes.STRING,
  marketingExperience: DataTypes.STRING,
  otherHrField: DataTypes.STRING,
  otherHrEmployee: DataTypes.STRING,
  otherHrExperience: DataTypes.STRING,
  keyValueProposition: DataTypes.STRING,
  stakeholders: DataTypes.JSON,
  companyCollaterals: DataTypes.JSON,
  ompanyReferrals: DataTypes.JSON

}, {
  sequelize,
  modelName: 'Company',
});

module.exports = Company;
