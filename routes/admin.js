const express=  require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// require("dotenv").config();


const { adminModel, userModel, courseModel } = require('../Db');

router.post('/signup', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    let errorthrown = false;    
    try{
        const hashedPassword = await bcrypt.hash(password, 5);

        await adminModel.create({
            email: email,
            password: hashedPassword,
            name: name
        })  
    }
    catch(e){
        console.log(e);
        res.status(500).send({
            message: 'Something went wrong Maybe email already exists'
        })
        return;
    }
    if(!errorthrown){
        res.send({
            message: 'Admin created Successfully'
        })
    }
})

router.post('/signin',async (req, res) => {
        const email = req.body.email;
        const password = req.body.password;
        const admin =  await adminModel.findOne({email: email});
        console.log(admin);

        try{
            if(!admin){
            res.status(403).send({
                message:'Admin does not exist'
            })
            return;
        }
        const passwordMatch = await bcrypt.compare(password, admin.password);
        if(passwordMatch){
            const token = jwt.sign({email:email},"hellobacho");
            res.send({
                message: 'Admin Logged in Successfully',
                token: token
            })
           
        }
        else{
            res.status(403).send({
                message:'Incorrect Credentials'
            })
        }
    }
    catch(e){
        console.log(e);
        res.status(500).send({
            message: 'Something went wrong'
        })
    }
})  




 router.post('/addcourse', (req, res) => {
    res.send('Course Added')
})
router.put('/updatecourse', (req, res) => {
    res.send('Course Updated')
})
router.delete('/deletecourse', (req, res) => {
    res.send('Course Deleted')
})
router.get('/allcourses', (req, res) => {
    res.send('All Courses') 
})

 module.exports = router;