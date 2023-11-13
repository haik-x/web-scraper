const {
    response
} = require('express');

const jwt = require('jsonwebtoken');
const model = require('../models/user');
const secret = process.env.SECRET_KEY;

class UserController {

    createToken(id) {
        return jwt.sign({
            id
        }, secret);
    }

    handleErrors(err) {
        console.log('Handling errors...');
        console.log(err.message, err.code);

        let errors = {
            email: ''
        };

        if (err.message === "incorrect password") {
            errors.email = 'Invalid email or password';
        } else if (err.code === 11000) {
            errors.email = 'This email is already in use';
        } else {
            // Handle other types of errors with a generic message
            errors.email = 'An error occurred. Please try again.';
        }

        return errors;
    }

    create = async (req, res) => {
        const {
            name,
            last_name,
            email,
            password
        } = req.body;
        try {
            const user = await model.create({
                name,
                last_name,
                email,
                password
            });
            res.status(201).json(user);
        } catch (err) {
            console.error(err);
            const errors = this.handleErrors(err);
            res.status(400).json({
                errors
            });
        }
    }

    login = async (req, res) => {
        const {
            email,
            password
        } = req.body;
        try {
            const user = await model.login(email, password);

            const token = this.createToken(user._id);

            res.cookie('jwt', token, {
                httpOnly: true
            });
            console.log(res.getHeaders());
            res.status(201).json({
                user: user._id
            });
        } catch (err) {
            const errors = this.handleErrors(err);
            res.status(400).json({
                errors
            });
        }
    }


    view(req, res) {
        res.send([]);
    }

    delete(req, res) {
        res.send([]);
    }

    edit(req, res) {

        const {
            name,
            last_name,
            email,
            password,
            joined_date
        } = req.body;

        res.send([]);

    }
}

module.exports = new UserController();