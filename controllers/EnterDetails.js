// const users = require('../models/users');
const users = require('../models/user.js');
const errors ={
    product_name: 'Product name is required.',
}
const axios = require('axios');
const EnterDetails = async (req, res) => {
    try{
        const userid = req.userId;
        console.log(userid);
       //finduser id
       const finduser = await users.findOne({ _id: userid });
         if (!finduser) {
                return res.status(400).json({ message: 'User does not exist.' });
            }



        const {product_name,page,min_price,max_price} = req.body;
        
        
        if(!product_name){
            throw errors.product_name;
        }
        const data_response = await axios.get('https://real-time-product-search.p.rapidapi.com/search', {
            params: {
                q: product_name,
                country: 'IN',
                // page: page || 1,
                // min_price: min_price,
                // max_price: max_price,
                language: 'en'
            }
            ,
                headers: {
                    'x-rapidapi-key': process.env.API_KEY,
                    'x-rapidapi-host': 'real-time-product-search.p.rapidapi.com'

            }
        })
        if(!data_response){
            throw data_response.data.message;
        }
        console.log(data_response.data)

               
        res.status(200).json({message:'success',data:data_response.data});



    }
    catch(err){
        console.log(err);
        res.status(400).json({message:err[errors] || 'An error occured.'});
    }

}
module.exports = EnterDetails;