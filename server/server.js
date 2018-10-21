const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');

// Import routes
const users = require('./routes/api/users');
const books = require('./routes/api/books');

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
app.use(express.static('client/build'));

// Use routes
app.use('/api/users', users);
app.use('/api/books', books);

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  const path = require('path');
  app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
  });
}

// Express server running
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server is running on port ${port}`));
