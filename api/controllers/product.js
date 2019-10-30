const { Product } = require('../models');

// FETCH all Categories
const findAll = async (req, res, next) => {
  try {
    const page = req.query.page ? req.query.page : 1;
    const offset = (page - 1) * 5;

    Product.findAll({
      offset,
      limit: 5,
    }).then((products) => {
      // Send all products to Client
      res.status(200).send({
        products,
      });
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  findAll,
};
