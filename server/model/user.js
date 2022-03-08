const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true,
        unique:true
    },
    gender: String,
    status: String
});

const User = mongoose.model('User', usersSchema);

module.exports = User