const Express = require('express');
const Path = require('path');
const { ApolloServer } = require('apollo-server-express');

const Database = require('./Config/Connection');
const { AuthMiddleware } = require('./Utils/Auth');
const { Resolvers, TypeDefs } = require('./Schemas');
// const Routes = require('./Routes');

const App = Express();
const PORT = process.env.PORT || 3001;

const Server = new ApolloServer({
    TypeDefs,
    Resolvers,
    context: AuthMiddleware,
});

App.use(Express.urlencoded({ extended: false }));
App.use(Express.json());

// If In Production, Serve Client / Build As Static Assets
if (process.env.NODE_ENV === 'production') {
    App.use(Express.static(Path.join(__dirname, '../Client/build')));
}

App.get('/', (Req, Res) => {
    Res.sendFile(Path.join(__dirname, '../Client/build/index.html'));
});

// Create New Instance Of Apollo Server With The GraphQL Schema
const StartApolloServer = async (TypeDefs, Resolvers) => {
    await Server.start();
    Server.applyMiddleware({ App });

    Database.once('open', () => {
        App.listen(PORT, () => {
            console.log(`API Server Running On PORT: ${PORT}!`);
            console.log(`Use GraphQL At http://localhost:${PORT}${Server.graphqlPath}`);
        });
    });
};

// Call The Async Function To Start The Server
StartApolloServer(TypeDefs, Resolvers);