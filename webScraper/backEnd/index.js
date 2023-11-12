const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const mongoose = require('mongoose');

const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

const routes = require('./routes');

const app = express();

const corsOptions = {
    origin: 'http://127.0.0.1:8080', // Replace with the actual origin of your frontend
    credentials: true,
    // Add other CORS options as needed
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT || 3000; //fallback, es como un or
const secret = process.env.SECRET_KEY;

app.use(routes);

app.get('/', (req, res) => {
    res.send('aqui estoy');
 });

const mongoUrl = process.env.MONGO_URL;

mongoose.connect(mongoUrl).then(() => {
    app.listen(port, () => {
        console.log('app is running...');
    });
}).catch(err => {
    console.log('Could not connect', err);
}); 