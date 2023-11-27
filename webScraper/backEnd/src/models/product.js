const {model, Schema} = require('mongoose');

const schema = new Schema({
    name: { type: String, require: true },
    price: { type: Number, require: true },
    discount: { type: Number, require: true },
    original_price: { type: Number, require: true},
    link: { type: String, require: true, unique: true},
    image: { type: String, require: true},
    email: {
        type: String,
        require: true
    }
},{
    versionKey: false
});

module.exports = model('products', schema);