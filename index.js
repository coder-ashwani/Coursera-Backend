const express = require('express');
const app = express();
const port = 8000;
const userrouter = require('./routes/user')
const courserouter = require('./routes/course')
const adminrouter = require('./routes/admin')
const mongoose = require('mongoose');

app.use(express.json());
app.use(express.urlencoded({extended:true}));   //


app.use('/user', userrouter);
app.use('/admin', adminrouter);
app.use('/course', courserouter);



// pehle DB se connect karna hai then server ko start karna hai
async function main(){
    await mongoose.connect("mongodb+srv://ashwaniagarwal333:XcmQcfuS2Hp6KkGV@cluster0.0fcqw3z.mongodb.net/course-selling-app", {
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