require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');

const PORT = 3000;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@starlight.j80mw.mongodb.net/${process.env.DB_DATABASE}?retryWrites=true&w=majority`;

(async () => {
    try {
        await mongoose.connect(uri, {
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