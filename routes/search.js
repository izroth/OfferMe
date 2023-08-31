const express = require('express');
const router = express.Router();


const findproducts = require('../controllers/findproducts.js');

router.get('/findproducts', findproducts);

module.exports = router;
