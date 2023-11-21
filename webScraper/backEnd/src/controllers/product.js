const { response } = require('express');
const model = require('../models/product');
const scraper = require("../../scrape.js");
const fs = require("fs");


class ProductController{

    list(req, res){
        const file = fs.readFileSync("web-scraper/webScraper/backEnd/products.json");
        var products = JSON.parse(file);
        res.send(products);
    }

    async create(req, res){
        
        const {link} = req.body;
        const file = fs.readFileSync("web-scraper/webScraper/backEnd/products.json");
        var products = JSON.parse(file);
        const newProduct = await scraper.doRequest(link, 0,0);
        products.push(newProduct);
        try {
            fs.writeFileSync("web-scraper/webScraper/backEnd/products.json", JSON.stringify(products), "utf8");
            console.log("Data successfully saved to disk");
        } catch (error) {
            console.log("An error has occurred ", error);
        }
        res.send([]);
    }

    view(req, res){
        console.log("GET");
        res.send([]);
    }

    delete(req, res){
        const requestUrl = req.url;
        const idToDelete = requestUrl.replace("/product/", "")
        const file = fs.readFileSync("web-scraper/webScraper/backEnd/products.json");
        var products = JSON.parse(file);
        const newProducts = [];
        for (const product of products) {
            if (product.id === idToDelete) {
                continue;
            }
            newProducts.push(product);
        }
        try {
            fs.writeFileSync("web-scraper/webScraper/backEnd/products.json", JSON.stringify(newProducts), "utf8");
            console.log("Data successfully saved to disk");
        } catch (error) {
            console.log("An error has occurred ", error);
        }
        res.send([]);
    }

    edit(req, res){
        const { name, price, discount, before, link, image} = req.body;

        res.send([]);
    }
}

module.exports = new ProductController();