const Router = require('express').Router();
const Path = require('path');
const APIRoutes = require('./API');

Router.use('/API', APIRoutes);

// Serve React Front-End In Production
Router.use((Req, Res) => {
    Res.sendFile(Path.join(__dirname, '../../Client/build/index.html'));
});

module.exports = Router;