const express = require('express');
const router = express.Router();


const findproducts = require('../controllers/findproducts.js');
const truecaller = require('../controllers/truecaller.js');

router.get('/findproducts', findproducts);
router.post('/truecaller', truecaller);

module.exports = router;
