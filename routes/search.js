const express = require('express');
const router = express.Router();


const findproducts = require('../controllers/findproducts.js');

router.post('/findproducts', findproducts);

module.exports = router;
