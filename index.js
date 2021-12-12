const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccesStatue: 200,
};

app.use(cors(corsOptions));

// middleware
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, '/images')));

// connecting mongoDB
mongoose
  .connect(process.env.DATABASE_URI)
  .then(() => console.log('connected to mongo'))
  .catch((err) => console.log(err));

// image storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null);
  },
});
const upload = multer({ storage: storage });
app.post('/api/v1/upload', upload.single('file'), (req, res) => {
  res.status(200).json('File has been uploaded');
});

// import auth router
const authRouter = require('./routes/auth');
app.use('/api/v1/auth', authRouter);

// import user router
const userRouter = require('./routes/users');
app.use('/api/v1/users', userRouter);

// import post router
const postRouter = require('./routes/posts');
app.use('/api/v1/posts', postRouter);

// import category router
const categoryRouter = require('./routes/categories');
app.use('/api/v1/categories', categoryRouter);
app.listen(5000, () => {
  console.log('server is on port 5000');
});
