const Movie = require('../models/Movie');
const Cinema = require('../models/Cinema');

exports.getHome = async (req, res) => {
    const movies = await Movie.find();
    const cinemas = await Cinema.find();
    res.render('Home', {user: req.query.username, cinemas, movies});
}