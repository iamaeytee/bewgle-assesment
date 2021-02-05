const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = express();

app.use(express.json());

//Import route
const stats = require('./route');


dotenv.config();

//Connect to mongoose
mongoose.connect(
    process.env.DB_CONNECT,
    {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(()=> console.log('DB connection established'))
    .catch(err => console.log('DB connection failed: ', err));

app.use('/', stats);

app.listen(3000, () => {
    console.log('Server started')
})