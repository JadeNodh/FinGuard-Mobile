const express = require('express');
const app = express();
const port = 3000;

const transactionsRouter = require('./routes/transactions');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/transactions', transactionsRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
