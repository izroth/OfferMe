const mongoose  = require('mongoose');
const productSchema = new mongoose.Schema({
    productname: {
        type: String,
        required: true,
        
    },
    productid: {
        type: String,
        required: true,
        unique:true
    },
    producttitle: {
        type: String,
        required: true
    },
    productdescription: {
        type: String,
        required: true
    },
    productphotos: {
        type: String,
        required: true
    },
    productratings: {
        type: String,
        required: true
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

