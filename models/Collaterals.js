const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db'); // Path to your sequelize configuration

class Collaterals extends Model {}

Collaterals.init({
    companyId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    collateralType: {
        type: DataTypes.STRING,
        allowNull: false
    },
    collateralsLink: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    sequelize,
    modelName: 'Collaterals',
});

module.exports = Collaterals;