const logger = require('../config/logger');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User'); // Use Sequelize User model

const signUpUser = async (req, res) => {
  try {
    const { email, password, companyName, contactNumber, displayName, type } = req.body;

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
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email: email,
      password: hashedPassword,
      companyName: companyName,
      contactNumber: contactNumber,
      displayName: displayName,
      type: type,
      status: 'Not Registered'
    });

    logger.info(`${type === 1 ? 'Company' : 'Investor'} successfully signed up: ${email}`);

    res.status(201).json({ message: `${type === 1 ? 'Company' : 'Investor'} signed up successfully` });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
}

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body; 

    if (!email || !password) {
      return res.status(400).json({ message: 'User Email and Password are required', status: 400 });
    }
    
    const user = await User.findOne({
      where: {
        email: email,
      },
      attributes: ["email", "password", "id", "displayName", "type", "status"]
    });

    if (!user) {
      return res.status(404).json({ message: 'Authorization Failed', status: 404 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Authorization Failed', status: 401 });
    }

    const token = jwt.sign({ user_email: email }, "our-secret-key-company", { expiresIn: "3h" });
    res.cookie("tokenComp",token);
    return res.status(200).json({ message: "Success", token: token, status: 200, user: user });

  } catch (error) {
    console.error('Error while logging in:', error);
    return res.status(500).json({ message: 'Internal Server Error', status: 500 });
  }
}

// Validation functions
function isValidEmail(email) {
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
  const numberRegex = /^[0-9]+$/;
  return numberRegex.test(contactNumber);
}

function isValidDisplayName(displayName) {
  return displayName.length > 3;

}

module.exports = {
  signUpUser,
  loginUser
}
