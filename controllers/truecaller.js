const truecallerjs = require('truecallerjs');


const errors = {};

const truecaller = async (req, res) => {
    try {
        const { phone, countrycode } = req.body;
        if (!phone) {
            throw new Error('nophone');
        }
        //check the length of phone number
        if (phone.length < 10) {
            throw new Error('invalidphone');
        }

        const searchData = {
            number: phone,
            countryCode: "IN",
            //to create installation id, 
            //first npm i -g truecallerjs in your terminal
            //then run truecallerjs login in your terminal
            //then run truecallerjs -i in your terminal
            installationId: "use your installation id here",
          };

        // Create a SearchData object
        const response = await truecallerjs.search(searchData);



        res.status(200).json({ message: 'success', data: response.json() });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message || 'An error occurred.' });
    }
};

module.exports = truecaller;
