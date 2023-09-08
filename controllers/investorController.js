const Investor = require('../models/Investor'); // Use Sequelize Investor model
const logger = require('../config/logger');
const { Op } = require('sequelize'); // Import Sequelize's Op for query operations

class InvestorController {
}

const registerInvestor = async (req, res) => {
  try {
    const { userId, firstName, lastName, country, address, companyRole, numberOfEmployees, assetsUnderManagement, investorType,
      investorTypeDescription, investmentType, investmentTypeDescription, investmentIndustryPreference1,
      investmentIndustryPreference2, investmentIndustryPreference3, investmentIndustryPreference4 } = req.body;

    // Validate fields (similar validation as before)
    if (firstName.length <= 3 || lastName.length <= 3) {
      return res.status(400).json({ message: 'Fields must contain more than 3 characters' });
    }

    // Create a new investor using Sequelize model
    await Investor.create({
      userId,
      firstName,
      lastName,
      country,
      address,
      companyRole,
      numberOfEmployees,
      assetsUnderManagement,
      investorType,
      investorTypeDescription: investorTypeDescription,
      investmentType,
      investmentTypeDescription: investmentTypeDescription,
      investmentIndustryPreference1,
      investmentIndustryPreference2,
      investmentIndustryPreference3,
      investmentIndustryPreference4,
    });

    // Log the successful registration
    logger.info(`Investor successfully registered: ${firstName}`);

    // Respond with success message
    res.status(201).json({ message: 'Investor registered successfully' });

  } catch (error) {
    console.error('Error registering investor:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
}

// dashboard investor count getting

const getInvestorStatistics = async (req, res) => {
  try {
    // Fetch the count of all companies using Sequelize
    const totalInvestorCount = await Investor.count();

    // Define an array of column names to count
    const columnNames = [
      'investmentIndustryPreference1',
      'investmentIndustryPreference2',
      'investmentIndustryPreference3',
      'investmentIndustryPreference4',
    ];
  const columns = ['investorType']
    // Create an object to store the counts
    const investorIndustryCounts = {};
    const investorInvestmentCounts = {};

    // Loop through each column and fetch counts for each value
    for (const columnName of columnNames) {
      const investorColumnCounts = await Investor.findAll({
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
      investorColumnCounts.forEach((row) => {
        const value = row[columnName];
        investorIndustryCounts[value] = investorIndustryCounts[value] ? investorIndustryCounts[value] + 1 : 1;
      });
    }
    for (const investorType of columns) {
    const investorColumnCounts = await Investor.findAll({
      attributes: [investorType],
      group: [investorType],
      raw: true,
      where: {
        [investorType]: {
          [Op.not]: null, // Exclude null values
          [Op.not]: '',   // Exclude empty strings
        }}});
       // Calculate the counts for each value in the column
       investorColumnCounts.forEach((row) => {
        const value = row[investorType];
        investorInvestmentCounts[value] = investorInvestmentCounts[value] ? investorInvestmentCounts[value] + 1 : 1;
      })}

    res.json({ totalInvestorCount, investorInvestmentCounts, investorIndustryCounts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch investor counts' });
  }
};

module.exports = {InvestorController,getInvestorStatistics, registerInvestor};
