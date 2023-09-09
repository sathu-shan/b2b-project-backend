const { validationResult } = require('express-validator');
const logger = require('../config/logger');
const { Op } = require('sequelize'); 

const Company = require('../models/Company');
const Investor = require('../models/Investor');
const InvestmentType = require('../models/InvestmentType');
const InvestorInvetmentType = require('../models/InvestorInvestmentType');
const CompanyInvestmentType = require('../models/CompanyInvestmentType');
const MarketPrecence = require('../models/MarketPrecence');
const Collaterals = require('../models/Collaterals');
const Referrals = require('../models/Referrals');
const Stakeholders = require('../models/Stakeholders');

const sequelize = require('../config/db'); 

const registerInvestor = async (req, res) => {
  try {
    const { userId, firstName, lastName, country, address, companyRole, numberOfEmployees, assetsUnderManagement, investorType,
      investorTypeDescription, investmentType, investmentTypeDescription, investmentIndustryPreference1,
      investmentIndustryPreference2, investmentIndustryPreference3, investmentIndustryPreference4 } = req.body;

    if (firstName.length <= 3 || lastName.length <= 3) {
      return res.status(400).json({ message: 'Fields must contain more than 3 characters' });
    }

    const investor = await Investor.create({
      userId,
      firstName,
      lastName,
      country,
      status: 'Pending',
      address,
      companyRole,
      numberOfEmployees,
      assetsUnderManagement,
      investorType,
      investorTypeDescription: investorTypeDescription,
      investmentTypeDescription: investmentTypeDescription,
      investmentIndustryPreference1,
      investmentIndustryPreference2,
      investmentIndustryPreference3,
      investmentIndustryPreference4,
    });

    for(const typeName of investmentType){
      const [investmentTypeData] = await InvestmentType.findOrCreate({
        where: { InvestmentType: typeName }
      });

      await InvestorInvetmentType.create({
        InvestorId: investor.id, 
        InvestmentTypeId: investmentTypeData.id
      });
    }

    // Log the successful registration
    logger.info(`Investor successfully registered: ${firstName}`);
    
    res.status(201).json({ message: 'Investor registered successfully' });

  } catch (error) {
    console.error('Error registering investor:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
}

const registerCompany = async (req, res) => {
  const formData = req.body;
  console.log(formData);
  
  const validationRules = [
    { field: 'elevatorPitch', message: 'Elevator Pitch must contain at least 3 characters' },
    { field: 'productDescription', message: 'Product Description must contain at least 3 characters' },
    { field: 'businessProblemSolved', message: 'Business Problem Solved must contain at least 3 characters' },
    { field: 'natureOfBusiness', message: 'Nature of Business must contain at least 3 characters' },
    { field: 'keyValueProposition', message: 'Key Value Proposition must contain at least 3 characters' },
  ];

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
   const company = await Company.create({
    status: 'Pending',
    companyName: formData.companyName,
    dateOfIncorporation: formData.dateOfIncorporation,
    partnershipType: formData.partnershipType,
    investmentTypeDescription: formData.investmentTypeDescription,
    elevatorPitch: formData.elevatorPitch,

    partnershipRequirement: formData.partnershipRequirement,
    whatOnOffer:formData.whatOnOffer,
    isSustainable: formData.isSustainable,
    numberOfEmployees:formData.numberOfEmployees,

    productMaturity: formData.productMaturity,
    productDescription: formData.productDescription,
    businessProblemSolved: formData.businessProblemSolved,
    numberOfInstallations: formData.numberOfInstallations,
    productType: formData.productType,

    technologyEmployed: formData.technologyEmployed,
    technologyEmployedDescription: formData.technologyEmployedDescription,
    productIndustry1: formData.productIndustry1,
    productIndustry2: formData.productIndustry2,
    productIndustry3: formData.productIndustry3,
    productIndustry4: formData.productIndustry4,

    natureOfBusiness: formData.natureOfBusiness,
    companyIndustry1: formData.companyIndustry1,
    companyIndustry2: formData.companyIndustry2,
    companyIndustry3: formData.companyIndustry3,
    companyIndustry4: formData.companyIndustry4,

    businessProcess: formData.businessProcess,
    companyProducts: formData.companyProducts,
    companyResources: formData.companyResources,
    managementEmployees: formData.managementEmployee,
    managementExperience: formData.managementExperience,
    technicalEmployees: formData.technicalEmployee,
    technicalExperience: formData.technicalExperience,
    adminEmployees: formData.adminEmployees,
    adminExperience:formData.adminExperience,
    marketingEmployees: formData.marketingEmployees,
    marketingExperience: formData.marketingExperience,
    otherHrField: formData.otherHrField,
    otherHrEmployees: formData.otherHrEmployee,
    otherHrExperience: formData.otherHrExperience,

    keyValueProposition:formData.keyValueProposition,
   });

   for(const typeName of formData.investmentType){
    const [investmentTypeData] = await InvestmentType.findOrCreate({
      where: { InvestmentType: typeName }
    });

    await CompanyInvestmentType.create({
      companyId: company.id, 
      InvestmentTypeId: investmentTypeData.id
    });
  }

  for(const market of formData.marketPresence){
    await MarketPrecence.create({
      companyId: company.id,
      regionName: market.region,
      percentage: market.percentage.toString()
    });
  }

  for(const collateral of formData.collaterals){
    await Collaterals.create({
      companyId: company.id,
      collateralType: "Product",
      collateralsLink: collateral
    });
  }

  for(const referral of formData.referrals){
    await Referrals.create({
      companyId: company.id,
      referralType: "Product",
      referralLink: referral
    });
  }

  for(const collateral of formData.companyCollaterals){
    await Collaterals.create({
      companyId: company.id,
      collateralType: "Company",
      collateralsLink: collateral
    });
  }

  for(const referral of formData.companyReferrals){
    await Referrals.create({
      companyId: company.id,
      referralType: "Company",
      referralLink: referral
    });
  }

  for(const stakeholder of formData.stakeholders){
    await Stakeholders.create({
      companyId: company.id,
      workType: stakeholder.type,
      workRole: stakeholder.role
    });
  }

    logger.info(`Company successfully registerd`);
    
    res.status(201).json({ message: 'Registration data saved' });
  } catch (error) {
    logger.error(`Registration error: ${error}`);
    console.error('Registration error:', error);
    res.status(500).json({ error: 'An error occurred during registration' });
  }
};

// need to change according to new db

// dashboard company count getting

const getCompanyStatistics = async (req, res) => {
  try {
    // Fetch the count of all companies using Sequelize
    const totalCompanyCount = await Company.count();

    // Define an array of column names to count
    const columnNames = [
      'companyIndustry1',
      'companyIndustry2',
      'companyIndustry3',
      'productIndustry1',
      'productIndustry2',
      'productIndustry3',
    ];
  const columns = ['investmentType']
    // Create an object to store the counts
    const industryCounts = {};
    const investmentCounts = {};

    // Loop through each column and fetch counts for each value
    for (const columnName of columnNames) {
      const columnCounts = await Company.findAll({
        attributes: [columnName],
        group: [columnName],
        raw: true,
        where: {
          [columnName]: {
            [Op.not]: null, // Exclude null values
            [Op.not]: '',   // Exclude empty strings
          },
        },
      });

      
      // Calculate the counts for each value in the column
      columnCounts.forEach((row) => {
        const value = row[columnName];
        industryCounts[value] = industryCounts[value] ? industryCounts[value] + 1 : 1;
      });
    }
    for (const investmentType of columns) {
    const investmentColumnCounts = await Company.findAll({
      attributes: [investmentType],
      group: [investmentType],
      raw: true,
      where: {
        [investmentType]: {
          [Op.not]: null, // Exclude null values
          [Op.not]: '',   // Exclude empty strings
        }}});
       // Calculate the counts for each value in the column
       investmentColumnCounts.forEach((row) => {
        const value = row[investmentType];
        investmentCounts[value] = investmentCounts[value] ? investmentCounts[value] + 1 : 1;
      })}

    res.json({ totalCompanyCount, investmentCounts, industryCounts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch company counts' });
  }
};

// const getInvestmentCountsByIndustry = async (req, res) => {
//   try {
//     const industry = req.query.industry;

//     const investmentCounts = await Company.findAll({
//       attributes: ['investmentType'],
//       where: {
//         [Op.and]: [
//           { [industry]: industry },
//           { investmentType: { [Op.not]: null, [Op.not]: '' } },
//         ],
//       },
//       group: ['investmentType'],
//       raw: true,
//     });

//     res.json({ industry, investmentCounts });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to fetch investment counts' });
//   }
// };


module.exports = { registerInvestor, registerCompany ,getCompanyStatistics };
