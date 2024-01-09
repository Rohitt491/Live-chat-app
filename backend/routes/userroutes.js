const router = require('express').Router();
const {signup} = require('../controllers/usercontroller.js');
const {login} = require('../controllers/usercontroller.js');
const {setavatar} = require('../controllers/usercontroller.js');
const {contacts} = require('../controllers/usercontroller.js');


router.post('/signup', signup)
router.post('/login', login)
router.post('/setavatar/:id', setavatar)
router.get('/contacts', contacts)

module.exports = router;