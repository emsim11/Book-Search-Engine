import { gql } from '@apollo/client';

export const LOGIN_USER = gql `
mutation Login(
    $Email: String!
    $Password: String!
) {
    Login (
        Email: $Email
        Password: $Password
    ) {
        Token
        User {
            _id
            Username
        }
    }
}
`;

export const ADD_USER = gql`
mutation AddUser(
    $Username: String!
    $Email: String!
    Password: String!
) {
    AddUser(
        Username: $Username
        Email: $Email
        Password: $Password
    ) {
        Token
        User {
            _id
            Username
            Email
            BookCount
            SavedBooks {
                Authors
                BookId
                Description
                Image
                Link
                Title
            }
        }
    }
}
`;

export const SAVE_BOOK = gql`
mutation SaveBook($NewBook: InputBook!) {
    SaveBook(NewBook: $NewBook) {
        _id
        Username
        Email
        SavedBooks {
            Authors
            BookId
            Description
            Image
            Link
            Title
        }
    }
}
`;

export const REMOVE_BOOK = gql`
mutation RemoveBook($BookId: ID!) {
    RemoveBook(BookId: $BookId) {
        _id
        Username
        Email
        SavedBooks {
            Authors
            BookId
            Description
            Image
            Link
            Title
        }
    }
}
`;