const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db'); // Path to your sequelize configuration

class InvestorInvetmentType extends Model {}

InvestorInvetmentType.init({
    InvestorId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    InvestmentTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    sequelize,
    modelName: 'InvestorInvetmentType',
});

module.exports = InvestorInvetmentType;