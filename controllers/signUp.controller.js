const User = require('../models/User');
const Movie = require('../models/Movie');
const Cinema = require('../models/Cinema');

exports.getSignUp = (req, res)=>{
    res.render('SignUp', {error: req.query.error});
}

exports.addUser = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const address = req.body.address;

    if (await User.findOne({username})) {
        res.render('SignUp', {error: 'User already exists'});
    } else {
        await User.findOneAndUpdate({username}, {username, password, address});
        const movies = await Movie.find();
        const cinemas = await Cinema.find();
        res.render('Home', {user: username, cinemas, movies});
    }
}