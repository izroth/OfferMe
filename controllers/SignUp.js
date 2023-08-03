const users = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const errors ={
    email: 'Email is required.',
    password: 'Password is required.',


}

const SignUp = async (req, res) => {
    try{

        const {email,password} = req.body;
        if(!email ){
            throw errors.email;
        }
        if(!password){
            throw errors.password;
        }
        if(password.length < 6){
            throw 'Password must be atleast 6 characters long.';
        }
        //check if user exists
        const finduser = users.findOne({email:email});
        if(finduser){
            throw 'User already exists.';
        }
        if(!finduser){
        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(password,salt);
        //create new user
        const newuser = new users({
            email:email,
            password:hashpassword
        })
        //save user
        const saveduser = await newuser.save();
        //create token
        const token = jwt.sign({id:saveduser._id},process.env.JWT_SECRET);
        res.status(200).json({message:'success',token:token});

        }


        
        

    }
    catch(err){
        console.log(err);
        res.status(400).json({message:err[errors] || 'An error occured.'});
    }
}
module.exports = SignUp;