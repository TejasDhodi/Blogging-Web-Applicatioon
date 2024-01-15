const mongoose = require('mongoose');
const {Schema, model} = mongoose;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userRegSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        unique: true,
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    },
}, {timestamps: true});

// Password Hashing
userRegSchema.pre('save', async function (next) {
    const users = this;
    if(!users.isModified('password')){
        next();
    }

    try {
        const saltRound = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(users.password, saltRound);
        const hashConfirmPassword = await bcrypt.hash(users.cpassword, saltRound);
        users.password = hashPassword;
        users.cpassword = hashConfirmPassword;

    } catch (error) {
        next(error)
    }
})

// Json Web Token
userRegSchema.methods.generateToken = async function() {
    try {
        return jwt.sign({
            userId: this._id.toString(),
            email: this.email
        }, 
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: '30d'
        })
    } catch (error) {
        console.log('JWT Error ',error);
    }
}

const user = model('user', userRegSchema);
module.exports = user;