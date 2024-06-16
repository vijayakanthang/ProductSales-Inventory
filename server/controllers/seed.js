require('dotenv').config();
const axios = require('axios');
const Product = require('../Schema/ProductSchema'); // Adjust the path as necessary

const apiURL = process.env.API_URL;

const seedProducts = async (req, res) => {
    try {
        const apiURL = process.env.API_URL;
        const response = await axios.get(apiURL);
        const products = response.data;

        await Product.insertMany(products);
        res.status(201).json({ message: 'Data seeded successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error seeding data', error });
    }
};


module.exports = {seedProducts };