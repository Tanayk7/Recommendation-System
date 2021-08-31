const mongoose = require('mongoose');
const Password = require('../utils/password');

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        movies: { type: Array, required: false },
        recommendations: { type: Array, required: false }
    },
    {
        timestamps: true,
        toJSON: {
            transform: (doc, ret) => {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
                delete ret.password;
            }
        }
    }
);

// pre-save middleware/hook
userSchema.pre('save', async function (next) {
    console.log("pre save hook called !");

    if (this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed);
    }

    next();
});

userSchema.statics.build = (attrs) => {
    return new User(attrs);
}

const User = mongoose.model("User", userSchema);

module.exports = User;

