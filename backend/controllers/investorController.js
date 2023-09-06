const Investor = require('../models/Investor'); // Use Sequelize Investor model
const logger = require('../config/logger');
const { Op } = require('sequelize'); // Import Sequelize's Op for query operations
const sequelize = require('../config/db'); // Path to your sequelize configuration
const {Sequelize} = require("sequelize");


class InvestorController {
  static async registerInvestor(req, res) {
    try {
      const {
        // Extract fields from req.body
        status,
        firstName,
        lastName,
        country,
        address,
        companyRole,
        numberOfEmployees,
        assetsUnderManagement,
        investorType,
        investorTypeDescription,
        investmentType,
        investmentTypeDescription,
        investmentIndustryPreference1,
        investmentIndustryPreference2,
        investmentIndustryPreference3,
        investmentIndustryPreference4,
      } = req.body;

      // Validate fields (similar validation as before)
      if (firstName.length <= 3 || lastName.length <= 3 || address.length <= 3 || companyRole.length <= 3 || address.length <= 5) {
        return res.status(400).json({ message: 'Fields must contain more than 3 characters' });
      }
console.log("Hello")
      // Create a new investor using Sequelize model
      await Investor.create({
        status: 'Pending',
        firstName,
        lastName,
        country,
        address,
        companyRole,
        numberOfEmployees,
        assetsUnderManagement,
        investorType,
        investorTypeDescription: investorType === 'Other' ? investorTypeDescription : null,
        investmentType,
        investmentTypeDescription: investmentType === 'Other' ? investmentTypeDescription : null,
        investmentIndustryPreference1,
        investmentIndustryPreference2,
        investmentIndustryPreference3,
        investmentIndustryPreference4,
      });

      // Log the successful registration
      logger.info(`Investor successfully registered: ${firstName}`);

      // Respond with success message
      res.status(201).json({ message: 'Investor registered successfully' });
    } catch (error) {
      console.error('Error registering investor:', error);
      res.status(500).json({ message: 'An error occurred' });
    }
  }
}

// dashboard investor count getting

const getInvestorStatistics = async (req, res) => {
  try {
    // Fetch the count of all investors using Sequelize
    const totalInvestorCount = await Investor.count();

    // Define an array of column names to count for industry preferences
    const columnNames = [
      'investmentIndustryPreference1',
      'investmentIndustryPreference2',
      'investmentIndustryPreference3',
      'investmentIndustryPreference4',
    ];

    // Create an object to store industry preference counts
    const investorCountsByColumn = {};

    // Loop through each column and fetch distinct values
    for (const columnName of columnNames) {
      const investorColumnValues = await Investor.findAll({
        attributes: [
          [Sequelize.fn('DISTINCT', Sequelize.col(columnName)), columnName],
          [Sequelize.fn('COUNT', Sequelize.col(columnName)), 'count'],
        ],
        group: [columnName],
        raw: true,
        where: {
          [columnName]: {
            [Op.not]: null, // Exclude null values
            [Op.not]: '',   // Exclude empty strings
          },
        },
      });

      // Accumulate the counts across all columns
      investorColumnValues.forEach((row) => {
        const value = row[columnName];
        investorCountsByColumn[value] = (investorCountsByColumn[value] || 0) + row['count'];
      });
    }

    // Fetch distinct investor types
    const investorTypeValues = await Investor.findAll({
      attributes: [
        [Sequelize.fn('DISTINCT', Sequelize.col('investorType')), 'investorType'],
        [Sequelize.fn('COUNT', Sequelize.col('investorType')), 'count'],
      ],
      group: ['investorType'],
      raw: true,
      where: {
        investorType: {
          [Op.not]: null, // Exclude null values
          [Op.not]: '',   // Exclude empty strings
        },
      },
    });

    // Build an object with investor type values and their counts
    const investorTypeCounts = {};
    investorTypeValues.forEach((row) => {
      investorTypeCounts[row['investorType']] = row['count'];
    });

    res.json({ totalInvestorCount, investorTypeCounts, investorCountsByColumn });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch investor counts' });
  }
};



