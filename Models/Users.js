const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    UserName: {
        type:String,
        required: true,
        uniqur:true
    },
    Email: {
        type: String,
        required: true,
        uniqur:true
    },
    Password: {
        type: String,
        required: true
    }
});

module.exports = User = mongoose.model('User', UserSchema);