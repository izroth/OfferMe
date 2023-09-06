const redis = require('redis');

const redismiddleware = async(req, res, next) => {
    try {
        const client = redis.createClient();
        client.on('error', (err) => {
            console.log("Error " + err);
        });
        const userid = req.userId;
        console.log(userid);
        client.get(userid, (err, data) => {
            if (err) throw err;
            if (data !== null) {
                console.log("data from redis");
                res.send(JSON.parse(data));
            } else {
                next();
            }
            
        });
    } catch (err) {
        res.status(500).send({ message: err.message || 'An error occurred.' });
    }
}
module.exports = redismiddleware;


