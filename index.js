const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');

// middleware
app.use(express.json());

// connecting mongoDB
mongoose
  .connect(process.env.DATABASE_URI)
  .then(() => console.log('connected to mongo'))
  .catch((err) => console.log(err));

// import auth router
const authRouter = require('./routes/auth');
app.use('/api/v1', authRouter);

app.listen(5000, () => {
  console.log('server is on port 5000');
});
