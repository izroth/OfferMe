
const requestip = require('request-ip');
const CryptoJS = require('crypto-js');

const CheckValidApiSource = async(req, res, next) => {

    try {
        // check for the host of api request
        if (!req.headers['user-agent']) {
            throw new Error('No user Agent present');
        }
        // check if app type header not present
        if (!req.headers['x-app-type']) {
            throw new Error('app type header not present');
        }
        // check for the method of api request
        if (req.headers['x-app-type'] !== 'OffermeRequest') {
            throw new Error('Invalid App Type');
        }
        // check if request id header not present
        if (!req.headers['x-request-id']) {
            throw new Error('request id not present');
        }
        // check if hashed id header not present
        if (!req.headers['x-hashed-id']) {
            throw new Error('hashed id not present');
        }
        // check if request token not present
        if (!req.headers['x-request-token']) {
            throw new Error('request token not present');
        }
    
        
    }
    catch (err) {
        res.status(500).send({ message: err.message || 'An error occurred.' });
    }
};
module.exports = CheckValidApiSource;

