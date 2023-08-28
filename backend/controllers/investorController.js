const Investor = require('../models/Investor'); // Use Sequelize Investor model
const logger = require('../config/logger');

class InvestorController {
  static async registerInvestor(req, res) {
    try {
      const {
        // Extract fields from req.body
        firstName,
        lastName,
        country,
        address,
        companyRole,
        numberOfEmployees,
        assetsUnderManagement,
        investorType,
        investorTypeDescription,
        investmentType,
        investmentTypeDescription,
        investmentIndustryPreference1,
        investmentIndustryPreference2,
        investmentIndustryPreference3,
        investmentIndustryPreference4,
      } = req.body;

      // Validate fields (similar validation as before)
      if (firstName.length <= 3 || lastName.length <= 3 || address.length <= 3) {
        return res.status(400).json({ message: 'Fields must contain more than 3 characters' });
      }
console.log("Hello")
      // Create a new investor using Sequelize model
      await Investor.create({
        firstName,
        lastName,
        country,
        address,
        companyRole,
        numberOfEmployees,
        assetsUnderManagement,
        investorType,
        investorTypeDescription: investorType === 'Other' ? investorTypeDescription : null,
        investmentType,
        investmentTypeDescription: investmentType === 'Other' ? investmentTypeDescription : null,
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
}

module.exports = InvestorController;
