const request = require('request');
const cheerio = require('cheerio');
const fs = require("fs");

//const {loadProducts} = require('./scrape.js');

const file = fs.readFileSync('products.json')
var products = JSON.parse(file); 





function iterateProducts(products) {
    products.forEach(product => {

      //loadProducts.request(product.link);
      // Access individual properties of each product
      console.log("Product ID:", product.id || "N/A");
      console.log("Product Link:", product.link || "N/A");
      console.log("Product Name:", product.nombreProducto || "N/A");
      console.log("Product Price:", product.precio || "N/A");
      console.log("Product Image Link:", product.linkImg || "N/A");
      console.log("------------------------");
    });
  }
  

  iterateProducts(products);
