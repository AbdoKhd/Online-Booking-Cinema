const User = require('../models/User');
const Movie = require('../models/Movie');
const Cinema = require('../models/Cinema');

exports.getMovies = async (req, res) => {
    let username = req.query.username;
    if (username !== undefined && username.length === 0) {
        username = undefined;
    }
    const movies = await Movie.find();
    res.render('movies', {movies, user: username});
}

exports.getMovie = async (req, res) => {
    let username = req.query.username;
    if (username !== undefined && username.length === 0) {
        username = undefined;
    }
    const movie = await Movie.findOne({name: req.query.movie});
    res.render('movie', {user: username, movie});
}

exports.getSearch = async (req, res) => {
    let username = req.query.username;
    if (username !== undefined && username.length === 0) {
        username = undefined;
    }
    const query = req.query.search;
    const results = await Movie.find({ name: { $regex: query, $options: "i" } });
    res.render('movies', {movies: results, user: username});
}

exports.getFind = async (req, res) => {
    let username = req.query.username;
    if (username !== undefined && username.length === 0) {
        username = undefined;
    }
    const cinemaName = req.query.cinema;
    const movieName = req.query.movie;
    const cinema = await Cinema.findOne({name: cinemaName});
    const movies = await Movie.find({name: movieName});
    res.render('movies', {movies: movies.filter((movie) => cinema.movies.includes(movie._id)), user: username});
}

exports.getPay = async (req, res) => {
    let username = req.query.username;
    if (username !== undefined && username.length === 0) {
        username = undefined;
    }
    const movie = await Movie.findOne({name: req.query.movie});
    res.render('pay', {user: username, movie});
}