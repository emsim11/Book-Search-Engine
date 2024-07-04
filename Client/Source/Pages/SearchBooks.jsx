import { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';

import Auth from '../Utils/Auth';
import { SaveBook, SearchGoogleBooks } from '../Utils/API';
import { GetSavedBookIds, SaveBookIds } from '../Utils/LocalStorage';

const SearchBooks = () => {
    const [SearchedBooks, SetSearchedBooks] = useState([]);
    const [SearchInput, SetSearchInput] = useState('');
    const [SavedBookIds, SetSavedBookIds] = useState(GetSavedBookIds());

    useEffect(() => {
        return () => SaveBookIds(SavedBookIds);
    });

    const HandleFormSubmit = async (Event) => {
        Event.preventDefault();

        if (!SearchInput) {
            return false;
        }

        try {
            const Response = await SearchGoogleBooks(SearchInput);

            if (!Response.ok) {
                throw new Error('Something Went Wrong!');
            }

            const { Items } = await Response.json();

            const BookData = Items.map((Book) => ({
                BookId: Book.id,
                Authors: Book.VolumeInfo.Authors || ['No Author To Display'],
                title: Book.VolumeInfo.Title,
                Description: Book.VolumeInfo.Description,
                Image: Book.VolumeInfo.ImageLinks?.Thumbnail || '',
            }));

            SetSearchedBooks(BookData);
            SetSearchInput('');
        } catch (Err) {
            console.error(Err);
        }
    };

    const HandleSaveBook = async (BookId) => {
        const BookToSave = SearchedBooks.find((Book) => Book.BookId === BookId);

        const Token = Auth.LoggedIn() ? Auth.GetToken() : null;

        if (!Token) {
            return false;
        }

        try {
            const Response = await SaveBook(BookToSave, Token);

            if (!Response.ok) {
                throw new Error('Something Went Wrong!');
            }

            SetSavedBookIds([...SavedBookIds, BookToSave.BookId]);
        } catch (Err) {
            console.error(Err);
        }
    };

    return (
        <>
            <div className='text-light bg-dark p-5'>
                <Container>
                    <h1>Search For Books!</h1>
                    <Form onSubmit={HandleFormSubmit}>
                        <Row>
                            <Col xs={12} md={8}>
                                <Form.Control
                                    name='SearchInput'
                                    value={SearchInput}
                                    onChange={(Event) => SetSearchInput(Event.target.value)}
                                    type='text'
                                    size='lg'
                                    placeholder='Search For A Book'
                                />
                            </Col>

                            <Col xs={12} md={4}>
                                <Button type='submit' variant='success' size='lg'>
                                    Submit The Search
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </div>

            <Container>
                <h2 className='pt-5'>
                    {SearchedBooks.length
                        ? `Viewing ${SearchedBooks.length} Results`
                        : 'Search For A Book To Begin'}
                </h2>
                <Row>
                    {SearchedBooks.map((Book) => {
                        return (
                            <Col md='4' key={Book.BookId}>
                                <Card border='dark'>
                                    {Book.Image ? (
                                        <Card.Img src={Book.Image} alt={`The Cover For ${Book.Title}`} variant='top' />
                                    ) : null}
                                    <Card.Body>
                                        <Card.Title>{Book.Title}</Card.Title>
                                        <p className='Small'>Authors: {Book.Authors}</p>
                                        <Card.Text>{Book.Description}</Card.Text>
                                        {Auth.LoggedIn() && (
                                            <Button
                                                disabled={SavedBookIds?.some((SavedBookId) => SavedBookId === Book.BookId)}
                                                className='btn-block btn-info'
                                                onClick={() => HandleSaveBook(Book.BookId)}>
                                                    {SavedBookIds?.some((SavedBookId) => SavedBookId === Book.BookId)
                                                        ? 'This Book Has Already Been Saved!'
                                                        : 'Save This Book!'}
                                            </Button>
                                        )}
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

export default SearchBooks;