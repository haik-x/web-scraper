const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');

const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());

const mongoUrl = 'mongodb+srv://temp_user:12345@cluster0.lubpf6e.mongodb.net/web_scraper?retryWrites=true&w=majority';



app.get('', (req, res) => {
    res.send('aqui estoy');
 });

app.use(routes);

mongoose.connect(mongoUrl).then(() => {
    app.listen(3000, () => {
        console.log('app is running...');
    });
}).catch(err => {
    console.log('Could not connect', err);
});