const getInvestorDetails = async (req, res) => {
  try {
    // Fetch the investor details using Sequelize
    const investors = await Investor.findAll({
      attributes: [
        'id',
        'status',
        [sequelize.literal('CONCAT(firstName, ".", lastName)'), 'investor'], // Concatenate first name and last name
        'investmentIndustryPreference1',
        'investmentIndustryPreference2',
        'investmentIndustryPreference3',
        'investmentIndustryPreference4',
        'investorType',
        'investmentType',
        'country',
        'address',
        'companyRole',
        'numberOfEmployees',
        'assetsUnderManagement',
        'investorTypeDescription',
        'investmentTypeDescription',
      ],
      where: {
        [Op.and]: [
          {
            [Op.or]: [
              {
                investmentIndustryPreference1: {
                  [Op.not]: null,
                  [Op.not]: '',
                },
              },
              {
                investmentIndustryPreference2: {
                  [Op.not]: null,
                  [Op.not]: '',
                },
              },
              {
                investmentIndustryPreference3: {
                  [Op.not]: null,
                  [Op.not]: '',
                },
              },
              {
                investmentIndustryPreference4: {
                  [Op.not]: null,
                  [Op.not]: '',
                },
              },
            ],
          },
          {
            [Op.or]: [
              {
                investorType: {
                  [Op.not]: null,
                  [Op.not]: '',
                },
              },
              {
                investorTypeDescription: {
                  [Op.not]: null,
                  [Op.not]: '',
                },
              },
            ],
          },
          {
            [Op.or]: [
              {
                investmentType: {
                  [Op.not]: null,
                  [Op.not]: '',
                },
              },
              {
                investmentTypeDescription: {
                  [Op.not]: null,
                  [Op.not]: '',
                },
              },
            ],
          },
        ],
      },
    });

    // Format the response
    const filteredDataInvestors = investors.map((investor) => ({
      id: investor.id,
      isPending: investor.status === 'Pending',
      investor: investor.dataValues.investor, // Use the concatenated field
      country: investor.country,
      address: investor.address,
      companyRole: investor.companyRole,
      numberOfEmployees: investor.numberOfEmployees,
      assetsUnderManagement: investor.assetsUnderManagement,
      industry: [
        investor.investmentIndustryPreference1,
        investor.investmentIndustryPreference2,
        investor.investmentIndustryPreference3,
        investor.investmentIndustryPreference4,
      ],
      investorTypes: [
        investor.investorType,
        investor.investorTypeDescription,
      ],
      investmentTypes: [
        investor.investmentType,
        investor.investmentTypeDescription,
      ],
    }));

    res.status(200).json({ investors: filteredDataInvestors });
  } catch (error) {
    console.error('Error in investor controller:', error);
    res.status(500).json({ message: 'Internal Server Error', status: 500 });
  }
};

const getInvestorByFilter = async (req, res) => {
  try {
      const investmentString = req.query.investment;
      const industryString = req.query.industry;

      const investors = await Investor.findAll({
        attributes: [
          'id',
          'status',
          [sequelize.literal('CONCAT(firstName, ".", lastName)'), 'investor'], // Concatenate first name and last name
          'investmentIndustryPreference1',
          'investmentIndustryPreference2',
          'investmentIndustryPreference3',
          'investmentIndustryPreference4',
          'investorType',
          'investmentType',
          'country',
          'address',
          'companyRole',
          'numberOfEmployees',
          'assetsUnderManagement',
          'investorTypeDescription',
          'investmentTypeDescription',
        ],
        where: {
          investmentType: investmentString,
          [Sequelize.Op.or]: [
              { investmentIndustryPreference1: industryString },
              { investmentIndustryPreference2: industryString },
              { investmentIndustryPreference3: industryString },
              { investmentIndustryPreference4: industryString },
          ],
      }
      });

      const filteredDataInvestors = [];
      investors.forEach((investorDetail) => {
        console.log(investorDetail)
          const investor = {
            id: investorDetail.id,
            isPending: investorDetail.status === 'Pending',
            investor: investorDetail.dataValues.investor, // Use the concatenated field
            country: investorDetail.country,
            address: investorDetail.address,
            companyRole:investorDetail.companyRole,
            numberOfEmployees: investorDetail.numberOfEmployees,
            assetsUnderManagement:investorDetail.assetsUnderManagement,
            industry: [
              investorDetail.investmentIndustryPreference1,
              investorDetail.investmentIndustryPreference2,
              investorDetail.investmentIndustryPreference3,
              investorDetail.investmentIndustryPreference4,
            ],
            investorTypes: [
              investorDetail.investorType,
              investorDetail.investorTypeDescription,
            ],
            investmentTypes: [
              investorDetail.investmentType,
              investorDetail.investmentTypeDescription,
            ],
          }
          filteredDataInvestors.push(investor);
      });

      return res.status(200).json({ investors: filteredDataInvestors });

  }catch (error){
      console.error('Error in investor controller:', error);
      return res.status(500).json({ message: 'Internal Server Error', status: 500 });
  }
}

