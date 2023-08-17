const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const investorRoutes = require('./routes/investorRoutes'); 

const app = express();
const PORT = 3001;

app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/investor', investorRoutes); 

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
