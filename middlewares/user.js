
const jwt = require('jsonwebtoken');
// const { JWT_SECRET } =  require("../env");

function auth(req,res,next){
    const token = req.headers.token;
    const decodeddata= jwt.verify(token,process.env.JWT_SECRET);
    if(decodeddata){
        req.email  = decodeddata.email;
        next();
    }
    else{
        res.status(403).send({
            message:'Incorrect Credentials'
        })
    }
}

module.exports = {auth}
