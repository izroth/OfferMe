const express = require('express');
const router = express.Router();
const SignUp = require('../controllers/SignUp.js');
const Login = require('../controllers/Login.js');
router.post('/signup', SignUp);
router.post('/login', Login);
module.exports = router;