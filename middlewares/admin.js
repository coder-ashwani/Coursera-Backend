
const jwt = require('jsonwebtoken');
const { JWT_Admin_SECRET } = require('../config');
// const { JWT_SECRET } =  require("../env");

function adminmiddleware(req,res,next){
    const token = req.headers.token;
    const decodeddata= jwt.verify(token, JWT_Admin_SECRET);
    if(decodeddata){
        req.userId  = decodeddata.id;   // req.userId is used to store the id of the admin
        next();
    }
    else{
        res.status(403).send({
            message:'You are not signed in'
        })
    }
}

module.exports = {adminmiddleware}
