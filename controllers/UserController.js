const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const  User  = require('../models/User'); // Adjust the path accordingly

const login = async (req, res) => {
  try {
    const { email, password } = req.body; 

    if (!email || !password) {
      return res.status(400).json({ message: 'User Email and Password are required', status: 400 });
    }
    
    const user = await User.findOne({
      where: {
        email: email,
      },
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
};

const verify = (req, res) => {
  try {
      const token = req.headers.token ? req.headers.token : 'empty';
      console.log(req.headers.token)
      if (token === 'empty') {
          return res.status(200).json({message: 'UnAuthorized Request Detected!',status: 401});
      }

      const isValid = new Promise((resolve, reject) => {
          jwt.verify(token, "our-secret-key-company", function (error, decoded) {
              if (error) {
                  reject(false);
                  return res.status(500).json({message: "Unauthorized error !", status: 500})
              }
              if (decoded) {
                  resolve(true);
                  return res.status(200).json({message: "success", status: 200})

              }
          })
      });
      console.log(isValid)
      // if(isValid){
      //     return res.status(200).json({message: "success", status: 200})
      // }else {
      //     return res.status(500).json({message: "Unauthorized error !", status: 500})
      // }
  }catch (err){
      return err.status(500).json({message: "Unauthorized error !", status: 500})
  }
};

module.exports = {
  login, verify
};
