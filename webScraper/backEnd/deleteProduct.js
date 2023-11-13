const request = require('request');
const cheerio = require('cheerio');
const fs = require("fs");


const file = fs.readFileSync('products.json')
var products = JSON.parse(file); 

const nombre = 'Xiaomi Pocophone Poco M5s Dual Sim 256 Gb Gris 8 Gb Ram';


var index = 0;

function iterateProducts(products, nombre) {

    console.log("Before delete");
    console.log(JSON.stringify(products));

    products.forEach(product => {
       // console.log("link in JSON: "+product.nombreProducto);
       // console.log("LINK  :" + nombre);
       
        
        if (product.nombreProducto === nombre){
            products.splice(index, index+1);
            /* delete product.nombreProducto;
            delete product.precio;
            delete product.linkImg;

            console.log("Product ID:", product.id || "N/A");
            console.log("Product Link:", product.link || "N/A");
            console.log("Product Name:", product.nombreProducto || "N/A");
            console.log("Product Price:", product.precio || "N/A");
            console.log("Product Image Link:", product.linkImg || "N/A");
            console.log("------------------------");  */
        }

        index++;
    });
    console.log("After delete");
    console.log(JSON.stringify(products));
  }
  

  iterateProducts(products, nombre);
  