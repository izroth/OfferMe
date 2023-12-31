const { search } = require('truecallerjs');
const productinfo = require('../models/productinfo');
const errors = {
    nofilter: 'No filter is provided.',
    product_name: 'Product name is required.',
};

const findproducts = async (req, res) => {
    try {
        const filter = req.query.search;
        if (!filter) {
            throw new Error('nofilter');
        }

        const matchingResults = [];

        const allProductInfo = await productinfo.find().limit(100);

        
        allProductInfo.forEach(product => {
            
            for (const attribute in product) {
                if (product[attribute] && product[attribute].toString().toLowerCase().includes(filter.toLowerCase())) {
                    matchingResults.push(product);
                    break; 
                }
            }
        });
        // const product  = await productinfo.find({"":$regex:{ ".*"+search+".*"}});
        // if(!product){
        //     res.status(200).json({ message: 'No matching results found.' });
        // }

        if (matchingResults.length === 0) {
            res.status(404).json({ message: 'No matching results found.' });
        }
    


        res.status(200).json({ results: product });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error[errors] || 'An error occurred.' });
    }
};

module.exports = findproducts;
