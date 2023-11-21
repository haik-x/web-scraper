const { v4: uuidv4 } = require('uuid');
const request = require("request");
const cheerio = require("cheerio");

function doRequest(link, previousPrice, productDescount, uuid) {
  return new Promise(function (resolve, reject) {
    request(link, (error, response, html) => {
      if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);

        const productName = $(".ui-pdp-title").text();
        console.log(productName);

        const productPrice = $('[itemprop="price"]').attr("content");
        console.log(productPrice);

        const productImg = $(
          "img.ui-pdp-image.ui-pdp-gallery__figure__image"
        ).attr("src");
        console.log(productImg);
        
        let uuidToUse = uuid;
        if (!uuid){
          uuidToUse = uuidv4();
        }

        // Add new Product to Json
        const infoProducts = {
          precio : productPrice, 
          descuento : productDescount,
          precioAnterior : previousPrice,
          nombreProducto : productName, 
          link : link,
          linkImg : productImg,
          id :uuidToUse

        }
        return resolve(infoProducts);
      }
    });
  });
}

module.exports = {doRequest};