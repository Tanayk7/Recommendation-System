require('dotenv').config();
const axios = require('axios').default;
const mongoose = require('mongoose');

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@starlight.j80mw.mongodb.net/${process.env.DB_DATABASE}?retryWrites=true&w=majority`;
const Movie = require('./models/movie');

const url = 'https://api.themoviedb.org/3/';
const imagePath = 'https://image.tmdb.org/t/p/w1280';
const genrePath = '/genre/movie/list?api_key=' + process.env.API_KEY + '&language=en-US';
const genreURL = url + genrePath;
const moviePath = 'discover/movie?api_key=' + process.env.API_KEY;
const movieURL = url + moviePath;

let total = 100;
let limit = 20;
let calls = total / limit;

async function getGenres(url) {
    try {
        const response = await axios.get(url);
        return response.data.genres;
    }

    catch (error) {
        console.error(error);
    }
}

async function getMovies(url) {
    try {
        const response = await axios.get(url);
        return response.data.results;
    }

    catch (error) {
        console.error(error);
    }
}

async function getData() {
    try {
        let data = await getGenres(genreURL);
        let dct = {};
        for (let idx = 0; idx <= data.length - 1; idx++) {
            dct[data[idx].name] = [];
            for (let pageidx = 1; pageidx <= calls; pageidx++) {
                let results = await getMovies(movieURL + `&with_genres=${data[idx].id}&page=${pageidx}&language=en-US`);
                dct[data[idx].name].push(...results);
            }
        }
        return dct;
    }

    catch (error) {
        console.error(error);
    }
}

async function processData() {
    try {
        let genres = await getData();
        for (let movie in genres) {
            for (let idx = 0; idx <= genres[movie].length - 1; idx++) {
                let { title, overview, poster_path, vote_average, popularity, release_date } = genres[movie][idx];
                let selection = { title, overview, avatar: imagePath + poster_path, rating: vote_average, popularity, release_date };
                genres[movie][idx] = { ...selection };
            }
        }
        return genres;
    }

    catch (error) {
        console.error(error);
    }
}

(async () => {
    try {
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
        console.log('\n' + 'connected to atlas!' + '\n');

        let data = await processData();
        let records = [];
        for (let genre in data) {
            records.push({ 'genre': genre, 'movies': data[genre] });
        }
        await Movie.insertMany(records);
        console.log('Inserted all results! gg!');
    }

    catch (error) {
        console.error('error ' + error);
    }
})();
