const {model, Schema} = require('mongoose');
const {isEmail} = require('validator')

const schema = new Schema({
    name: { type: String, require: true },
    username: {type: String, require: false},
    last_name: { type: String, require: true },
    email: { type: String, require: true, unique: true, validate: [isEmail, "Please enter a valid email"]},
    password: { type: String, require: true },
    joined_date: { type: Date, require: false },
    profile_picture: {type: Buffer, require: false },
    biography: {type: String, require: false },
    birth: {type: String, require: false },
    country: {type: String, require: false },
    phone: {type: String, require: false },
    web_page: {type: String, require: false }
},{
    versionKey: false
});

schema.statics.login = async function(email, password){
    const user = await this.findOne({email})
    if(user){
        if(user.password === password)
            return user;
        throw Error("incorrect password");
    }
    throw Error("incorrect email");
}

module.exports = model('users', schema);