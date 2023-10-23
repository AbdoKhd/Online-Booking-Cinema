const express = require('express');
// const connectionPool = require('./config/database.config');
const connectDatabase = require('./config/db_config');
const path = require('path');
const bodyParser = require('body-parser');
// var pool = connectionPool.getPool();
connectDatabase();

const insert = require('./insert');
insert();

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:false}));

//routes
var HomeRoute = require('./route/home.route');
app.use('/home', HomeRoute);

var MoviesRoute = require('./route/movies.route');
app.use('/movies', MoviesRoute);

var loginRoute = require('./route/login.route');
app.use('/login', loginRoute);

var signUpRoute = require('./route/signUp.route');
app.use('/signUp', signUpRoute);




const PORT = 3001;
app.listen(PORT);

console.log(`Server is running on ${PORT}`);

app.use(express.static(__dirname + '/public'));