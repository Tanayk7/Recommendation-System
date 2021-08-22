
const mongoose = require('mongoose');
const { Schema } = mongoose;

const movieSchema = new Schema({
    genre: {
        type: String,
        required: true
    }, 
    movies: {
        type: [],
        required: true
    } 
}, { timestamps: true });

const Movie = mongoose.model('movies', movieSchema);
module.exports = Movie;