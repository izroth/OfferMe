const productinfo = require('../models/productinfo');
const users = require('../models/user.js');
const errors = {
  product_name: 'Product name is required.',
};
const axios = require('axios');

const fetchProductData = (product_name) => {
 
  const axiosConfig = {
    params: {
      q: product_name,
      country: 'IN',
      language: 'en',
    },
    headers: {
      'x-rapidapi-key': process.env.API_KEY,
      'x-rapidapi-host': 'real-time-product-search.p.rapidapi.com',
    },
  };

  return axios.get('https://real-time-product-search.p.rapidapi.com/search', axiosConfig)
    .then(response => response.data);
}

const EnterDetails = (req, res) => {
try{
  const userid = req.userId;
  console.log(userid);

  // Find user id
  users.findOne({ _id: userid })
    .then(finduser => {
      if (!finduser) {
        return res.status(400).json({ message: 'User does not exist.' });
      }

      const product_name = req.body.product_name;

      if (!product_name) {
        throw new Error(errors.product_name);
      }

      // Fetch product data from the API
      return fetchProductData(product_name);
    })
    .then(data_response => {
      console.log(data_response.data);
      const products = data_response.data;
      const allOffers = [];
        products.forEach(product => {
            allOffers.push({
                product_id: product.product_id,
                userid: userid,
               
                product_title: product.product_title,
                product_image: product.product_image,
                        store_name: product.offer.store_name,
                        store_rating: product.offer.store_rating,
                        offerpageurl: product.offer.offer_page_url,
                        store_review_count: product.offer.store_review_count,
                        store_reviews_page_url: product.offer.store_reviews_page_url,
                        price: product.offer.price,
                        shipping: product.offer.shipping,
                        on_sale: product.offer.on_sale,
                        original_price: product.offer.original_price,
                        product_condition: product.offer.product_condition,

            });
        });


       

       
    //now save the data in database
    const savedata= productinfo.insertMany(allOffers);
    if(!savedata){
        throw new Error('Data not saved.');
    }
    res.status(200).json({ message: 'success', data: allOffers });
   
    

    
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({ message: err.message || 'An error occurred.' });
    });
}

catch(err){
    console.log(err);
    res.status(500).json({message:err[errors] || 'An error occured.'});
}
}

module.exports = EnterDetails;
