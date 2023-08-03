const users = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const errors = {
    email: 'Email is required.',
    password: 'Password is required.',
    'Password must be at least 6 characters long.':'Password must be at least 6 characters long.',
    'Tokennotupdated':'Token not updated',
    
};
const Login = async (req, res) => {
    try{
        const email = req.body.email;
        const password = req.body.password;
        const validationErrors = [];
        if (!email) {
            validationErrors.push(errors.email);
        }
        if (!password) {
            validationErrors.push(errors.password);
        }
        if (password.length < 6) {
            validationErrors.push('Password must be at least 6 characters long.');
        }
        if (validationErrors.length > 0) {
            return res.status(400).json({ errors: validationErrors });
        }
        // Check if user exists
        const finduser = await users.findOne({ email: email });
        if (!finduser) {
            return res.status(400).json({ message: 'User does not exist.' });
        }
        // Check if password is correct
        const isMatch = await bcrypt.compare(password, finduser.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }
        // Create token
        const token = jwt.sign({ id: finduser._id }, process.env.JWT_SECRET);
        //find user by id and update token
        const updatetoken = users.findByIdAndUpdate(finduser._id, { token: token });
        if(!updatetoken){
            throw new Error('Tokennotupdated.');
        }

        res.status(200).json({ message: 'success', token: token, data: finduser });
         

    }
    catch(err){ 
        console.log(err);
        res.status(500).json({message:err[errors] || 'An error occured.'});
    }
}
module.exports = Login;