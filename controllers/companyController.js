const Company = require('../models/Company');
const User = require('../models/User');
const InvestmentType = require('../models/InvestmentType');
const MarketPrecence = require('../models/MarketPrecence');
const Collaterals = require('../models/Collaterals');
const Referrals = require('../models/Referrals');
const Stakeholders = require('../models/Stakeholders');
const {Sequelize} = require("sequelize");

const getAllCompanyList = async (req, res) => {
    try {
        const companies = await Company.findAll({
            include: InvestmentType,
            attributes: ['id','companyName', 'productIndustry1', 'companyIndustry1', 'whatOnOffer', 'status', 
            'elevatorPitch']
        });

        const filteredDataCompanies = [];
        companies.forEach(({ dataValues }) => {
            const investmentType = dataValues.InvestmentTypes;
            let finalInvestmentType = '';
            for(let type of investmentType){
                finalInvestmentType = finalInvestmentType + type.InvestmentType.toString() + ' ';
            }

            const company = {
                id: dataValues.id,
                company: dataValues.companyName,
                industry: dataValues.whatOnOffer === 'Product' ? dataValues.productIndustry1 : dataValues.companyIndustry1,
                investmentType: finalInvestmentType,
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
            include: InvestmentType,
            attributes: ['id','companyName', 'productIndustry1', 'companyIndustry1', 'whatOnOffer', 'status', 'elevatorPitch'],
            where: {
                [Sequelize.Op.or]: [
                    { productIndustry1: industryString },
                    { productIndustry2: industryString },
                    { productIndustry3: industryString },
                    { productIndustry4: industryString },
                    { companyIndustry1: industryString },
                    { companyIndustry2: industryString },
                    { companyIndustry3: industryString },
                    { companyIndustry4: industryString },
                ]
            }
        });

        const filteredDataCompanies = [];
        companies.forEach(({ dataValues }) => {
            const investmentType = dataValues.InvestmentTypes;
            let isInInvestmentType = investmentType.findIndex(type => type.InvestmentType === investmentString);
            let finalInvestmentType = '';
            
            for(let type of investmentType){
                finalInvestmentType = finalInvestmentType + type.InvestmentType.toString() + ' ';
            }

            if(isInInvestmentType !== -1){
                const company = {
                    id: dataValues.id,
                    company: dataValues.companyName,
                    industry: dataValues.whatOnOffer === 'Product' ? dataValues.productIndustry1 : dataValues.companyIndustry1,
                    productOrCompany: dataValues.whatOnOffer,
                    investmentType: finalInvestmentType,
                    isPending: dataValues.status === 'Pending',
                    elevationPitch: dataValues.elevatorPitch
                }
                filteredDataCompanies.push(company);
            }
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
            include: InvestmentType,
            where: {
                companyName: {
                    [Sequelize.Op.like]: `%${searchString}%`,
                },
            },
            attributes: ['id','companyName', 'productIndustry1', 'companyIndustry1', 'whatOnOffer', 'status', 'elevatorPitch']
        });

        const filteredDataCompanies = [];
        companies.forEach(({ dataValues }) => {
            const investmentType = dataValues.InvestmentTypes;
            let finalInvestmentType = '';
            for(let type of investmentType){
                finalInvestmentType = finalInvestmentType + type.InvestmentType.toString() + ' ';
            }

            const company = {
                id: dataValues.id,
                company: dataValues.companyName,
                industry: dataValues.whatOnOffer === 'Product' ? dataValues.productIndustry1 : dataValues.companyIndustry1,
                investmentType: finalInvestmentType,
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
        const company = await Company.findByPk(req.params.id);
        const userId = investor.userId;

        await Company.destroy({
            where: {
                id: req.params.id
            }
        });
        
        await User.destroy({
            where: {
              id: userId
            }
        });

        return res.status(200).json({message: 'Company Deleted'});

    }catch (error){
        console.error('Error in company controller:', error);
        return res.status(500).json({ message: 'Internal Server Error', status: 500 });
    }
}

const getAllCompaniesCount = async (req, res) => {
    try{
        const count = await Company.count({
            where: {
              status: 'Pending'
            }
        });

        console.log(count, 'count')  
      
        return res.status(200).json({ count: count })
    }catch(error){
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
            include: [
                { model: MarketPrecence, as: 'marketPrecences' },
                { model: Collaterals, as: 'collaterals' },
                { model: Referrals, as: 'referrals' },
                { model: Stakeholders, as: 'stakeholders' },
            ],
            attributes: ['id', 'status', 'companyName', 'dateOfIncorporation', 'partnershipType', 'partnershipRequirement',
             'numberOfEmployees', 'whatOnOffer', 'elevatorPitch', 'isSustainable', 'numberOfEmployees', 
             'numberOfEmployees', 'productDescription', 'productDescription', 'numberOfInstallations', 'productType', 
             'technologyEmployed', 'productIndustry1', 'productIndustry2', 'productIndustry3', 'productIndustry4', 
             'natureOfBusiness', 'companyIndustry1', 'companyIndustry2', 'companyIndustry3', 'companyIndustry4', 'keyValueProposition']
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
    getCompanyByFilter,
    getAllCompaniesCount
}