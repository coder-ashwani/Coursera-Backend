const express = require('express');
const router = express.Router();
const {usermiddleware} = require('../middlewares/user');
const {purchaseModel,courseModel} = require('../Db');

router.post('/purchase',usermiddleware, async(req, res) => {
    const userId = req.userId;
    const courseId = req.body.courseId;
    //check that the user has already purchased the course or not
    await purchaseModel.create({ 
        userId: userId,
        courseId: courseId
       })

    res.status(200).send({
        message: 'Course Purchased successfully'
    })
    
})

router.get('/preview',async (req, res) => {
    // const userId = req.userId;
    const courses =await courseModel.find({});
    res.send(courses);
})

module.exports = router;