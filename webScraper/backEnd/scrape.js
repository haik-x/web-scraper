const request = require('request');
const cheerio = require('cheerio');

request('https://www.mercadolibre.com.mx/roku-express-3960-estandar-full-hd-negro/p/MLM21087858#reco_item_pos=0&reco_backend=univb-pdp-buybox&reco_backend_type=low_level&reco_client=pdp-v2p&reco_id=931bf8e9-29ad-421b-9cf0-6265429005ac&reco_backend_model=univb', (error, 
response, html) => {
    if(!error && response.statusCode == 200) {
        const $ = cheerio.load(html);

        const productName = $('.ui-pdp-title');
        console.log(productName.text());

        const productPrice = $('[itemprop="price"]').attr('content');
        console.log(productPrice);

        const productImg = $('img.ui-pdp-image.ui-pdp-gallery__figure__image').attr('src');
        console.log(productImg);
    }
}) 