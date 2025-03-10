
const jwt = require('jsonwebtoken');
const { JWT_USER_SECRET } = require('../config');
// const { JWT_SECRET } =  require("../env");

function usermiddleware(req,res,next){
    const token = req.headers.token;
    const decodeddata= jwt.verify(token, JWT_USER_SECRET);
    if(decodeddata){
        req.id  = decodeddata.id;
        next();
    }
    else{
        res.status(403).send({
            message:'You are not signed in'
        })
    }
}

module.exports = {usermiddleware}
