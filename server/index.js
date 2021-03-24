const express = require('express');
const cors = require('cors');

const { data, categories } = require('./data.js');

const app = express();

app.use(cors());

app.get('/api/products/', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(data);
});

app.get('/api/product/categories/', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(categories);
});

app.listen(3001, () => console.log('Server successfully started on port 3001!'));
