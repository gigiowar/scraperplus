const { Category } = require('../models');
const { ErrorHandler } = require('../helpers/error');

// Post a Category
const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    const category = await Category.findOne({ where: { name } });
    if (category) {
      throw new ErrorHandler(409, 'There is already one category with this name!');
    }

    // Save to MySQL database
    Category.create({
      name,
    }).then((result) => {
      // Send created category to client
      res.status(200).send({
        result,
      });
    });
  } catch (error) {
    next(error);
  }
};

// FETCH all Categories
const findAll = async (req, res, next) => {
  try {
    Category.findAll().then((categories) => {
      // Send all categories to Client
      res.status(200).send({
        categories,
      });
    });
  } catch (error) {
    next(error);
  }
};

// Find a Category by Id
const findByPk = async (req, res, next) => {
  try {
    Category.findByPk(req.params.id).then((category) => {
      // Send catedory to Client
      res.status(200).send({
        category,
      });
    });
  } catch (error) {
    next(error);
  }
};

// Update a Category
const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const category = await Category.findOne({ where: { id } });
    if (!category) {
      throw new ErrorHandler(404, 'Category not found!');
    }

    // Save to MySQL database
    Category.update(
      { name },
      {
        where: { id },
      },
    ).then((result) => {
      // Send created category to client
      res.status(200).send({
        result,
      });
    });
  } catch (error) {
    next(error);
  }
};

// Delete a Category
const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    const category = await Category.findOne({ where: { id } });
    if (!category) {
      throw new ErrorHandler(404, 'Category not found!');
    }

    // Save to MySQL database
    Category.destroy({
      where: { id },
    }).then((result) => {
      // Send created category to client
      res.status(200).send({
        result,
      });
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  findAll,
  createCategory,
  findByPk,
  updateCategory,
  deleteCategory,
};
