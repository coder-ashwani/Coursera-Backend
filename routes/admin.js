const express=  require('express');
const router = express.Router();

const { adminModel, userModel, courseModel } = require('../Db');




router.post('/signup', (req, res) => {
   
    res.send('Admin Page')
})

router.post('/signup', (req, res) => {
    res.send('Admin Page')
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