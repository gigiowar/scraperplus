const express = require('express');
const bodyParser = require('body-parser');
const { handleError } = require('./helpers/error');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => res.status(200).json('Hello world'));

require('./routes/category.js')(app);
require('./routes/product.js')(app);

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  handleError(err, res);
});

// Create a Server
const server = app.listen(3000, () => {
  const { port } = server.address();

  // eslint-disable-next-line no-console
  console.log(`App listening at port ${port}`);
});
