const mongoose = require('mongoose');
const app = require('./app');

const PORT = 3000;

(async () => {
    try {
        // connect to mongoose here 
        console.log("Connected to databse successfully");
    }
    catch (err) {
        console.log(err);
    }

    app.listen(PORT, () => {
        console.log(`Listening on port: ${PORT}`);
    })
})()