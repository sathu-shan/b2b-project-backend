const { Sequelize } = require("sequelize");

const Investor = require('../models/Investor');
const InvestmentType = require('../models/InvestmentType');

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

module.exports = { 
  getAllInvestors,
  searchInvestors,
  filterInvestors,
  getAllInvestorCount
};
