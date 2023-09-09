const { DataTypes, Model } = require('sequelize');

const sequelize = require('../config/db'); // Path to your sequelize configuration
const InvestorInvestmentType = require('./InvestorInvestmentType');
const Investor = require('./Investor');

class InvestmentType extends Model {}

InvestmentType.init({
    InvestmentType: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    sequelize,
    modelName: 'InvestmentType',
});



module.exports = InvestmentType;