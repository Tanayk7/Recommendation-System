require('dotenv').config();

const PORT = process.env.PORT || 3000;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@starlight.j80mw.mongodb.net/${process.env.DB_DATABASE}?retryWrites=true&w=majority`
const num_minutes = (1 / 2);
const interval = 1000 * 60 * num_minutes;
const jobs = [
    {
        name: "Movie recommender",
        path: "./jobs/recommend-movies-job.js",        // path relative to file in which initJobs is called
        onMessage: (data) => {
            console.log(data);
            console.log("values are :", values);
            values = [5, 6, 7, 8];
            console.log("Changed values to: ", values);

        },
        onError: (err) => {
            console.log(err);
        },
        onExit: (code) => {
            if (code !== 0) {
                console.log("Worker exited with non-zero exit code: ", code);
            }
        }
    },
];

module.exports = {
    PORT,
    DB_URI: uri,
    RUN_JOBS: true,
    policies: {
        auth: {
            TOKEN_EXPIRY: '15m'
        },
        password: {
            MIN_CHARS: 4,
            MAX_CHARS: 20,
        },
        recommendation: {
            INTERVAL: interval
        },
    },
    jobs
};