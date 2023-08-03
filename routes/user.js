const express = require('express');
const router = express.Router();
const SignUp = require('../controllers/SignUp.js');
router.post('/signup', SignUp);
module.exports = router;