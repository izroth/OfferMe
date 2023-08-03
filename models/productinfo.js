const mongoose  = require('mongoose');
const productSchema = new mongoose.Schema({
    product_id: {
        type: String,
        required: true,
    },
    productname: {
        type: String,
        required: true,
        
    },
    store_name: {
        type: String,
        required: true,
    },
    store_rating: {
        type: String,
        required: true,
    },

    
    offerpageurl: {
        type: String,
        required: true,
    },
    store_review_count: {
        type: String,
        
    },
    store_reviews_page_url: {
        type: String,
       
    },
    price: {
        type: String,
        required: true,
    },
    shipping: {
        type: String,
     
    },
    on_sale: {
        type: String,
    
    },
    original_price: {
        type: String,
        
    },
    product_condition: {
        type: String,
        required: true,
    },
    userid: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }

})
module.exports = mongoose.model('Product', productSchema);

