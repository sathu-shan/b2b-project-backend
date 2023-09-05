const Company = require('../models/Company');
const {Sequelize} = require("sequelize");

const getAllCompanyList = async (req, res) => {
    try {
        const companies = await Company.findAll({
            attributes: ['id','companyName', 'productIndustry1', 'companyIndustry1', 'investmentType', 'whatOnOffer', 'status', 'elevatorPitch']
        });

        const filteredDataCompanies = [];
        companies.forEach(({ dataValues }) => {
            const company = {
                id: dataValues.id,
                company: dataValues.companyName,
                industry: dataValues.whatOnOffer === 'Product' ? dataValues.productIndustry1 : dataValues.companyIndustry1,
                investmentType: dataValues.investmentType,
                productOrCompany: dataValues.whatOnOffer,
                isPending: dataValues.status === 'Pending',
                elevationPitch: dataValues.elevatorPitch
            }
            filteredDataCompanies.push(company);
        });

        return res.status(200).json({companies: filteredDataCompanies});
    }catch (error){
        console.error('Error in company controller:', error);
        return res.status(500).json({ message: 'Internal Server Error', status: 500 });
    }
}

const getCompanyByFilter = async (req, res) => {
    try {
        const investmentString = req.query.investment;
        const industryString = req.query.industry;

        const companies = await Company.findAll({
            attributes: ['id','companyName', 'productIndustry1', 'companyIndustry1', 'investmentType', 'whatOnOffer', 'status', 'elevatorPitch'],
            where: {
                investmentType: investmentString,
                [Sequelize.Op.or]: [
                    { productIndustry1: industryString },
                    { companyIndustry1: industryString },
                ],
            }
        });

        const filteredDataCompanies = [];
        companies.forEach(({ dataValues }) => {
            const company = {
                id: dataValues.id,
                company: dataValues.companyName,
                industry: dataValues.whatOnOffer === 'Product' ? dataValues.productIndustry1 : dataValues.companyIndustry1,
                investmentType: dataValues.investmentType,
                productOrCompany: dataValues.whatOnOffer,
                isPending: dataValues.status === 'Pending',
                elevationPitch: dataValues.elevatorPitch
            }
            filteredDataCompanies.push(company);
        });

        return res.status(200).json({ companies: filteredDataCompanies });

    }catch (error){
        console.error('Error in company controller:', error);
        return res.status(500).json({ message: 'Internal Server Error', status: 500 });
    }
}

const getCompanyBySearch = async (req, res) => {
    try {
        const searchString = req.query.search;

        const companies = await Company.findAll({
            where: {
                companyName: {
                    [Sequelize.Op.like]: `%${searchString}%`,
                },
            },
            attributes: ['id','companyName', 'productIndustry1', 'companyIndustry1', 'investmentType', 'whatOnOffer', 'status', 'elevatorPitch']
        });

        const filteredDataCompanies = [];
        companies.forEach(({ dataValues }) => {
            const company = {
                id: dataValues.id,
                company: dataValues.companyName,
                industry: dataValues.whatOnOffer === 'Product' ? dataValues.productIndustry1 : dataValues.companyIndustry1,
                investmentType: dataValues.investmentType,
                productOrCompany: dataValues.whatOnOffer,
                isPending: dataValues.status === 'Pending',
                elevationPitch: dataValues.elevatorPitch
            }
            filteredDataCompanies.push(company);
        });

        return res.status(200).json({companies: filteredDataCompanies});

    }catch (error){
        console.error('Error in company controller:', error);
        return res.status(500).json({ message: 'Internal Server Error', status: 500 });
    }
}

const approveCompanyRequest = async (req, res) => {
    try {
        await Company.update({
            status: 'Approved'
        }, {
            where: {
                id: req.params.id
            }
        });

        return res.status(200).json({message: 'Company Approved'});

    }catch (error){
        console.error('Error in company controller:', error);
        return res.status(500).json({ message: 'Internal Server Error', status: 500 });
    }
}

const deleteCompanyRequest = async (req, res) => {
    try {
        await Company.destroy({
            where: {
                id: req.params.id
            }
        });

        return res.status(200).json({message: 'Company Deleted'});

    }catch (error){
        console.error('Error in company controller:', error);
        return res.status(500).json({ message: 'Internal Server Error', status: 500 });
    }
}

const getOneCompanyDetail = async (req, res) => {
    try {
        const company = await Company.findOne({
            where: {
                id: req.params.id
            },
            attributes: ['dateOfIncorporation', 'partnershipType', 'partnershipRequirement', 'numberOfEmployees','investmentType', 'whatOnOffer', 'status']
        })

        if(company === null){
            return res.status(200).json({
                message: 'No Company Found'
            })
        }

        return res.status(200).json({ company })
    }catch (error){
        console.error('Error in company controller:', error);
        return res.status(500).json({ message: 'Internal Server Error', status: 500 });
    }
}

module.exports = {
    getAllCompanyList,
    getOneCompanyDetail,
    approveCompanyRequest,
    deleteCompanyRequest,
    getCompanyBySearch,
    getCompanyByFilter
}