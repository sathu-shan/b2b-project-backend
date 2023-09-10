const { Sequelize } = require("sequelize");

const Investor = require('../models/Investor');
const InvestmentType = require('../models/InvestmentType');
const User = require('../models/User');

const getAllInvestors = async (req, res) => {
  try{
    const finalInvestorList = [];

    const investors = await Investor.findAll({
      include: InvestmentType,
      attributes: ['firstName', 'lastName', 'investmentIndustryPreference1', 'investorType', 'status', 'id']
    });

    for(let investor of investors){
      let investmentAllTypes = '';
      const { dataValues } = investor;
      const types = dataValues.InvestmentTypes;
      for(let type of types){
        investmentAllTypes = investmentAllTypes + type.InvestmentType.toString() + " ";
      }
      
      let finalInvestor = {
        id: investor.id,
        investor: `${investor.firstName} ${investor.lastName}`,
        industry: investor.investmentIndustryPreference1,
        investorType: investor.investorType,
        investmentType: investmentAllTypes,
        isPending: investor.status === 'Pending' ? true : false
      }

      finalInvestorList.push(finalInvestor);
    }

    return res.status(200).json({investors: finalInvestorList});

  }catch(error){
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch investor counts' });
  }
}

const searchInvestors = async (req, res) => {
  try{
    const searchWord = req.query.search;
    const finalInvestorList = [];

    const investors = await Investor.findAll({
      include: InvestmentType,
      attributes: ['firstName', 'lastName', 'investmentIndustryPreference1', 'investorType', 'status', 'id'],
      where: {
        [Sequelize.Op.or]: [
          {
            firstName: {
              [Sequelize.Op.like]: `%${searchWord}%`,
            }
          },
          {
            lastName: {
              [Sequelize.Op.like]: `%${searchWord}%`,
            }
          }
        ]
      }
    });

    for(let investor of investors){
      let investmentAllTypes = '';
      const { dataValues } = investor;
      const types = dataValues.InvestmentTypes;
      for(let type of types){
        investmentAllTypes = investmentAllTypes + type.InvestmentType.toString() + " ";
      }
      
      let finalInvestor = {
        id: investor.id,
        investor: `${investor.firstName} ${investor.lastName}`,
        industry: investor.investmentIndustryPreference1,
        investorType: investor.investorType,
        investmentType: investmentAllTypes,
        isPending: investor.status === 'Pending' ? true : false
      }

      finalInvestorList.push(finalInvestor);
    }

    return res.status(200).json({investors: finalInvestorList});

  }catch(error){
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch investor counts' });
  }
}

const filterInvestors = async (req, res) => {
  try{
    const industry = req.query.industry;
    const investment = req.query.investment;
    const finalInvestorList = [];

    const investors = await Investor.findAll({
      include: InvestmentType,
      attributes: ['firstName', 'lastName', 'investmentIndustryPreference1', 'investorType', 'status', 'id'],
      where: {
        investmentIndustryPreference1: industry
      }
    });

    
    for(let investor of investors){
      let investmentAllTypes = '';
      const { dataValues } = investor;
      const types = dataValues.InvestmentTypes;
      const isInInvestmentType = types.findIndex(type => type.InvestmentType === investment);

      if(isInInvestmentType !== -1){
        for(let type of types){
          investmentAllTypes = investmentAllTypes + type.InvestmentType.toString() + " ";
        }
        
        let finalInvestor = {
          id: investor.id,
          investor: `${investor.firstName} ${investor.lastName}`,
          industry: investor.investmentIndustryPreference1,
          investorType: investor.investorType,
          investmentType: investmentAllTypes,
          isPending: investor.status === 'Pending' ? true : false
        }
  
        finalInvestorList.push(finalInvestor);
      }
    }

    return res.status(200).json({investors: finalInvestorList});


  }catch(error){
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch investor counts' });
  }
}

const getAllInvestorCount = async (req, res) => {
  try{
    const count = await Investor.count({
      where: {
        status: 'Pending'
      }
    });

    return res.status(200).json({ count: count })
  }catch(error){
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch investor counts' });
  }
}

const acceptRequest = async (req, res) => {
  try{
    await Investor.update({
      status: 'Approved'
    },{
      where: {
        id: req.params.id
      }
    });
    
    return res.status(200).json({ message: 'Company Approved' });
  }catch(error){
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch investor counts' });
  }
}

const rejectRequest = async (req, res) => {
  try{
    const investor = await Investor.findByPk(req.params.id);
    const userId = investor.userId;

    await Investor.destroy({
      where: {
        id: req.params.id,
      }
    });

    await User.destroy({
      where: {
        id: userId
      }
    });

    return res.status(200).json({ message: 'Company Deleted' });
  }catch(error){
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch investor counts' });
  }
}

const getSingleInvestor = async (req, res) => {
  try{
    const investor = await Investor.findByPk(req.params.id, {
      attributes: ['id', 'status', 'firstName', 'lastName', 'country', 'address', 'companyRole', 'numberOfEmployees', 
      'assetsUnderManagement', 'investorType', 'investmentIndustryPreference1', 'investmentIndustryPreference2', 
      'investmentIndustryPreference3', 'investmentIndustryPreference4']
    });

    return res.status(200).json(investor);

  }catch(error){
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch investor counts' });
  }
}

module.exports = { 
  getAllInvestors,
  searchInvestors,
  filterInvestors,
  getAllInvestorCount,
  acceptRequest,
  rejectRequest,
  getSingleInvestor
};