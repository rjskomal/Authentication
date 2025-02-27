const express = require('express');
const app = express();

const cors = require('cors');
app.use(
    cors({
      origin: "http://localhost:3000",  // Frontend URL
      credentials: true,   
    })
  );

app.use(express.json());

const authRoutes = require('./Routes/authRoutes');
const mongoose = require('mongoose');

const cookieParser = require('cookie-parser');
app.use(cookieParser());

require('dotenv').config();
const db = process.env.MONGO_URI;

app.get('/', (req, res) => {
  res.json({ message: 'Hello from server!' });
});


mongoose.connect(db)
    .then((result) => {
        app.listen(5000 , ()=>{console.log("Connected to MongoDB and Server is running on port 5000")});

    })
    .catch((err) => {
        console.log(err);
    });




app.use(authRoutes);