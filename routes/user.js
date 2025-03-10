const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { userModel } = require('../Db');
const jwt = require('jsonwebtoken');
const { JWT_USER_SECRET } = require('../config');

router.post('/signup', async(req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    let errorthrown = false;

    try {
        const hashedPassword =  await bcrypt.hash(password, 5);
        // console.log(hashed
        await userModel.create({
            email: email,
            password: hashedPassword,
            name: name
        })
    }
    catch (e) {
        console.log(e); // if any error occurs
        res.status(500).send({
            message: 'Something went wrong Maybe email already exists'
        })
        errorthrown = true;
        return;
    }
    // console.log(response);
    if (!errorthrown) {
        res.send({
            message: 'User created Successfully'
        })
    }
})

// Signin endpoint returns a token
router.post('/signin', async(req, res) => {
    const email =req.body.email;
    const password = req.body.password; 
    const user  = await userModel.findOne({email: email});

    try {
        if(!user){
            res.status(403).send({
                message: 'User does not exist'
            })
            return;
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        const token = jwt.sign({id : user._id}, JWT_USER_SECRET);// secret key
        if(passwordMatch){
            res.send({
                message: 'User Logged in Successfully',
                token: token
            })
        }
        else{
            res.status(403).send({
                message: 'Incorrect Password'
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


router.get('/purchasecourse', (req, res) => {
    res.send('Courses purchased by user')
})
router.get('/courses', (req, res) => {
    res.send('All Courses')
})
router.get('/purchased', (req, res) => {
    res.send('Purchased Courses')
})



module.exports = router;