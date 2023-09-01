const truecallerjs = require('truecallerjs')

const errors = {

}

const truecaller = async (req, res) => {

    try{
        const phonenumber = req.body.phonenumber;
        if(!phonenumber){
            throw new Error('nophone');
        }
        const findinfo = await truecallerjs.search(phonenumber);
        if(!findinfo){
            throw new Error('noinfo');
        }
        res.status(200).json({message:'success',data:findinfo});
        

    }
    catch(err){
        console.log(err);
        res.status(500).json({ message:err[errors]|| 'An error occurred.' });
    }

}
module.exports = truecaller;