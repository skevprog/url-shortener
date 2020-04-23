const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');

const app = express();

app.set('view engine', 'ejs');

// Connect to db
connectDB();

app.use(express.json({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', require('./routes/urls'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