const getInvestorBySearch = async (req, res) => {
  try {
      const searchString = req.query.search;

      const investors = await Investor.findAll({
          where: {
              firstName: {
                  [Sequelize.Op.like]: `%${searchString}%`,
              },
          },
          attributes: [
            'id',
            'status',
            'firstName',
            'investmentIndustryPreference1',
            'investmentIndustryPreference2',
            'investmentIndustryPreference3',
            'investmentIndustryPreference4',
            'investorType',
            'investmentType',
            'country',
            'address',
            'companyRole',
            'numberOfEmployees',
            'assetsUnderManagement',
            'investorTypeDescription',
            'investmentTypeDescription',
          ],

                });

      const filteredDataInvestors = [];
      investors.forEach(({ dataValues }) => {
        console.log(dataValues)
        const investor = {
          id: dataValues.id,
          isPending: dataValues.status === 'Pending',
          investor: dataValues.firstName, // Use the concatenated field
          country: dataValues.country,
          address: dataValues.address,
          companyRole:dataValues.companyRole,
          numberOfEmployees: dataValues.numberOfEmployees,
          assetsUnderManagement:dataValues.assetsUnderManagement,
          industry: [
            dataValues.investmentIndustryPreference1,
            dataValues.investmentIndustryPreference2,
            dataValues.investmentIndustryPreference3,
            dataValues.investmentIndustryPreference4,
          ],
          investorTypes: [
            dataValues.investorType,
            dataValues.investorTypeDescription,
          ],
          investmentTypes: [
            dataValues.investmentType,
            dataValues.investmentTypeDescription,
          ],
        }
          filteredDataInvestors.push(investor);
      });

      return res.status(200).json({investors: filteredDataInvestors});

  }catch (error){
      console.error('Error in investor controller:', error);
      return res.status(500).json({ message: 'Internal Server Error', status: 500 });
  }
}

const approveInvestorRequest = async (req, res) => {
  try {
      await Investor.update({
          status: 'Approved'
      }, {
          where: {
              id: req.params.id
          }
      });

      return res.status(200).json({message: 'Investor Approved'});

  }catch (error){
      console.error('Error in investor controller:', error);
      return res.status(500).json({ message: 'Internal Server Error', status: 500 });
  }
}

const getOneInvestorDetail = async (req, res) => {
  try {
      const investor = await Investor.findOne({
          where: {
              id: req.params.id
          },
          attributes: [
                     'id',
                     'firstName',
                     'investmentIndustryPreference1',
                     'investmentIndustryPreference2',
                     'investmentIndustryPreference3',
                     'investmentIndustryPreference4',
                     'investorType',
                     'investmentType',
                     'country',
                     'address',
                     'companyRole',
                     'numberOfEmployees',
                     'assetsUnderManagement',
                     'investorTypeDescription',
                     'investmentTypeDescription',
                   ],      })

      if(investor === null){
          return res.status(200).json({
              message: 'No Investor Found'
          })
      }

      return res.status(200).json({ investor })
  }catch (error){
      console.error('Error in investor controller:', error);
      return res.status(500).json({ message: 'Internal Server Error', status: 500 });
  }
}

const deleteInvestorRequest = async (req, res) => {
  try {
      await Investor.destroy({
          where: {
              id: req.params.id
          }
      });

      return res.status(200).json({message: 'Investor Deleted'});

  }catch (error){
      console.error('Error in investor controller:', error);
      return res.status(500).json({ message: 'Internal Server Error', status: 500 });
  }
}

module.exports = {InvestorController,getInvestorStatistics,getInvestorDetails,
  getInvestorByFilter,
  getInvestorBySearch,
  approveInvestorRequest,
  getOneInvestorDetail,
  deleteInvestorRequest};
