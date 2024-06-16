
const Product =require("../Schema/ProductSchema");

async function getProduct(req,res){
    const product = await Product.find();
    res.json(product);
}


module.exports ={getProduct};