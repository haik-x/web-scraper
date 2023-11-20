const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");


const scraper = require("./scrape.js");

fd = fs.openSync("products.json")
const file = fs.readFileSync(fd);
var products = JSON.parse(file);
fs.closeSync(fd);

fs.truncateSync("products.json");

const link = "https://www.mercadolibre.com.mx/xiaomi-pocophone-poco-m5s-dual-sim-256-gb-gris-8-gb-ram/p/MLM23428712?pdp_filters=deal%3AMLM779363-1#polycard_client=homes-korribanSearchPromotions&searchVariation=MLM23428712&position=1&search_layout=grid&type=product&tracking_id=1c310ba7-c260-465a-a5ac-d79e49688214";

function iterateProducts(products) {

  products.forEach((product) => {
    scraper.scrapeProduct(product.link, product.previousPrice, product.productDescount);

    // Access individual properties of each product
    console.log("Product ID:", product.id || "N/A");
    console.log("Product Prev Price:", product.previousPrice || "N/A");
    console.log("Product Descount:", product.productDescount || "N/A");

    console.log("Product Link:", product.link || "N/A");
    console.log("Product Name:", product.nombreProducto || "N/A");
    console.log("Product Price:", product.precio || "N/A");
    console.log("Product Image Link:", product.linkImg || "N/A");
    console.log("------------------------");
  });
}

iterateProducts(products);