const { Schema } = require('Mongoose');

// Sub-Document Schema To Use For User's `SavedBooks` Array In User.js
const BookSchema = new Schema({
    Authors: [
        {
            type: String,
        },
    ],
    // Saved Book ID From Google Books
    BookId: {
        type: String,
        required: true,
    },
    Description: {
        type: String,
        required: true,
    },
    Image: {
        type: String,
    },
    Link: {
        type: String,
    },
    Title: {
        type: String,
        required: true,
    },
});

module.exports = BookSchema;