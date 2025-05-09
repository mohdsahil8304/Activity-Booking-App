const express = require('express');
const app = express();
const path = require("path");
const cookie = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
require("../config/db");
const userRoutes = require('../routes/userRoutes');
const activityRoutes = require('../routes/activityRoutes');
const bookingRoutes = require('../routes/bookingRoutes');
dotenv.config({ path: "./.env" });

app.use(cookie());
app.use(cors());





// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/api', userRoutes);
app.use('/api', activityRoutes);
app.use('/api', bookingRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`listening to the port at ${PORT}`));
