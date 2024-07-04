const Mongoose = require('mongoose');

Mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/GoogleBooks', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
});

module.exports = Mongoose.connection