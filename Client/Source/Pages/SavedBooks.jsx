// New Import For Refactor
import { useMutation, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';

import Auth from '../Utils/Auth';
import { RemoveBookId } from '../Utils/LocalStorage';

// Needed For GraphQL API Refactor
import { REMOVE_BOOK } from '../Utils/Mutations';
import { ME } from '../Utils/Queries';

const SavedBooks = () => {
    const { loading, data } = useQuery(Me);
    const [RemoveBook, { error }] = useMutation(REMOVE_BOOK);
    const UserData = data?.FromMe || {};

    // Delete Book From Database
    const HandleDeleteBook = async (BookId) => {
        const Token = Auth.LoggedIn() ? Auth.GetToken() : null;

        if (!Token) {
            return false;
        }

        try {
            const Response = await RemoveBook({ variables: { BookId } });
            console.log('Deleted Record: ', Response);
            if (error) {
                console.log(error);
            }
            // Remove Book From Local Storage
            RemoveBookId(BookId);
        } catch (Err) {
            console.error(Err);
        }
    };

    // If Data Hasn't Finished Loading, Display Loading Message
    if (loading) {
        return <h2>Loading...</h2>;
    }

    return (
        <>
            <div fluid className='text-light bg-dark p-5'>
                <Container>
                    <h1>Viewing Saved Books!</h1>
                </Container>
            </div>
            <Container>
                <h2 className='pt-5'>
                    {UserData.SavedBooks.length
                        ? `Viewing ${UserData.SavedBooks.length} Saved ${UserData.SavedBooks.length === 1 ? 'Book' : 'Books'}:`
                        : 'No Saved Books!'}
                </h2>
                <Row>
                    {UserData.SavedBooks.map((Book) => {
                        return (
                            <Col md='4'>
                                <Card key={Book.BookId} border='dark'>
                                    {Book.Image ? <Card.Img src={Book.Image} alt={`The Cover For ${Book.Title}`} variant='top' /> : null}
                                    <Card.Body>
                                        <Card.Title>{Book.Title}</Card.Title>
                                        <p className='Small'>Authors: {Book.Authors}</p>
                                        <Card.Text>{Book.Description}</Card.Text>
                                        <Button className='btn-block btn-danger' onClick={() => DeleteBook(Book.BookId)}>
                                            Delete Book
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
            </Container>
        </>
    );
}

export default SavedBooks;