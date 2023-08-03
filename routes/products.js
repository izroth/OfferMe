//create routes

const express = require('express');
const router = express.Router();
const EnterDetails = require('../controllers/EnterDetails.js');
const GetDetails = require('../controllers/GetDetail.js');
const convertdataintoexcel = require('../controllers/convertdataintoexcel.js');

router.get('/getdetails', GetDetails);
router.post('/enterdetails', EnterDetails);
router.post('/convertdataintoexcel', convertdataintoexcel);
module.exports = router;