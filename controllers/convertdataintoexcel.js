const productinfo = require('../models/productinfo');
const users = require('../models/user.js');
const errors = {
  product_name: 'Product name is required.',
};
//json2xls
// const json2xls = require('json2xls');
const json2csv = require('json2csv').parse;
const fs = require('fs').promises; // Use fs.promises for async file operations
const axios = require('axios');

const convertdataintoexcel = async (req, res) => {
  try {
    const userid = req.userId;
    if (!userid) {
      throw new Error('nouserid');
    }

    const finduser = await users.findOne({ _id: userid });
    if (!finduser) {
      throw new Error('nouser');
    }

    // Find the product info with the user id
    const findproductinfo = await productinfo.find(
      { userid: userid.toString() },
      {
        product_title: 1,
        store_name: 1,
        store_rating: 1,
        offerpageurl: 1,
        store_review_count: 1,
        store_reviews_page_url: 1,
        price: 1,
        shipping: 1,
        on_sale: 1,
        original_price: 1,
        product_condition: 1,
        _id: 0,
      }
    );
    if (!findproductinfo || findproductinfo.length === 0) {
      throw new Error('noproductinfo');
    }

    // Now create headers for csv
    const headers = [
      'product_title',
      'store_name',
      'store_rating',
      'offerpageurl',
      'store_review_count',
      'store_reviews_page_url',
      'price',
      'shipping',
      'on_sale',
      'original_price',
      'product_condition',
    ];

   // Now create the csv file using json2csv with the headers and the product info data with there respective headers
    const csv = json2csv(findproductinfo, { fields: headers });
    // Now write the csv file to the server
    await fs.writeFile('productinfo.csv', csv);
    // Now send the csv file to the client
    res.download('productinfo.csv');



    res.status(200).json({ message: 'success' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message || 'An error occurred.' });
  }
};

module.exports = convertdataintoexcel;
