const Meeting = require('../models/Meeting');
const { Sequelize } = require("sequelize");

const scheduleNewEvent = async (req, res) => {
    try{
        const { day, startingTime, endingTime, company, investor, room } = req.body;

        const meeting = await Meeting.create({
            day: day,
            startingTime: startingTime,
            endingTime: endingTime,
            company: company,
            investor: investor,
            room: room
        });

        return res.status(200).json({message: 'new meeting scheduled', meeting});

    }catch (error){
        console.error('Error in meeting controller:', error);
        return res.status(500).json({ message: 'Internal Server Error', status: 500 });
    }
}

const fetchAllMeetings = async (req, res) => {
    try{
        const meetings = await Meeting.findAll({
            where: {
                day: req.query.date
            }
        });

        return res.status(200).json(meetings);

    }catch (error){
        console.error('Error in meeting controller:', error);
        return res.status(500).json({ message: 'Internal Server Error', status: 500 });
    }
}

const deleteScheduledMeeting = async (req, res) => {
    try{
        await Meeting.destroy({
            where: {
                id: req.params.id
            }
        });

        return res.status(200).json({message: 'Meeting Deleted'});

    }catch (error){
        console.error('Error in meeting controller:', error);
        return res.status(500).json({ message: 'Internal Server Error', status: 500 });
    }
}

module.exports = {
    scheduleNewEvent,
    fetchAllMeetings,
    deleteScheduledMeeting
}