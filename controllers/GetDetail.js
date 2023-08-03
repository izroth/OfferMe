const users = require('../models/user.js');
const productinfo = require('../models/productinfo.js');
const errors = {
    product_name: 'Product name is required.',
};
const GetDetail = async (req, res) => {
    try{
        const userid = req.userId;
        if(!userid){
            throw new Error('nouserid');
        }
        const findinfo = await productinfo.find({userid:userid.toString()});
        if(!findinfo){
            throw new Error('noinfo');
        }
        res.status(200).json({message:'success',data:findinfo});

    }
    catch(err){
        console.log(err);
        res.status(500).json({ message:err[errors]|| 'An error occurred.' });
    }
}
module.exports = GetDetail;

