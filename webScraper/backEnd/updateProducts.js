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

      var obj = '<div class="producto">' + 
      '<img src="' + product.linkImg + '" alt="Producto"> </img>' +
      '<br>' +
      '<span class="precioC">' + product.precio + '</span> ' + 
      '<br>' +
      '<span class="descuento">' + product.precio + '</span>' +
      '<br>' +
      '<span class="nombre">' + product.nombreProducto + '</span>' + 
      '<br>' +
      '<a href="verProducto.html" id="ver"> Ver </a>' +
      '</div>';

      console.log("OBJ: "+obj);

      $("#galeria").append(obj);
    });
  }
  

  iterateProducts(products);
