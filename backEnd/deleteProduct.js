const request = require('request');
const cheerio = require('cheerio');
const fs = require("fs");


const file = fs.readFileSync('products.json')
var products = JSON.parse(file); 

const nombre = 'Xiaomi Pocophone Poco M5s Dual Sim 256 Gb Gris 8 Gb Ram';
const quitarProducto = $(".quitarProducto");

var index = 0;

function iterateProducts(products, nombre) {

    //remove fron front


    //remove on json
    console.log("Before delete");
    console.log(JSON.stringify(products));

    products.forEach(product => {       
        if (product.nombreProducto === nombre){
            products.splice(index, index+1);
        }

        index++;
    });
    console.log("After delete");
    console.log(JSON.stringify(products));
  }
  

  iterateProducts(products, nombre);


  // event to delete item


  