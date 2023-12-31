const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const investorRoutes = require('./routes/investorRoutes');
const registrationRoutes = require('./routes/registrationRoutes');
const s3Routes = require('./routes/s3Routes')
const cors = require("cors");
const cookieParser = require('cookie-parser');
const { validationResult, check } = require("express-validator");
const app = express();
const userRoute = require('./routes/auth');
const sequelize = require('./config/db'); // Import Sequelize configuration
const PORT = 3001;

app.use(bodyParser.json());
app.use(cors(
  {
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  }
));

app.use(cookieParser());

app.use('/auth', authRoutes);
app.use('/investor', investorRoutes);
app.use('/api', registrationRoutes);
app.use('/api/users', userRoute);
app.use('/api/upload', s3Routes)

// Sync Sequelize models with the database
sequelize.sync()
  .then(() => {
    console.log('Database synced');
  })
  .catch(error => {
    console.error('Error syncing database:', error);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
