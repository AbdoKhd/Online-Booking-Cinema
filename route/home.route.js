var express = require("express");
var router = express.Router();

const home = require('../controllers/home.controller');

router.get('/home', home.getHome);

module.exports = router;