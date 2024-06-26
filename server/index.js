
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const {connecttoDB} = require('./db');
const {getProduct}= require('./controllers/ProductSales');
const { seedProducts } = require('./controllers/seed');
const{addItem} = require('./controllers/Additem');
const {getStats} = require ('./controllers/Statistics')


const app = express();
app.use(cors());
app.use(express.json());

connecttoDB();

app.get('/products',getProduct);
app.get('/stats',getStats)
app.post('/',addItem);
app.post('/seed',seedProducts);


app.listen(5001,()=>{
    console.log('server is running on port 5000');
})
