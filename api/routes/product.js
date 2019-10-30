module.exports = (app) => {
  // eslint-disable-next-line global-require
  const product = require('../controllers/product.js');

  // Retrieve all Products
  app.get('/api/products', product.findAll);
};
