const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const shopsRouter = require('./routers/shopsRouter');
const productsRouter = require('./routers/productsRouter');
const usersRouter = require('./routers/usersRouter');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(
  cors({
    origin: '*',
    methods: 'GET,POST,DELETE',
    preflightContinue: false,
  }),
  // {
  //   header: {
  //     'Access-Control-Allow-Origin': '*',
  //     'Access-Control-Allow-Methods': '*',
  //     'Access-Control-Allow-Headers': '*',
  //     'Access-Control-Allow-Credentials': true,
  //   },
  //   // 'https://pnevmat.github.io/eliftech-tt-front/'
  //   // origin: 'https://pnevmat.github.io/',
  //   // credentials: true,
  // }
);
app.use(express.json());

app.use('/shops', shopsRouter);
app.use('/products', productsRouter);
app.use('/users', usersRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: err });
});

module.exports = app;
