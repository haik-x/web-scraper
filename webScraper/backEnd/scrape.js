const request = require('request');
const cheerio = require('cheerio');
const fs = require("fs");

const file = fs.readFileSync('products.json')
var myObject = JSON.parse(file); 
const { writeFileSync } = require('fs');

const link = 'https://www.mercadolibre.com.mx/xiaomi-pocophone-poco-m5s-dual-sim-256-gb-gris-8-gb-ram/p/MLM23428712?pdp_filters=deal%3AMLM779363-1#polycard_client=homes-korribanSearchPromotions&searchVariation=MLM23428712&position=1&search_layout=grid&type=product&tracking_id=1c310ba7-c260-465a-a5ac-d79e49688214';
var previousPrice = 0;
var productDescount = 0;

const loadProducts = request(link, (error, 
response, html) => {
    if(!error && response.statusCode == 200) {


        const $ = cheerio.load(html);

        const productName = $('.ui-pdp-title').text();
        console.log(productName);

        const productPrice = $('[itemprop="price"]').attr('content');
        console.log(productPrice);

        const productImg = $('img.ui-pdp-image.ui-pdp-gallery__figure__image').attr('src');
        console.log(productImg);

        if (previousPrice === 0){
          previousPrice = productPrice;
        }else if (previousPrice >= productPrice){
          productDescount = 0;
        }else{
          productDescount = productPrice - previousPrice
        }
        
        
        

        // Add new Product to Json
        const infoProducts = {precio : productPrice, 
                              descuento : productDescount,
                              precioAnterior : previousPrice,
                              nombreProducto : productName, 
                              linkProducto : link,
                              linkImg : productImg

                            }

        /* console.log(JSON.stringify(infoProducts));
        
        console.log("JSON ORIGINAL");
        console.log(JSON.stringify(myObject));
         */
        console.log("JSON NEW");
        myObject.push(infoProducts);
        console.log(JSON.stringify(myObject));

        try {
            writeFileSync('./products.json', JSON.stringify(myObject), 'utf8');
            console.log('Data successfully saved to disk'); 
          } catch (error) {
            console.log('An error has occurred ', error);
          }
        
    }


}) 


module.exports = loadProducts;



