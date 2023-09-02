const express = require('express');
const router = express.Router();


const findproducts = require('../controllers/findproducts.js');
const truecaller = require('../controllers/truecaller.js');
const pdf2json = require('../controllers/pdf2json.js');
router.get('/findproducts', findproducts);
router.post('/truecaller', truecaller);
router.post('/pdf2json', pdf2json);

module.exports = router;
