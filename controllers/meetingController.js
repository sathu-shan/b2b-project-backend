const Meeting = require('../models/Meeting');
const Company = require('../models/Company');
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

const checkAvailableCompanies = async (req, res) => {
    try{
        const day = req.query.day;
        const startingTime = req.query.time;

        const companies = await Company.findAll({
            attributes: ['companyName']
        });

        const unavailableCompanies = await Meeting.findAll({
            where: {
                startingTime: startingTime,
                day: day
            },
            attributes: ['company']
        });

        const availableCompanies = [];

        companies.forEach(({dataValues}) => {
            let companyName = dataValues.companyName;
            let checkAvailability = unavailableCompanies.findIndex(unCom => unCom.dataValues.company === companyName);
            if(checkAvailability === -1){
                availableCompanies.push(companyName);
                console.log('pushed')
            }
        });

        console.error(availableCompanies);


        return res.status(200).json({availableCompanies})

    }catch (error){
        console.error('Error in meeting controller:', error);
        return res.status(500).json({ message: 'Internal Server Error', status: 500 });
    }
}

module.exports = {
    scheduleNewEvent,
    fetchAllMeetings,
    deleteScheduledMeeting,
    checkAvailableCompanies
}