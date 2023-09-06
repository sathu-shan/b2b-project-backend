const Meeting = require('../models/Meeting');
const Company = require('../models/Company');
const Investor = require('../models/Investor');
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
            }
        });

        return res.status(200).json({availableCompanies})

    }catch (error){
        console.error('Error in meeting controller:', error);
        return res.status(500).json({ message: 'Internal Server Error', status: 500 });
    }
}

const checkAvailableInvestors = async (req, res) => {
    try{
        const day = req.query.day;
        const startingTime = req.query.time;

        const investors = await Investor.findAll({
            attributes: ['firstName']
        });

        const unavailableInvestors = await Meeting.findAll({
            where: {
                startingTime: startingTime,
                day: day
            },
            attributes: ['investor']
        });

        const availableInvestors = [];

        investors.forEach(({dataValues}) => {
            let investorName = dataValues.firstName;
            let checkAvailability = unavailableInvestors.findIndex(unInv => unInv.dataValues.investor === investorName);
            if(checkAvailability === -1){
                availableInvestors.push(investorName);
            }
        });

        return res.status(200).json({ availableInvestors });

    }catch (error){
        console.error('Error in meeting controller:', error);
        return res.status(500).json({ message: 'Internal Server Error', status: 500 });
    }
}

const checkAvailableRooms = async (req, res) => {
    const allRooms = ['Room 1', 'Room 2', 'Room 3', 'Room 4', 'Room 5', 'Virtual Room'];

    try{
        const day = req.query.day;
        const startingTime = req.query.time;

        const unavailableRooms = await Meeting.findAll({
            where: {
                startingTime: startingTime,
                day: day
            },
            attributes: ['room']
        });

        const availableRooms = [];

        allRooms.forEach(room => {
            let checkAvailability = unavailableRooms.findIndex(unRoom => unRoom.dataValues.room === room);
            if(checkAvailability === -1){
                availableRooms.push(room)
            }
        })

        return res.status(200).json({ availableRooms });

    }catch (error){
        console.error('Error in meeting controller:', error);
        return res.status(500).json({ message: 'Internal Server Error', status: 500 });
    }
}

module.exports = {
    scheduleNewEvent,
    fetchAllMeetings,
    deleteScheduledMeeting,
    checkAvailableCompanies,
    checkAvailableInvestors,
    checkAvailableRooms
}