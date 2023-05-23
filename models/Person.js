const mongoose = require('mongoose');
const uuid = require('uuid');

const PersonModel = new mongoose.Schema({
    uuid: {type:String, default: uuid.v4, unique: true},
    name: String,
    lastName: String,
    birthday: Date
})

const person = mongoose.model('person', PersonModel);
module.exports = person;