
const jwt = require('jsonwebtoken');
const users = require('../models/user.js');
const UseridMiddleware = async (req, res, next) => {

    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await users.findOne({ _id: decoded.id, token: token });
        if (!user) {
            throw new Error();
        }
        req.user = user;
      
        req.userId = decoded.id;
   
        req.token = token;
        next();
    } catch (err) {
        res.status(401).send({ error: 'Please authenticate.' });
    }
}
module.exports = UseridMiddleware;
