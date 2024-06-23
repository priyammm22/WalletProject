const mongoose = require('mongoose')


mongoose.connect("mongodb+srv://priyammm_22:f8WB6d3sbsWINNbk@cluster0.wv7sk0g.mongodb.net/paytm");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true, // trim whitespacess from inputs
        lowercase: true, // convert input to lower case,
        minLength: 3,
        maxLenght: 30

    },
    password: {
        type: String,
        required: true,
        minLength: 6

    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: false,
        trim: true,
        maxLength: 50
    }
});
const User = mongoose.model('User', userSchema);

const Accounts = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User,
        required:true
    },
    balance:{
        type:Number,
        required:true
    }
});


const Account = mongoose.model('Account',Accounts);
module.exports = {
    User,
    Account
};