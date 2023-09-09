const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db'); // Path to your sequelize configuration

class Referrals extends Model {}

Referrals.init({
    companyId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    referralType: {
        type: DataTypes.STRING,
        allowNull: false
    },
    referralLink: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    sequelize,
    modelName: 'Referrals',
});

module.exports = Referrals;