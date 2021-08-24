require("dotenv").config();
const { parentPort } = require('worker_threads');
const setTimeoutSync = require('../utils/setTimeoutSync');
const { policies, DB_URI } = require('../config');
const mongoose = require('mongoose');
const User = require('../models/user');

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
    users = await User.find({});

    console.log("Users found: ", users);
}

// task code here 
const task = async (data = null) => {
    console.log("Running task...");

    // check if users are present 
    if (!users) {
        console.log("No users found");
        return;
    }

    // send test data
    let results = { a: "123", b: "1234" };

    parentPort.postMessage(results);
}

// Represents one job with multiple tasks
(async () => {
    await init();

    while (true) {
        await setTimeoutSync(policies.recommendation.INTERVAL);
        await task();
    };
})();