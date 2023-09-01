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
            installationId: "a1i0C--heJuzDFS-ENZJpaXXepHFuYu71Sbqh_NgCk3ZY9Rxyd40XYSaU6wmq7e6",
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
