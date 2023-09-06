const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');

class Meeting extends Model {}

Meeting.init({
    day: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    startingTime: {
        type: DataTypes.STRING,
        allowNull: false
    },
    endingTime: {
        type: DataTypes.STRING,
        allowNull: false
    },
    company: {
        type: DataTypes.STRING,
        allowNull: false
    },
    investor: {
        type: DataTypes.STRING,
        allowNull: false
    },
    room: {
        type: DataTypes.STRING,
        allowNull: false
    },
},{
    sequelize,
    modelName: 'meetings',
});

module.exports = Meeting;