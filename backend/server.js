const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const userRoutes = require('./routes/userrout');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('Frontend')); // Serve frontend files
app.use('/api', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
