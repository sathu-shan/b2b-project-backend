const User = require('../models/User');

class AuthController {
  static async registerUser(req, res) {
    try {
      // Extract user data from request body
      const { email, password, companyName, contactNumber, displayName} = req.body;

      // Create a new user in the database
      const newUser = await User.create({
        email,
        password,
        companyName,
        contactNumber,
        displayName,
      });

      // Respond with success message
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ message: 'An error occurred' });
    }
  }
}

module.exports = AuthController;
