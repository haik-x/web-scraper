const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');

const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000; //fallback, es como un or
const secret = process.env.SECRET_KEY;

app.use(routes);

app.get('/', (req, res) => {
    res.send('aqui estoy');
 });


 // Agregue el app listener para poder ver desde qué puerto
 app.listen(port, () => {
    console.log(`escuchando es puerto: ${port}`);
 })


const mongoUrl = process.env.MONGO_URL;

mongoose.connect(mongoUrl).then(() => {
    app.listen(port, () => {
        console.log('app is running...');
    });
}).catch(err => {
    console.log('Could not connect', err);
}); 