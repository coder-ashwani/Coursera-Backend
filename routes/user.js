const express = require('express');
const { userModel } = require('../Db');
const router = express.Router();
const bcrypt = require('bcrypt');

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
router.get('/login', (req, res) => {
    res.send('User Page')
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