require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');
const { createWorker } = require('./utils/createWorker');
const { DB_URI } = require('./config');

let values = [1, 2, 3, 4, 5];

const PORT = process.env.PORT || 3000;
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

(async () => {
    try {
        for (let job of jobs) {
            createWorker(job)
        }

        await mongoose.connect(DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log("Connected to database successfully!");
    }
    catch (err) {
        console.log(err);
    }

    app.listen(PORT, () => {
        console.log(`Listening on port: ${PORT}`);
    })
})();