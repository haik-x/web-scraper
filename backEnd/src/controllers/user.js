const path = require('path');

const {
    response
} = require('express');

const jwt = require('jsonwebtoken');
const model = require('../models/user');
const user = require('../models/user');
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
            errors.email = 'Correo o contraseña incorrectos';
        } else if (err.code === 11000) {
            errors.email = 'Este correo ya está en uso';
        } else {
            // Handle other types of errors with a generic message
            errors.email = 'Occurió un error. Por favor inténtelo de nuevo';
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


    logout = async (req, res) => {
 
        res.cookie("jwt", '');
        res.redirect('/');
    }


    fetchUserInfo = async (req, res) => {
        try {
            const user = res.locals.user;

            if (user) {
                res.json(user);
            } else {
                res.status(401).json({
                    message: 'Unauthorized'
                });
            }
        } catch (error) {
            console.error('Error fetching user information:', error);
            res.status(500).json({
                message: 'Internal Server Error'
            });
        }
    };


    getUsers = async (req, res) => {
        // Get current 
        const userId = res.locals.user; // Assuming you set req.user in your auth middleware
        const userObject = await model.find({'email': userId.email});
        const userDoc = userObject[0]._doc;
        const newUser = {
            ...userDoc
        }

        const allPeople = [];
        const users = await model.find();

        for (const user of users ) {
            if (newUser.friends.includes(user.email)) {
                continue;
            }
            if (user.email === userId.email) {
                continue;
            }
            const person = {
                id : user.id,
                name: user.name,
                email: user.email,
              }
              allPeople.push(person);
        }
        res.send(allPeople);
    };

    view(req, res) {
        res.send([]);
    }


    updateProfile = async (req, res) => {
        try {

            const { name, username, email, biography, birth, country, phone, webpage, twitter, tiktok, instagram} = req.body;

            // Construct the update object based on what fields are present
            const updateObject = {};
            if (name) updateObject.name = name;
            if (username) updateObject.username = username;
            if (email) updateObject.email = email;
            if (biography) updateObject.biography = biography;
            if (birth) updateObject.birth = birth;
            if (country) updateObject.country = country;
            if (phone) updateObject.phone = phone;
            if (webpage) updateObject.webpage = webpage;
            if (twitter) updateObject.twitter = twitter;
            if (tiktok) updateObject.tiktok = tiktok;
            if (instagram) updateObject.instagram = instagram;
            if (req.file) {
                // Save the image to your server or cloud storage
                const imagePath = '/uploads/' + req.file.filename; // Adjust this based on your storage setup
                updateObject.profileImage = imagePath;
            }

            // Update user information
            const userId = res.locals.user; 
            const updatedUser = await model.findByIdAndUpdate(userId, updateObject, { new: true });

            res.status(200).json({ user: updatedUser });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    
    addFriend = async (req, res) => {
        try {
            const { friendEmail } = req.body;
            // Update user information
            const userId = res.locals.user; // Assuming you set req.user in your auth middleware
            const userObject = await model.find({'email': userId.email});
            const userDoc = userObject[0]._doc;
            const newUser = {
                ...userDoc
            }
            newUser.friends.push(friendEmail);
            const updatedUser = await model.findByIdAndUpdate(userObject[0]._id, newUser, { new: true });
            res.status(200).json({ user: updatedUser });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}



module.exports = new UserController();