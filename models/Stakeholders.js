const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db'); // Path to your sequelize configuration

class Stakeholders extends Model {}

Stakeholders.init({
    companyId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    workType: {
        type: DataTypes.STRING,
        allowNull: false
    },
    workRole: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    sequelize,
    modelName: 'Stakeholders',
});

module.exports = Stakeholders;