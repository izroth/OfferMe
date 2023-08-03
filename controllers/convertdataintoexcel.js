const productinfo = require('../models/productinfo');
const users = require('../models/user.js');
const errors = {
    product_name: 'Product name is required.',
};
//json2xls
const json2xls = require('json2xls');
const fs = require('fs');
const axios = require('axios');
const convertdataintoexcel = (req, res) => {
    try {
        const userid = req.userId;
       if(!userid){
        throw new Error('nouserid');
       }
       const finduser = users.findOne({_id:userid});
         if(!finduser){
            throw new Error('nouser');
         }
         //find the product info with the user id
            const findproductinfo = productinfo.find({userid:userid.toString()});
            if(!findproductinfo){
                throw new Error('noproductinfo');
            }
            //convert the data into excel
            const xls = json2xls(findproductinfo);
            //write the data into excel
            fs.writeFileSync('data.xlsx', xls, 'binary');
            res.status(200).json({message:'success'});

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message:err[errors]|| 'An error occurred.' });
    }

}
module.exports = convertdataintoexcel;
