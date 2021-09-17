require("dotenv").config();
const { parentPort } = require('worker_threads');
const setTimeoutSync = require('../utils/setTimeoutSync');
const { policies, DB_URI } = require('../config');
const mongoose = require('mongoose');
const User = require('../models/user');
const Movie = require('../models/movie');
const { mean, mode, euclideanDistance } = require('../utils/math');

const K = 2;

let all_users = [];
let users = [];
let genres = {}

// Initialization code here 
const init = async () => {
    // connect to mongoose 
    await mongoose.connect(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    console.log("Worker connection to DB successful");
}

function preprocess(users) {
    for (let user of users) {
        let user_movie_ratings = [];
        let user_movie_genres = [];
        let user_movie_popularity = [];
        let sim_vec = {
            mode_genre: null,
            mean_rating: null,
            mean_popularity: null,
        };

        for (let movie of user.movies) {
            user_movie_genres.push(movie.genre);
            user_movie_ratings.push(movie.rating);
            user_movie_popularity.push(movie.popularity);
        }

        sim_vec.mode_genre = parseInt(mode(user_movie_genres));
        sim_vec.mean_rating = parseInt(mean(user_movie_ratings));
        sim_vec.mean_popularity = parseInt(mean(user_movie_popularity));

        // set the similarity vector used to compare users
        user.sim_vec = sim_vec;
        // set the neighbours to be filled later by the knn algorithm
        user.neighbours = [];
    }

    return users;
}

// finds the nearest neighbours to a user 
function findNearestNeighbours(user, all_users, k) {
    let current_user = user;
    let distances = [];

    for (let other of all_users) {
        if (other.id !== current_user.id) {
            let user_vec = [
                current_user.sim_vec.mode_genre,
                current_user.sim_vec.mean_rating,
                current_user.sim_vec.mean_popularity
            ]
            let other_vec = [
                other.sim_vec.mode_genre,
                other.sim_vec.mean_rating,
                other.sim_vec.mean_popularity
            ];
            let distance = euclideanDistance(user_vec, other_vec);

            distances.push({ id: other.id, distance });
        }
    }

    // sort in ascending order
    distances.sort((a, b) => a.distance - b.distance);
    k_nearest_neighbours = distances.slice(0, k);

    return k_nearest_neighbours;
}

// checks whether a user has watched a movie 
function hasWatched(movie, user) {
    for (let mv of user.movies) {
        if (mv.genre === movie.genre &&
            mv.rating === movie.rating &&
            mv.popularity === movie.popularity &&
            mv.title === movie.title
        ) {
            return true;
        }
    }

    return false;
}

// gets movie recommendations for a user 
function getRecommendations(current_user, all_users) {
    //console.log("Current user: ", current_user);
    let user_neighbours = current_user.neighbours;
    let movie_recommendations = [];

    for (let neighbour of user_neighbours) {
        let neighbour_movies = all_users.find(user => user.id === neighbour.id).movies;

        for (let movie of neighbour_movies) {
            let user_has_watched = hasWatched(movie, current_user);

            // if the user hasn't already watched the move before and its not already in the recommendations 
            if (!user_has_watched && !movie_recommendations.includes(JSON.stringify(movie))) {
                // encode to JSON for comparison in array using includes
                movie_recommendations.push(JSON.stringify(movie));
            }
        }
    }

    // decode from json to object
    for (let movie of movie_recommendations) {
        movie = JSON.parse(movie);
    }

    return movie_recommendations;
}

async function recommendMovies() {
    let movie_objects = await Movie.find({});

    for (let i = 0; i < movie_objects.length; i++) {
        genres[movie_objects[i].genre] = i
    }

    // find all users in DB
    all_users = await User.find({});

    if (all_users.length === 0) {
        console.log("No users in DB");
        return;
    }

    for (let user of all_users) {
        if (user.movies.length > 0) {
            let user_movies = [...user.movies];

            for (let i = 0; i < user_movies.length; i++) {
                user_movies[i] = {
                    ...user_movies[i],
                    genre: genres[user_movies[i].genre]
                }
            }

            users.push({
                id: user.id,
                movies: user_movies,
            });
        }
    }

    if (users.length > 0 && users.length > K) {
        users = preprocess(users);
        console.log("Done preprocessing: ", users);
    }
    else {
        console.log("Not enough users...");
        return
    }

    for (let user of users) {
        user.neighbours = findNearestNeighbours(user, users, K);
    }

    for (let user of users) {
        user.recommendations = getRecommendations(user, users);
    }

    for (let i = 0; i < users.length; i++) {
        for (let j = 0; j < users[i].recommendations.length; j++) {
            users[i].recommendations[j] = JSON.parse(users[i].recommendations[j]);

            const key = Object.keys(genres)[Object.values(genres).indexOf(users[i].recommendations[j].genre)];

            users[i].recommendations[j].genre = key;
        }

        for (let k = 0; k < users[i].movies.length; k++) {
            const key = Object.keys(genres)[Object.values(genres).indexOf(users[i].movies[k].genre)];

            users[i].movies[k].genre = key;
        }
    }

    for (let user of users) {
        //console.log(user.recommendations);
        await User.findOneAndUpdate({ _id: user.id }, { recommendations: [...user.recommendations] }, { new: true });
        console.log("Updated recommendations for user: ", user.id);
    }
}

// Represents one job with multiple tasks
(async () => {
    await init();

    console.log("Initialization complete...");

    while (true) {
        await setTimeoutSync(policies.recommendation.INTERVAL);
        await recommendMovies(users);
    };
})();