
const jwt = require('jsonwebtoken');
const { JWT_SECRET } =  "hellobacho";

function auth(req,res,next){
    const token = req.headers.token;
    const decodeddata= jwt.verify(token,JWT_SECRET);
    if(decodeddata){
        req.userId = decodeddata.id;
        next();
    }
    else{
        res.status(403).send({
            message:'Incorrect Credentials'
        })
    }
}

module.exports = {JWT_SECRET}
