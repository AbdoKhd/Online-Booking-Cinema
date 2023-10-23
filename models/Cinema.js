const mongoose = require('mongoose');

const cinemaSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    movies: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Movie' 
        }
    ],
})

const Cinema = mongoose.model('cinema', cinemaSchema);
module.exports = Cinema
