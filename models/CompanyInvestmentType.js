const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db'); // Path to your sequelize configuration

class CompanyInvestmentType extends Model {}

CompanyInvestmentType.init({
    companyId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    InvestmentTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    sequelize,
    modelName: 'CompanyInvestmentType',
});

module.exports = CompanyInvestmentType;