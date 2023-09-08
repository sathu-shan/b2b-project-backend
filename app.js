const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const investorRoutes = require('./routes/investorRoutes');
const registrationRoutes = require('./routes/registrationRoutes');
const s3Routes = require('./routes/s3Routes')
const companyRoutes = require('./routes/companyRoute');
const meetingRoutes = require('./routes/meetingRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const cors = require("cors");
const cookieParser = require('cookie-parser');
const { validationResult, check } = require("express-validator");
const app = express();
const userRoute = require('./routes/auth');
const sequelize = require('./config/db'); // Import Sequelize configuration
const PORT = 3001;

const Meeting = require('./models/Meeting');
const Notification = require('./models/Notification');
const NotificationVisibility = require('./models/NotificationVisibility');
const Investor = require('./models/Investor');

app.use(bodyParser.json());
app.use(cors(
  {
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  }
));

app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/investors', investorRoutes);
app.use('/api', registrationRoutes);
app.use('/api/users', userRoute);
app.use('/api/upload', s3Routes);
app.use('/api/companies', companyRoutes);
app.use('/api/meetings', meetingRoutes);
app.use('/api/notification', notificationRoutes);

// Sync Sequelize models with the database
const syncAllModels = async () => {
    await sequelize.sync();
    await Meeting.sync();
    await Notification.sync();
    await NotificationVisibility.sync();
    await Investor.sync();
}

syncAllModels();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
