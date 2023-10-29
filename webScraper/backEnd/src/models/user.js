const {model, Schema} = require('mongoose');

const schema = new Schema({
    name: { type: String, require: true },
    last_name: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true},
    joined_date: { type: Date, require: true},
},{
    versionKey: false
});

module.exports = model('users', schema);