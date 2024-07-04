// Import Setup For Apollo Server With Express
const { gql } = require('apollo-server-express');

const TypeDefs = gql`
    type User {
        _id: ID!
        Username: String!
        Email: String!
        BookCount: Int
        SavedBooks: [Book]
    }

    type Auth {
        Token: ID!
        User: User
    }

    type Book {
        Authors: [String]
        BookId: ID!
        Description: String
        Image: String
        Link: String
        Title: String
    }

    input InputBook {
        Authors: [String]
        BookId: String
        Description: String
        Image: String
        Link: String
        Title: String
    }

    type Query {
        Me: User
    }

    type Mutation {
        Login(Email: String!, Password: String!): Auth
        AddUser(Username: String!, Email: String!, Password: String!): Auth
        SaveBook(NewBook: InputBook!): User
        RemoveBook(BookId: ID!): User
    }
`;

module.exports = TypeDefs;