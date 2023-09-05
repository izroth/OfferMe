//create a new express app
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const redis = require('redis');
require('dotenv').config();
const authentication =require('./middlewares/useridmiddleware.js')
const redismiddleware = require('./middlewares/redis.js');
//create a middleware for cors
const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));



app.use(bodyParser.json());

const port = 3000;
 require('./Db/db.js');
const products = require('./routes/products.js');
const users = require('./routes/user.js');
const search = require('./routes/search.js');

//use the routes

app.use('/products',[authentication,redismiddleware], products);
app.use('/users', users);
app.use('/search', search);


//if server is running, print this message
app.listen(port, () => console.log(`Offer me listening on port ${port}!`));
app.get('/', (req, res) => res.send('Hello World!'));