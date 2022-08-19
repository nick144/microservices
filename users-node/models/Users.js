const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    email: {
        type: String, 
        lowercase: true, 
        required: [true, "User must have email"], 
        match: [/\S+@\S+\.\S+/, 'is invalid'], 
        index: true,
        unique: true
    },
    username: {
        type: String, 
        lowercase: true, 
        required: [true, "User must have a username"], 
        match: [/^[a-zA-Z0-9]+$/, 'is invalid'], 
        index: true,
        unique: true
    },
    password: {
        type: String,
        require: [true, 'User must have a password'],
    },
    phone: {
        type: Number,
    },
}, {timestamps: true});


const Users = mongoose.model("Users", UsersSchema);

module.exports = Users;