var express = require("express");
var router = express.Router();

const login = require('../controllers/login.controller');

router.get('/login', login.getLogin);
router.post('/postLogin', login.postLogin);

module.exports = router;