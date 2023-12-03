const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const path = require('path');

const mongoose = require('mongoose');

const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

const {
    authMiddleware,
    checkUser
} = require('./src/middlewares/auth');

const routes = require('./routes');

const app = express();

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

const port = process.env.PORT || 3000;


app.get('/products', authMiddleware, (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/views/producto.html'));
});

app.get('/views/settings.html', authMiddleware, (req, res) => {
    res.sendFile(path.join(__dirname, '../views/settings.html'));
});

// Resto de las rutas
app.use(express.static(path.join(__dirname, '../frontend')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/views/index.html'));
});

app.use(routes);


const mongoUrl = process.env.MONGO_URL;

mongoose.connect(mongoUrl).then(() => {
    app.listen(port, () => {
        console.log('app is running...');
    });
}).catch(err => {
    console.log('Could not connect', err);
});
