require('dotenv').config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@starlight.j80mw.mongodb.net/${process.env.DB_DATABASE}?retryWrites=true&w=majority`
const num_minutes = (1 / 2);
const interval = 1000 * 60 * num_minutes;

module.exports = {
    DB_URI: uri,
    password_policy: {
        MIN_CHARS: 4,
        MAX_CHARS: 20,
    },
    job_config: {
        recommendation: {
            INTERVAL: interval
        }
    }
}