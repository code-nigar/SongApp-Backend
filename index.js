const express = require('express');
const mongoose = require('mongoose');
const songRoutes = require('./routes/songRoutes');
const cors = require('cors'); 
const { port, connectionString } = require('./config');
const app = express();
const serverPort = port || 2001;

// Connect to MongoDB
mongoose.connect(connectionString, {
    autoIndex: true
});

// Use the cors middleware to enable Cross-Origin Resource Sharing
app.use(cors());
app.use(express.json());
app.use('/api', songRoutes);
app.listen(serverPort, () => {
 console.log(`Server is running on port ${serverPort}`);
});