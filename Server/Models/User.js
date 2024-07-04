const { Schema, model } = require('mongoose');
const Bcrypt = require('bcrypt');

// Import Schema From Book.js
const BookSchema = require('./Book');

const UserSchema = new Schema({
    Username: {
        type: String,
        required: true,
        unique: true,
    },
    Email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must Use a Valid Email Address'],
    },
    Password: {
        type: String,
        required: true,
    },
    // Array Of Data That Adheres To BookSchema
    SavedBooks: [BookSchema],
},
// Set To Use Virtual Below
{
    toJSON: {
        virtuals: true,
    },
});

// Hash User Password
UserSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('Password')) {
        const SaltRounds = 10;
        this.Password = await Bcrypt.hash(this.Password, SaltRounds);
    }
    next();
});

// Compare And Validate Password For Logging In
UserSchema.methods.isCorrectPassword = async function (Password) {
    return Bcrypt.compare(Password, this.Password);
};

// User Query Returns A `BookCount` Field With Number Of Saved Books
UserSchema.virtual('BookCount').get(function () {
    return this.SavedBooks.length;
});

const User = model('User', UserSchema);

module.exports = User;