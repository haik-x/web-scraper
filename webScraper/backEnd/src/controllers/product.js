const { response } = require('express');
const model = require('../models/product');
const scraper = require("../../scrape.js");
const fs = require("fs");


class ProductController{

    list(req, res){
        const file = fs.readFileSync("web-scraper/webScraper/backEnd/products.json");
        var products = JSON.parse(file);
        console.log("IM ON LIST");
        res.send(products);
    }

    create(req, res){
        
        const {link} = req.body;
        scraper.scrapeProduct(link, 0,0);
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