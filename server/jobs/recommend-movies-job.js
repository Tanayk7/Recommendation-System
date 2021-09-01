require("dotenv").config();
const { parentPort } = require('worker_threads');
const setTimeoutSync = require('../utils/setTimeoutSync');
const { policies, DB_URI } = require('../config');
const mongoose = require('mongoose');
const User = require('../models/user');
const { mean, mode, euclideanDistance } = require('../utils/math');

const K = 2;

let all_users = [];
let users = [];

// Initialization code here 
const init = async () => {
    // connect to mongoose 
    await mongoose.connect(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    console.log("Worker connection to DB successful");

    // find all users in DB
    all_users = await User.find({});

    for (let user of all_users) {
        users.push({
            id: user.id,
            movies: user.movies,
            recommendations: user.recommendations,

        });
    }

    console.log("Users: ", users);

    users = preprocess(users);

    console.log("Done preprocessing: ", users);
}

// task code here 
// const task = async (data = null) => {
//     console.log("Running task...");

//     // check if users are present 
//     if (!users) {
//         console.log("No users found");
//         return;
//     }

//     // send test data
//     let results = { a: "123", b: "1234" };

//     parentPort.postMessage(results);
// }


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
            mv.name === movie.name
        ) {
            return true;
        }
    }

    return false;
}

// gets movie recommendations for a user 
function getRecommendations(current_user, all_users) {
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

function recommendMovies(users) {
    let all_users = [...users];
    console.log("All users initially: ", all_users);

    all_users = preprocess(all_users);
    console.log("All users after pre-processing: ", all_users);

    for (let user of all_users) {
        user.neighbours = findNearestNeighbours(user, all_users, K);
    }
    console.log("All users after finding neighbours: ", all_users);

    for (let user of all_users) {
        user.recommendations = getRecommendations(user, all_users);
    }
    console.log("All users after getting recommendations: ", all_users);
}


// Represents one job with multiple tasks
(async () => {
    await init();

    while (true) {
        await setTimeoutSync(policies.recommendation.INTERVAL);
        //await task();
    };
})();