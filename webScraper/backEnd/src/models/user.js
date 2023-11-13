const {
    model,
    Schema
} = require('mongoose');
const {
    isEmail
} = require('validator')
const bcrypt = require('bcrypt')

const schema = new Schema({
    name: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: false
    },
    last_name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
        validate: [isEmail, "Please enter a valid email"]
    },
    password: {
        type: String,
        require: true
    },
    joined_date: {
        type: Date,
        require: false
    },
    profile_picture: {
        type: Buffer,
        require: false
    },
    biography: {
        type: String,
        require: false
    },
    birth: {
        type: String,
        require: false
    },
    country: {
        type: String,
        require: false
    },
    phone: {
        type: String,
        require: false
    },
    web_page: {
        type: String,
        require: false
    }
}, {
    versionKey: false
});

schema.pre('save', async function (next) {
    //Hashing the password
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt);
    next()
})

schema.statics.login = async function (email, password) {
    const user = await this.findOne({
        email
    })
    if (user) {
        const auth = await bcrypt.compare(password, user.password)
        if (auth)
            return user;
        throw Error("incorrect password");
    }
    throw Error("incorrect email");
}

module.exports = model('users', schema);