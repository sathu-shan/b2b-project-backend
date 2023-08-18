const db = require('../config/db');

class InvestorController {
  static async registerInvestor(req, res) {
    try {
      const {
        firstName,
        lastName,
        country,
        address,
        companyRole,
        totalEmployees,
        assetsValue,
        investorType,
        investorTypeDescription,
        investmentType,
        investmentIndustryPreferences
      } = req.body;

       // Validate fields
       if (firstName.length <= 3 || lastName.length <= 3 || address.length <= 3) {
        return res.status(400).json({ message: 'Fields must contain more than 3 characters' });
      }

      // Create a new investor in the database using prepared statement
      const insertInvestorQuery = `
        INSERT INTO investors (
          first_name, last_name, country, address, company_role,
          total_employees, assets_value, investor_type, investor_type_description,
          investment_type, investment_industry_preferences
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      await db.query(insertInvestorQuery, [
        firstName,
        lastName,
        country,
        address,
        companyRole,
        totalEmployees,
        assetsValue,
        investorType,
        investorType === 'Other' ? investorTypeDescription : null,
        investmentType,
        investmentIndustryPreferences.join(',') // Convert array to comma-separated string
      ]);

      // Respond with success message
      res.status(201).json({ message: 'Investor registered successfully' });
    } catch (error) {
      console.error('Error registering investor:', error);
      res.status(500).json({ message: 'An error occurred' });
    }
  }
}

module.exports = InvestorController;
