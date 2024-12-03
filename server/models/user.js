const mongoose = require('mongoose')
const {Schema} = mongoose;
const ROLES = {
    Admin: 'Admin',
    User: 'User', 
}
const userScheme= new Schema({
    firstname: String,
    lastname: String,
    email: {
        type: String,
        unique: true,
    },
    password: String,
    confpassword: String,
    role: {type: String, default: 'User'},
})

const userModel = mongoose.model('User', userScheme);

module.exports = userModel;