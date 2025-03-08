const express = require('express');
const router = express.Router();

router.get('/purchase', (req, res) => {
    res.send('Course Page')
})
router.get('/preview', (req, res) => {
    res.send('Course Page')
})

module.exports = router;