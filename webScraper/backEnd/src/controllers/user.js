const { response } = require('express');
const model = require('../models/user');

class UserController{

    create(req, res){
      
        const { name, last_name, email, password, joined_date} = req.body;
        
        res.send([]);

    }

    view(req, res){
        res.send([]);
    }

    delete(req, res){
        res.send([]);
    }

    edit(req, res){
        
        const { name, last_name, email, password, joined_date} = req.body;
        
        res.send([]);

    }
}

module.exports = new UserController();