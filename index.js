//create a new express app
const express = require('express');
const app = express();
const port = 3000;
 require('./Db/db.js');
const products = require('./routes/products.js');
//use the routes
app.use('/products', products);

//if server is running, print this message
app.listen(port, () => console.log(`Offer me listening on port ${port}!`));