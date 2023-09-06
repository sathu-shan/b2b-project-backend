const { validationResult } = require('express-validator');
const logger = require('../config/logger');
const Company = require('../models/Company'); // Adjust the path accordingly
const {Sequelize} = require("sequelize");
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
    companyName: formData.companyName,
    status: 'Pending',
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

    // Define an array of column names to count for industry and product industries
    const columnNames = [
      'companyIndustry1',
      'companyIndustry2',
      'companyIndustry3',
      'productIndustry1',
      'productIndustry2',
      'productIndustry3',
    ];

    // Define the column name for investmentType
    const investmentColumn = 'investmentType';

    // Create an object to store the counts for industries and investments
    const industryCounts = {};
    const investmentCounts = {};

    // Loop through each column and fetch distinct values
    for (const columnName of columnNames) {
      const columnValues = await Company.findAll({
        attributes: [
          [Sequelize.fn('DISTINCT', Sequelize.col(columnName)), columnName],
          [Sequelize.fn('COUNT', Sequelize.col(columnName)), 'count'],
        ],
        group: [columnName],
        raw: true,
        where: {
          [columnName]: {
            [Op.not]: null, // Exclude null values
            [Op.not]: '',   // Exclude empty strings
          },
        },
      });

      // Accumulate the counts across all columns
      columnValues.forEach((row) => {
        const value = row[columnName];
        industryCounts[value] = (industryCounts[value] || 0) + row['count'];
      });
    }

    // Fetch distinct investment types
    const investmentTypeValues = await Company.findAll({
      attributes: [
        [Sequelize.fn('DISTINCT', Sequelize.col(investmentColumn)), investmentColumn],
        [Sequelize.fn('COUNT', Sequelize.col(investmentColumn)), 'count'],
      ],
      group: [investmentColumn],
      raw: true,
      where: {
        [investmentColumn]: {
          [Op.not]: null, // Exclude null values
          [Op.not]: '',   // Exclude empty strings
        },
      },
    });

    // Build an object with investment type values and their counts
    investmentTypeCounts = {};
    investmentTypeValues.forEach((row) => {
      investmentTypeCounts[row[investmentColumn]] = row['count'];
    });

    res.json({ totalCompanyCount, investmentTypeCounts, industryCounts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch company counts' });
  }
};


const getAllCompanyList = async (req, res) => {
  try {
      const companies = await Company.findAll({
          attributes: ['id','companyName', 'productIndustry1', 'companyIndustry1', 'investmentType', 'whatOnOffer', 'status', 'elevatorPitch']
      });

      const filteredDataCompanies = [];
      companies.forEach(({ dataValues }) => {
          const company = {
              id: dataValues.id,
              company: dataValues.companyName,
              industry: dataValues.whatOnOffer === 'Product' ? dataValues.productIndustry1 : dataValues.companyIndustry1,
              investmentType: dataValues.investmentType,
              productOrCompany: dataValues.whatOnOffer,
              isPending: dataValues.status === 'Pending',
              elevationPitch: dataValues.elevatorPitch
          }
          filteredDataCompanies.push(company);
      });

      return res.status(200).json({companies: filteredDataCompanies});
  }catch (error){
      console.error('Error in company controller:', error);
      return res.status(500).json({ message: 'Internal Server Error', status: 500 });
  }
}

const getCompanyByFilter = async (req, res) => {
  try {
      const investmentString = req.query.investment;
      const industryString = req.query.industry;

      const companies = await Company.findAll({
          attributes: ['id','companyName', 'productIndustry1', 'companyIndustry1', 'investmentType', 'whatOnOffer', 'status', 'elevatorPitch'],
          where: {
              investmentType: investmentString,
              [Sequelize.Op.or]: [
                  { productIndustry1: industryString },
                  { companyIndustry1: industryString },
              ],
          }
      });

      const filteredDataCompanies = [];
      companies.forEach(({ dataValues }) => {
          const company = {
              id: dataValues.id,
              company: dataValues.companyName,
              industry: dataValues.whatOnOffer === 'Product' ? dataValues.productIndustry1 : dataValues.companyIndustry1,
              investmentType: dataValues.investmentType,
              productOrCompany: dataValues.whatOnOffer,
              isPending: dataValues.status === 'Pending',
              elevationPitch: dataValues.elevatorPitch
          }
          filteredDataCompanies.push(company);
      });

      return res.status(200).json({ companies: filteredDataCompanies });

  }catch (error){
      console.error('Error in company controller:', error);
      return res.status(500).json({ message: 'Internal Server Error', status: 500 });
  }
}

const getCompanyBySearch = async (req, res) => {
  try {
      const searchString = req.query.search;

      const companies = await Company.findAll({
          where: {
              companyName: {
                  [Sequelize.Op.like]: `%${searchString}%`,
              },
          },
          attributes: ['id','companyName', 'productIndustry1', 'companyIndustry1', 'investmentType', 'whatOnOffer', 'status', 'elevatorPitch']
      });

      const filteredDataCompanies = [];
      companies.forEach(({ dataValues }) => {
          const company = {
              id: dataValues.id,
              company: dataValues.companyName,
              industry: dataValues.whatOnOffer === 'Product' ? dataValues.productIndustry1 : dataValues.companyIndustry1,
              investmentType: dataValues.investmentType,
              productOrCompany: dataValues.whatOnOffer,
              isPending: dataValues.status === 'Pending',
              elevationPitch: dataValues.elevatorPitch
          }
          filteredDataCompanies.push(company);
      });

      return res.status(200).json({companies: filteredDataCompanies});

  }catch (error){
      console.error('Error in company controller:', error);
      return res.status(500).json({ message: 'Internal Server Error', status: 500 });
  }
}

const approveCompanyRequest = async (req, res) => {
  try {
      await Company.update({
          status: 'Approved'
      }, {
          where: {
              id: req.params.id
          }
      });

      return res.status(200).json({message: 'Company Approved'});

  }catch (error){
      console.error('Error in company controller:', error);
      return res.status(500).json({ message: 'Internal Server Error', status: 500 });
  }
}

const deleteCompanyRequest = async (req, res) => {
  try {
      await Company.destroy({
          where: {
              id: req.params.id
          }
      });

      return res.status(200).json({message: 'Company Deleted'});

  }catch (error){
      console.error('Error in company controller:', error);
      return res.status(500).json({ message: 'Internal Server Error', status: 500 });
  }
}

const getOneCompanyDetail = async (req, res) => {
  try {
      const company = await Company.findOne({
          where: {
              id: req.params.id
          },
          attributes: ['dateOfIncorporation', 'partnershipType', 'partnershipRequirement', 'numberOfEmployees','investmentType', 'whatOnOffer', 'status', 'elevatorPitch', 'companyName']
      })

      if(company === null){
          return res.status(200).json({
              message: 'No Company Found'
          })
      }

      return res.status(200).json({ company })
  }catch (error){
      console.error('Error in company controller:', error);
      return res.status(500).json({ message: 'Internal Server Error', status: 500 });
  }
}

module.exports = {registerPart1,
  getCompanyStatistics,
  getAllCompanyList,
  getOneCompanyDetail,
  approveCompanyRequest,
  deleteCompanyRequest,
  getCompanyBySearch,
  getCompanyByFilter};
