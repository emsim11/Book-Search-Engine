const Router = require('express').Router();
const { GetSingleUser, CreateUser, Login, SaveBook, DeleteBook } = require('../../Controllers/User-Controller');
const { AuthMiddleware } = require('../../Utils/Auth');

// Use Auth Middleware With Anything That Sends A Token For User Verification
Router.route('/').post(CreateUser).put(AuthMiddleware, SaveBook);

Router.route('/Login').post(Login);

Router.route('/Me').get(AuthMiddleware, GetSingleUser);

Router.route('/Books/:BookId').delete(AuthMiddleware, DeleteBook);

module.exports = Router;