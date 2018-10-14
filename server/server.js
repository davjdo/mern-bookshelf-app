const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

// Connect to Mongo
mongoose.Promise = global.Promise;
mongoose
  .connect(
    process.env.MONGODB_URI,
    { useNewUrlParser: true }
  ) // Adding new mongo url parser
  .then(() => console.log('Mongo DB Connected ...'))
  .catch(err => console.log(err));

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

// Express server running
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server is running on port ${port}`));
