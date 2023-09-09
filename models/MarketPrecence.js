const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db'); // Path to your sequelize configuration

class MarketPrecence extends Model {}

MarketPrecence.init({
    companyId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    regionName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    percentage: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    sequelize,
    modelName: 'MarketPrecence',
});

module.exports = MarketPrecence;