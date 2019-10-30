module.exports = (app) => {
  // eslint-disable-next-line global-require
  const categories = require('../controllers/category.js');

  // Create a new Category
  app.post('/api/categories', categories.createCategory);

  // Retrieve all Categories
  app.get('/api/categories', categories.findAll);

  // Retrieve a single Category by Id
  app.get('/api/categories/:id', categories.findByPk);

  // Update a Category with Id
  app.put('/api/categories/:id', categories.updateCategory);

  // Delete a Category with Id
  app.delete('/api/categories/:id', categories.deleteCategory);
};
