const db = require('../config/db');
const logger = require('../config/logger');
const User = require('../models/User');

class AuthController {
  static async registerUser(req, res) {
    try {
      // Extract user data from request body
      const { email, password, companyName, contactNumber, displayName } = req.body;

      // Perform validation checks
      if (!isValidEmail(email)) {
        return res.status(400).json({ message: 'Invalid email' });
      }
      if (!isValidPassword(password)) {
        return res.status(400).json({ message: 'Invalid password' });
      }
      if (!isValidCompanyName(companyName)) {
        return res.status(400).json({ message: 'Invalid company name' });
      }
      if (!isValidContactNumber(contactNumber)) {
        return res.status(400).json({ message: 'Invalid contact number' });
      }
      if (!isValidDisplayName(displayName)) {
        return res.status(400).json({ message: 'Invalid display name' });
      }

      // Create a new user in the database using prepared statement
      const insertUserQuery = 'INSERT INTO users SET ?';
      const user = {
        email,
        password,
        companyName,
        contactNumber,
        displayName,
      };
      await db.query(insertUserQuery, user);

      // Log the successful signup
      logger.info(`Investor successfully signed up: ${email}`);

      // Respond with success message
      res.status(201).json({ message: 'Investor signed up successfully' });
    } catch (error) {
      console.error('Error registering investor:', error);
      res.status(500).json({ message: 'An error occurred' });
    }
  }
}

// Validation functions
function isValidEmail(email) {
  // Use a regular expression to validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPassword(password) {
  return password.length >= 6;
}

function isValidCompanyName(companyName) {
  return companyName.length > 3;
}

function isValidContactNumber(contactNumber) {
  // Use a regular expression to validate that the string contains only numbers
  const numberRegex = /^[0-9]+$/;
  return numberRegex.test(contactNumber);
}

function isValidDisplayName(displayName) {
  return displayName.length > 3;
}

module.exports = AuthController;
