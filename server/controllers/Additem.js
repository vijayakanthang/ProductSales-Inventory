const Product = require('../Schema/ProductSchema'); // Adjust the path as necessary

async function addItem(req, res) {
  try {
    const { id, title, price, description, category, image, sold, dateOfSale } = req.body;
    const newProduct = new Product({ id, title, price, description, category, image, sold, dateOfSale });
    await newProduct.save();
    res.status(200).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error adding product', error });
  }
}

module.exports = { addItem };
