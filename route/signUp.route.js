var express = require("express");
var router = express.Router();

const signUp = require('../controllers/signUp.controller');

router.get('/signUp', signUp.getSignUp);
router.post('/addUser', signUp.addUser);

module.exports = router;