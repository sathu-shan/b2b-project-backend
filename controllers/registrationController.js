const { validationResult } = require('express-validator');
const logger = require('../config/logger');
const Company = require('../models/Company'); // Adjust the path accordingly
const sequelize = require('../config/db'); // Path to your sequelize configuration
const { Op } = require('sequelize'); // Import Sequelize's Op for query operations


const registerPart1 = async (req, res) => {
  const formData = req.body;
  console.log(formData)
  console.log(formData.collaterals[0])
  // Define validation rules
  const validationRules = [
    { field: 'elevatorPitch', message: 'Elevator Pitch must contain at least 3 characters' },
    { field: 'productDescription', message: 'Product Description must contain at least 3 characters' },
    { field: 'businessProblemSolved', message: 'Business Problem Solved must contain at least 3 characters' },
    { field: 'natureOfBusiness', message: 'Nature of Business must contain at least 3 characters' },
    { field: 'keyValueProposition', message: 'Key Value Proposition must contain at least 3 characters' },
  ];

  // Check validation results
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
   await Company.create({
    dateOfIncorporation:formData.dateOfIncorporation,
    partnershipType:formData.partnershipType,
    investmentType:formData.investmentType,
    investmentTypeDescription:formData.investmentTypeDescription,
    elevatorPitch:formData.elevatorPitch,
    partnershipRequirement:formData.partnershipRequirement,
    whatOnOffer:formData.whatOnOffer,
    isSustainable:formData.isSustainable,
    numberOfEmployees:formData.numberOfEmployees,
    productMaturity:formData.productMaturity,
    productDescription:formData.productDescription,
    technologyEmployed: formData.technologyEmployed,
    technologyEmployedDescription: formData.technologyEmployedDescription,
    collaterals:formData.collaterals && formData.collaterals.length > 0 ? JSON.stringify(formData.collaterals) : null,
    referrals:formData.referrals && formData.referrals.length > 0 ? JSON.stringify(formData.referrals) : null,
    productIndustry1:formData.productIndustry1,
    productIndustry2:formData.productIndustry2,
    productIndustry3:formData.productIndustry3,
    natureOfBusiness:formData.natureOfBusiness,
    companyIndustry1:formData.companyIndustry1,
    companyIndustry2:formData.companyIndustry2,
    companyIndustry3:formData.companyIndustry3,
    businessProcess:formData.businessProcess,
    companyProducts:formData.companyProducts,
    companyResources:formData.companyResources,
    managementEmployee:formData.managementEmployee,
    managementExperience:formData.managementExperience,
    technicalEmployee:formData.technicalEmployee,
    technicalExperience:formData.technicalExperience,
    adminEmployees:formData.adminEmployees,
    adminExperience:formData.adminExperience,
    marketingEmployees:formData.marketingEmployees,
    marketingExperience:formData.marketingExperience,
    otherHrField:formData.otherHrField,
    otherHrEmployee:formData.otherHrEmployee,
    otherHrExperience:formData.otherHrExperience,
    keyValueProposition:formData.keyValueProposition,
    stakeholders:formData.stakeholders && formData.stakeholders.length > 0 ? JSON.stringify(formData.stakeholders) : null,
    companyCollaterals:formData.companyCollaterals && formData.companyCollaterals.length > 0 ? JSON.stringify(formData.companyCollaterals) : null,
    companyReferrals:formData.companyReferrals && formData.companyReferrals.length > 0 ? JSON.stringify(formData.companyReferrals) : null,
   })
  
  

    // await db.query(query, values);

 // Log the successful registration
 logger.info(`Company successfully registerd`);
    
    res.status(201).json({ message: 'Registration data saved' });
  } catch (error) {
    logger.error(`Registration error: ${error}`);
    console.error('Registration error:', error);
    res.status(500).json({ error: 'An error occurred during registration' });
  }
};

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


module.exports = {registerPart1,getCompanyStatistics};
