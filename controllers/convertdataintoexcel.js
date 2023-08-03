const productifno = require('../models/productinfo');
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
        console.log(userid);
        
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'An error occurred.' });
    }

}
