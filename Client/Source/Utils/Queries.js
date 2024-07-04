import { gql } from '@apollo/client';

export const ME = gql`
{
    Me {
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
`;