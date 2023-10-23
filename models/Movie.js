const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    genre: {
        type: String,
        require: true
    },
    time: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    posterPath: {
        type: String,
        require: true
    }
})

const Movie = mongoose.model('movie', movieSchema);
module.exports = Movie
