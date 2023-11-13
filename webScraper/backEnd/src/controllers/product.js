const { response } = require('express');
const model = require('../models/product');

class ProductController{

    list(req, res){
        res.send([]);
    }

    create(req, res){
        
        const { name, price, discount, original_price, link, image} = req.body;
        console.log("POS");
        res.send([]);
    }

    view(req, res){
        console.log("GET");
        res.send([]);
    }

    delete(req, res){
        res.send([]);
    }

    edit(req, res){
        const { name, price, discount, before, link, image} = req.body;

        res.send([]);
    }
}

module.exports = new ProductController();