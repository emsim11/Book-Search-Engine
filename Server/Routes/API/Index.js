const Router = require('express').Router();
const UserRoutes = require('./User-Routes');

Router.use('/Users', UserRoutes);

module.exports = Router;