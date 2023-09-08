const { Sequelize } = require("sequelize");
const Notification = require('../models/Notification');
const NotificationVisibility = require('../models/NotificationVisibility');

const createNewNotification = async (req, res) => {
    try{
        const { time, from, to, subject, message } = req.body;

        const notification = await Notification.create({
            time: time,
            from: from,
            subject: subject,
            message: message,
            to: to
        });

        return res.status(201).json({ notification });

    }catch (error){
        console.error('Error in notification controller:', error);
        return res.status(500).json({ message: 'Internal Server Error', status: 500 });
    }
}

const getAllNotificationsAccordingToUser = async (req, res) => {
    try{
        const user = req.query.user;

        const notifications = await Notification.findAll({
           where: {
               [Sequelize.Op.or]: [
                   { to: 'All' },
                   { to: user }
               ]
           }
        });

        for(let i = 0; i < notifications.length; i++){
            const { dataValues } = notifications[i];

            const selectedNotificationViewed = await NotificationVisibility.findAll({
                where: {
                    notificationId: dataValues.id,
                    viewedName: user
                }
            });

            //console.log(selectedNotificationViewed);

            dataValues.viewed = selectedNotificationViewed.length !== 0;

            const selectedNotificationRead = await NotificationVisibility.findAll({
                where: {
                    notificationId: dataValues.id,
                    readName: user
                }
            });

            //console.log(selectedNotificationRead);

            dataValues.read = selectedNotificationRead.length !== 0;
        }

        return res.status(200).json({ notifications });

    }catch (error){
        console.error('Error in notification controller:', error);
        return res.status(500).json({ message: 'Internal Server Error', status: 500 });
    }
}

const markAsViewed = async (req, res) => {
    try{
        const { readName, notificationId, viewedName } = req.body;

        await NotificationVisibility.create({
            notificationId: notificationId,
            readName: readName,
            viewedName: viewedName
        });

        return res.status(200).json({message: 'success'});

    }catch (error){
        console.error('Error in notification controller:', error);
        return res.status(500).json({ message: 'Internal Server Error', status: 500 });
    }
}

const markAsReaded = async (req, res) => {
    try{
        const { readName, notificationId, viewedName } = req.body;

        await NotificationVisibility.create({
            notificationId: notificationId,
            readName: readName,
            viewedName: viewedName
        });

        return res.status(200).json({message: 'success'});

    }catch(error){
        console.error('Error in notification controller:', error);
        return res.status(500).json({ message: 'Internal Server Error', status: 500 });
    }
}

module.exports = {
    createNewNotification,
    getAllNotificationsAccordingToUser,
    markAsViewed,
    markAsReaded
}