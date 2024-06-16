
require('dotenv').config();
const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI;
const apiurl = process.env.API_URL

async function connecttoDB(){
    try {
        await mongoose.connect(mongoURI)
        console.log('Connected to DB')
        
    } catch (error) {
        console.error('Error connecting', error);
    }
}

module.exports = {connecttoDB};