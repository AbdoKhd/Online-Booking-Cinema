const User = require('../models/User');
const Movie = require('../models/Movie');
const Cinema = require('../models/Cinema');

exports.getLogin = (req, res)=>{
    res.render('Login', {movie: req.query.movie, error: req.query.error});
}

exports.postLogin = async (req, res) =>{
    const username = req.body.username;
    const password = req.body.password;
    const movie = req.body.movie;

    const user = await User.findOne({username, password});
    if (user) {
        if (movie) {
            res.render('pay', {user: username, movie});
        } else {
            const movies = await Movie.find();
            const cinemas = await Cinema.find();
            res.render('Home', {user: username, cinemas, movies});
        }
    } else {
        res.render('Login', {movie: req.query.movie, error: 'Wrong username or password'});
    }
}