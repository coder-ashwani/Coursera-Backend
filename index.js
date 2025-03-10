const express = require('express');
const app = express();
const port = 8000;
require('dotenv').config();
const userrouter = require('./routes/user')
const courserouter = require('./routes/course')
const adminrouter = require('./routes/admin')
const mongoose = require('mongoose');
const { auth } = require('./middlewares/user');


app.use(express.json());
app.use(express.urlencoded({extended:true}));   //


app.use('/user', userrouter);
app.use('/admin', adminrouter);
app.use('/course', courserouter);



// pehle DB se connect karna hai then server ko start karna hai
async function main(){
    await mongoose.connect(process.env.MONGOURL, {
    }).then(() => {
        console.log("Connected to Database")
    }).catch((err) => {
        console.log(err)
    });
    
    app.listen(port, () => {
        console.log(`Server starting at http://localhost:${port}`)
    })
}

main();