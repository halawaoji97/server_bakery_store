const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const productRoute = require('./routes/product');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('connetced to db'))
  .catch((error) => {
    console.log(error);
  });

app.use('/api/v1', productRoute);

const PORT = process.env.PORT || 5000;

app.listen(process.env.PORT || 5000, () => {
  console.log(`server running on port ${PORT}`);
});
