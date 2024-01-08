const router = require('express').Router();
const {signup} = require('../controllers/usercontroller.js');
const {login} = require('../controllers/usercontroller.js');


router.post('/signup', signup)
router.post('/login', login)

module.exports = router;