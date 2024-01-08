const express = require('express');
const cors = require('cors');
const userroutes = require('./routes/userroutes.js');
require('dotenv').config();
const mongoose = require('mongoose');
const app = express();
app.use(cors());
app.use(express.json());


app.use('/api/auth', userroutes)

mongoose.connect(process.env.MONGO_URL)
.then(() =>{
    console.log('DB connection successfull')
})
.catch((err) =>{
    console.log('Error connecting', err.message)
})

app.listen(process.env.PORT, () =>{
    console.log('port is running')
})