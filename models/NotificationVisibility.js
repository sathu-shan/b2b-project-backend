const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');

class NotificationVisibility extends Model {}

NotificationVisibility.init({
    notificationId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    viewedName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    readName: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    sequelize,
    modelName: 'notification-visibilities',
})

module.exports = NotificationVisibility;