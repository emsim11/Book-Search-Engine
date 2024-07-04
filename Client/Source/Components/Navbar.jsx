import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Modal, Nav, Navbar, Tab } from 'react-bootstrap';

import SignUpForm from './SignUpForm';
import LoginForm from './LoginForm';
import Auth from '../Utils/Auth';

const Navigation = () => {
    // Set Modal Display State
    const [ShowModal, SetShowModal] = useState(false);

    return (
        <>
            <Navbar bg='dark' variant='dark' expand='lg'>
                <Container fluid>
                    <Navbar.Brand as={Link} to='/'>
                        Google Books Search
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls='navbar' />
                    <Navbar.Collapse id='navbar' className='d-flex flex-row-reverse'>
                        <Nav className='ml-auto d-flex'>
                            <Nav.Link as={Link} to='/'>
                                Search For Books
                            </Nav.Link>
                            {/* If User Is Logged In, Show Saved Books And Logout */}
                            {Auth.LoggedIn() ? (
                                <>
                                    <Nav.Link as={Link} to='/Saved'>
                                        View Your Library
                                    </Nav.Link>
                                    <Nav.Link onClick={Auth.Logout}>Logout</Nav.Link>
                                </>
                            ) : (
                                <Nav.Link onClick={() => SetShowModal(true)}>Login or Sign Up</Nav.Link>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Set Modal Data Up */}
            <Modal
                size='lg'
                show={ShowModal}
                onHide={() => SetShowModal(false)}
                aria-labelledby='SignUp-Modal'>
                    <Tab.Container defaultActiveKey='Login'>
                        <Modal.Header closeButton>
                            <Modal.Title id='SignUp-Modal'>
                                <Nav variant='pills'>
                                    <Nav.Item>
                                        <Nav.Link eventKey='Login'>Login</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey='SignUp'>Sign Up</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <Tab.Content>
                                <Tab.Pane eventKey='Login'>
                                    <LoginForm HandleModalClose={() => SetShowModal(false)} />
                                </Tab.Pane>
                                <Tab.Pane eventKey='SignUp'>
                                    <SignUpForm HandleModalClose={() => SetShowModal(false)} />
                                </Tab.Pane>
                            </Tab.Content>
                        </Modal.Body>
                    </Tab.Container>
                </Modal>
        </>
    );
}

export default Navigation;