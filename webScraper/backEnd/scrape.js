
const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");

var myObject = []; // JSON.parse(file);
const { writeFileSync } = require("fs");


module.exports = {
  scrapeProduct: function (link,previousPrice,productDescount ) {
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

        // Add new Product to Json
        const infoProducts = {
          precio : productPrice, 
          descuento : productDescount,
          precioAnterior : previousPrice,
          nombreProducto : productName, 
          link : link,
          linkImg : productImg

        }

        console.log("JSON NEW");
        myObject.push(infoProducts);
        console.log(JSON.stringify(myObject));

        try {
          writeFileSync("./products.json", JSON.stringify(myObject), "utf8");
          console.log("Data successfully saved to disk");
        } catch (error) {
          console.log("An error has occurred ", error);
        }
      }
    });
  },
};