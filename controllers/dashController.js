const { Sequelize } = require("sequelize");
const Investor = require('../models/Investor');
const Company = require('../models/Company');
const InvestmentType = require('../models/InvestmentType');
const CompanyInvestmentType = require('../models/CompanyInvestmentType');

const getTotalNumberOfInvestors = async (req, res) => {
    try{
        const investorsCount = await Investor.count();

        return res.status(200).json({ count: investorsCount});
    }catch(error){
        console.error('Error in dashboard controller:', error);
        res.status(500).json({ message: 'An error occurred' });
    }
}

const getTotalNumberOfCompany = async (req, res) => {
    try{
        const companiesCount = await Company.count();

        return res.status(200).json({ count: companiesCount});
    }catch(error){
        console.error('Error in dashboard controller:', error);
        res.status(500).json({ message: 'An error occurred' });
    }
}

const getAllCompaniesTypesAndStat = async (req, res) => {
    try{
        const allIndustries = [];
        const allIndusrtyNumber = [];

        const companies = await Company.findAll({
            attributes: ['productIndustry1', 'productIndustry2', 'productIndustry3', 'productIndustry4', 
            'companyIndustry1', 'companyIndustry2', 'companyIndustry3', 'companyIndustry4']
        });

        for(let company of companies){
            const { dataValues } = company;

            for (const key of Object.keys(dataValues)) {
                const value = dataValues[key];

                if(value !== ''){

                    const categoryIndex = allIndustries.findIndex(cate => cate === value);
                    if(categoryIndex === -1){
                        allIndustries.push(value);
                        allIndusrtyNumber.push(1);
                    }else {
                        allIndusrtyNumber[categoryIndex] = allIndusrtyNumber[categoryIndex] + 1;
                    }
                }
            }
        }

        return res.status(200).json({ industries: allIndustries, industryNumber: allIndusrtyNumber });
    }catch(error){
        console.error('Error in dashboard controller:', error);
        res.status(500).json({ message: 'An error occurred' });
    }
}

const getAllInvestorsTypesAndStat = async (req, res) => {
    try{
        const allIndustries = [];
        const allIndusrtyNumber = [];

        const investors = await Investor.findAll({
            attributes: ['investmentIndustryPreference1', 'investmentIndustryPreference2', 'investmentIndustryPreference3',
             'investmentIndustryPreference4']
        });

        for(let investor of investors){
            const { dataValues } = investor;

            for (const key of Object.keys(dataValues)) {
                const value = dataValues[key];

                if(value !== ''){

                    const categoryIndex = allIndustries.findIndex(cate => cate === value);
                    if(categoryIndex === -1){
                        allIndustries.push(value);
                        allIndusrtyNumber.push(1);
                    }else {
                        allIndusrtyNumber[categoryIndex] = allIndusrtyNumber[categoryIndex] + 1;
                    }
                }
            }
        }

        return res.status(200).json({ industries: allIndustries, industryNumber: allIndusrtyNumber });
    }catch(error){
        console.error('Error in dashboard controller:', error);
        res.status(500).json({ message: 'An error occurred' });
    }
}

const getInvestorTypesAndStat = async (req, res) => {
    const investorTypes = [{
        name: 'Angel-Investor',
        value: 0,
    },
    {
        name: 'Business-Incubator',
        value: 0,
    },
    {
        name: 'Credit-Enhancement',
        value: 0,
    },
    {
        name: 'Venture-Capitalists',
        value: 0,
    }];

    const category = req.query.category;
    let investors;

    try{
        if(category === 'All'){
            investors = await Investor.findAll({
                attributes: ['investorType']
            });
        }else {
            investors = await Investor.findAll({
                attributes: ['investorType'],
                where: {
                    [Sequelize.Op.or]: [
                        { investmentIndustryPreference1: category },
                        { investmentIndustryPreference2: category },
                        { investmentIndustryPreference3: category },
                        { investmentIndustryPreference4: category },
                      ],
                }
            });
        }

        for(let investor of investors){
            const { dataValues } = investor;
            if(dataValues.investorType === 'Angel-Investor'){
                investorTypes[0].value = investorTypes[0].value + 1;
            }else if(dataValues.investorType === 'Business-Incubator'){
                investorTypes[1].value = investorTypes[1].value + 1;
            }else if(dataValues.investorType === 'Credit-Enhancement'){
                investorTypes[2].value = investorTypes[2].value + 1;
            }else if(dataValues.investorType === 'Venture-Capitalists'){
                investorTypes[3].value = investorTypes[3].value + 1;
            }
        }
        
        return res.status(200).json(investorTypes)
    }catch(error){
        console.error('Error in dashboard controller:', error);
        res.status(500).json({ message: 'An error occurred' });
    }
}

const getCompanyTypesAndStat = async (req, res) => {
    const companyTypes = [{
        name: 'Start-Up',
        value: 0,
    },
    {
        name: 'Scale-Up',
        value: 0,
    },
    {
        name: 'R&D',
        value: 0,
    },
    {
        name: 'Other',
        value: 0,
    }];

    const category = req.query.category;
    let companies;

    try{
        if(category === 'All'){
            companies = await Company.findAll({
                include: InvestmentType,
                raw: false,
            });
        }else {
            companies = await Company.findAll({
                include: InvestmentType,
                where: {
                    [Sequelize.Op.or]: [
                        { productIndustry1: category },
                        { productIndustry2: category },
                        { productIndustry3: category },
                        { productIndustry4: category },
                        { companyIndustry1: category },
                        { companyIndustry2: category },
                        { companyIndustry3: category },
                        { companyIndustry4: category },
                      ],
                }
            });
        }

        for(let company of companies){
            const { dataValues } = company;
            const investTypes = dataValues.InvestmentTypes;

            for(let invType of investTypes){
                const finalType = invType.dataValues.InvestmentType;
                if(finalType === 'Start-Up'){
                    companyTypes[0].value = companyTypes[0].value + 1; 
                }else if(finalType === 'Scale-Up'){
                    companyTypes[1].value = companyTypes[1].value + 1; 
                }else if(finalType === 'R&D'){
                    companyTypes[2].value = companyTypes[2].value + 1; 
                }else if(finalType === 'Other'){
                    companyTypes[3].value = companyTypes[3].value + 1; 
                }
            }
        }
        
        return res.status(200).json(companyTypes);
    }catch(error){
        console.error('Error in dashboard controller:', error);
        res.status(500).json({ message: 'An error occurred' });
    }
}

module.exports = {
    getTotalNumberOfInvestors,
    getTotalNumberOfCompany,
    getAllCompaniesTypesAndStat,
    getAllInvestorsTypesAndStat,
    getInvestorTypesAndStat,
    getCompanyTypesAndStat,
}