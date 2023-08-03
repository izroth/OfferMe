//create a new express app
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
require('./middlewares/useridmiddleware.js')
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

//use the routes

app.use('/products', products);
app.use('/users', users);


//if server is running, print this message
app.listen(port, () => console.log(`Offer me listening on port ${port}!`));
app.get('/', (req, res) => res.send('Hello World!'));