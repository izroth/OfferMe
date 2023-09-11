const users = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const errors = {
    email: 'Email is required.',
    password: 'Password is required.',
};

const SignUp = async (req, res) => {
    
    
    try {
        const { email, password } = req.body;
        const validationErrors = [];

        console.log(email, password);

        if (email.legth < 0) {
            validationErrors.push(errors.email);
        }
        if (!password.legth < 0) {
            validationErrors.push(errors.password);
        }
      

        // Check if user exists
        const finduser = await users.findOne({ email: email });
        console.log(finduser)

        if (finduser) {
            return res.status(400).json({ message: 'User already exists.' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(password, salt);

        // Create new user
        const newuser = new users({
            email: email,
            password: hashpassword,
        });

        // Save user
        const saveduser = await newuser.save();

        // Create token
        const token = jwt.sign({ id: saveduser._id }, process.env.JWT_SECRET);
        //find user by id and update token
        await users.findByIdAndUpdate(saveduser._id, { token: token });

        res.status(200).json({ message: 'success', token: token, data: saveduser });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'An error occurred.' });
    }
};

module.exports = SignUp;
