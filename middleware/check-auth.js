//const bcryptjs = require('bcryptjs');
const jwt  = require('jsonwebtoken');
const config = require('../config');

module.exports = (req, res, next) =>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, config.jwtSecret);
        console.log(decoded)
        req.userData = decoded;

        next();
    }catch(error){
        return res.status(401).json("Falha na autenticação");
    }
};