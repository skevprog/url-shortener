const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect to db
connectDB();

app.use(express.json({ extended: false }));

app.use('/', require('./routes'));

app.use('/api/urls', require('./routes/urls'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
