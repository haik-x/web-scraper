const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');

const mongoose = require('mongoose');

const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT || 3000; 

app.use(routes);

app.use(express.static(path.join(__dirname, '../frontend')));

// Define a route to serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/views/index.html'));
});

// Define a route to serve index.html
app.get('/products', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/views/producto.html'));
});

///////////
app.listen(port, () => {
    console.log('app is running...');
});
//////////


const mongoUrl = process.env.MONGO_URL;
/* 
mongoose.connect(mongoUrl).then(() => {
    app.listen(port, () => {
        console.log('app is running...');
    });
}).catch(err => {
    console.log('Could not connect', err);
}); */