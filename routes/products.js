//create routes

const express = require('express');
const router = express.Router();
const EnterDetails = require('../controllers/EnterDetails.js');
router.post('/enterdetails', EnterDetails);
module.exports = router;