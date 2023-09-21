const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const redis = require('redis');
require('dotenv').config();
const validapirequest = require('./middlewares/validapirequest.js');
const authentication =require('./middlewares/useridmiddleware.js')
const redismiddleware = require('./middlewares/redis.js');
//allow http 
require('http').globalAgent.options.rejectUnauthorized = false
const corsOptions = {
    origin: 'http://localhost:4200',
     origin: 'https://offerme.onrender.com/',
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));



app.use(bodyParser.json());

const port = 3000 ||env.process.PORT;
 require('./Db/db.js');
    
const products = require('./routes/products.js');
const users = require('./routes/user.js');
const search = require('./routes/search.js');



app.use('/products',[authentication,redismiddleware,validapirequest], products);
app.use('/users', users);
app.use('/search', search);

app.listen(port, () => console.log(`Offer me listening on port ${port}!`));
app.get('/', (req, res) => res.send('Hello World!'));
