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
const InvestorInvestmentType = require('./models/InvestorInvestmentType');
const InvestmentType = require('./models/InvestmentType');
const User = require('./models/User');
const Company = require('./models/Company');
const CompanyInvestmentType = require('./models/CompanyInvestmentType');
const MarketPrecence = require('./models/MarketPrecence');
const Collaterals = require('./models/Collaterals');
const Referrals = require('./models/Referrals');
const Stakeholders = require('./models/Stakeholders');

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
app.use('/api/register', registrationRoutes);

app.use('/api/investors', investorRoutes);
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
    await User.sync();
    await InvestmentType.sync();
    await Investor.sync();
    await Company.sync();
    await InvestorInvestmentType.sync();
    await CompanyInvestmentType.sync();
    await MarketPrecence.sync();
    await Collaterals.sync();
    await Referrals.sync();
    await Stakeholders.sync();
}

InvestmentType.belongsToMany(Investor, {
  through: InvestorInvestmentType,
  foreignKey: 'InvestmentTypeId', // Foreign key in the junction table
});

Investor.belongsToMany(InvestmentType, {
  through: InvestorInvestmentType,
  foreignKey: 'InvestorId', // Foreign key in the junction table
});

InvestmentType.belongsToMany(Company, {
  through: CompanyInvestmentType,
  foreignKey: 'InvestmentTypeId', // Foreign key in the junction table
});

Company.belongsToMany(InvestmentType, {
  through: CompanyInvestmentType,
  foreignKey: 'companyId', // Foreign key in the junction table
});

Company.hasMany(MarketPrecence, {
  foreignKey: 'companyId', // The foreign key in the Market table that references Company
  as: 'marketPrecences', // This alias will be used when you access the associated markets
});

MarketPrecence.belongsTo(Company, {
  foreignKey: 'companyId', // The foreign key in the MarketPrecence table that references Company
});

Company.hasMany(Collaterals, {
  foreignKey: 'companyId', // The foreign key in the Collaterals table that references Company
  as: 'collaterals', // This alias will be used when you access the associated collaterals
});

Collaterals.belongsTo(Company, {
  foreignKey: 'companyId', // The foreign key in the Collaterals table that references Company
});

Company.hasMany(Referrals, {
  foreignKey: 'companyId', // The foreign key in the Referrals table that references Company
  as: 'referrals', // Use an alias for the association, e.g., 'referrals'
});

Referrals.belongsTo(Company, {
  foreignKey: 'companyId', // The foreign key in the Referrals table that references Company
});

Company.hasMany(Stakeholders, {
  foreignKey: 'companyId', // The foreign key in the Stakeholders table that references Company
  as: 'stakeholders', // Use an alias for the association, e.g., 'stakeholders'
});

Stakeholders.belongsTo(Company, {
  foreignKey: 'companyId', // The foreign key in the Stakeholders table that references Company
});

Investor.belongsTo(User, {
  foreignKey: 'userId',
});

syncAllModels();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
