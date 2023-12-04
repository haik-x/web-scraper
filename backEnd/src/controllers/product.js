const { response } = require('express');
const axios = require('axios');
const model = require('../models/product');
const modelUser = require('../models/user');
const scraper = require("../../scrape.js");
const ObjectId = require('mongodb').ObjectId;

class ProductController{

    async list(req, res) {
        const allProducts = [];
        const respModels = await model.find({email: req.user.email});
        for (const resModel of respModels ) {
            const product = {
                precio : resModel.price, 
                descuento : resModel.discount,
                precioAnterior : resModel.original_price,
                nombreProducto : resModel.name, 
                link : resModel.link,
                linkImg : resModel.image,
                id : resModel.id
      
              }
              allProducts.push(product);
        }
        // Agrega amigos si especificado
        if ( req.query.includeFriend ) {
            const userId = res.locals.user; // Assuming you set req.user in your auth middleware
            const userObject = await modelUser.find({'email': userId.email});
            const userDoc = userObject[0]._doc;
            const newUser = {
                ...userDoc
            }
            for (const friend of newUser.friends) {
                const respModels = await model.find({email: friend});
                for (const resModel of respModels ) {
                    const product = {
                        precio : resModel.price, 
                        descuento : resModel.discount,
                        precioAnterior : resModel.original_price,
                        nombreProducto : resModel.name, 
                        link : resModel.link,
                        linkImg : resModel.image,
                        id : resModel.id,
                        email : friend,
                    }
                    allProducts.push(product);
                }
            }
        }
        res.send(allProducts);
    }

    async create(req, res){
        
        const { link } = req.body;
        const { user } = req.user;

        const secondApiUrl = 'http://localhost:4000/api/product';

        try {
            const response = await axios.post(secondApiUrl, {
                link,
                user: {
                    ...user,
                    email: req.user?.email || 'default@example.com',
                }
            });

            console.log('Second API Response:', response.data);

            res.status(201).send({ message: 'Product created successfully' });
        } catch (error) {
            console.error('Error creating product:', error);
            res.status(500).send({ error: 'Internal Server Error' });
        }
    }

    view(req, res){
        console.log("GET");
        res.send([]);
    }

    async delete(req, res){
        const requestUrl = req.url;
        const idToDelete = requestUrl.replace("/product/", "")
        const respModels = await model.deleteOne({"_id": new ObjectId(idToDelete)});
        res.send([]);
    }

    async edit(req, res){
        
        const requestUrl = req.url;
        const idToUpdate = requestUrl.replace("/product/", "")

        const respModels = await model.find({"_id": new ObjectId(idToUpdate)});
        const firstModel = respModels[0];
        const productToUpdate = await scraper.doRequest(firstModel.link, firstModel.price, firstModel.original_price, firstModel.discount);

        const respUpdate = await model.updateOne({"_id": new ObjectId(idToUpdate)}, 
        {name: productToUpdate.name,
            price: Number(productToUpdate.price) ,
            discount: productToUpdate.discount,
            original_price: productToUpdate.original_price,
            link: productToUpdate.link,
            image: productToUpdate.linkImg,
        });

        res.send([]);
    }
}

module.exports = new ProductController();