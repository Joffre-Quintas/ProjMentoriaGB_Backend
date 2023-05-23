const mongoose = require('mongoose');
require('dotenv').config()

const user = process.env.DB_USER
const password = process.env.DB_PASSWORD


function startDB() {
    try {
        mongoose.connect(`mongodb+srv://${user}:${password}@joffre.ckgez7n.mongodb.net/`)
            .then(() => {
                console.log('Banco conectado!')
            })
            .catch(err => console.log(err))
    } catch (error) {
        console.log(error)
    }
}

module.exports = startDB;