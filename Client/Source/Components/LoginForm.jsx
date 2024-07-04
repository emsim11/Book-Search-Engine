// New Import For Refactor
import { useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';

import Auth from '../Utils/Auth';
import { LOGIN_USER } from '../Utils/Mutations';

const LoginForm = () => {
    const [UserFormData, SetUserFormData] = useState({
        Email: '',
        Password: '',
    });
    const [Validated] = useState(false);
    const [ShowAlert, SetShowAlert] = useState(false);
    const [LoginUser, { Error }] = useMutation(LOGIN_USER);

    useEffect(() => {
        if (Error) {
            SetShowAlert(true);
        } else {
            SetShowAlert(false);
        }
    }, [Error]);

    const HandleInputChange = (Event) => {
        const { name, value } = Event.target;
        SetUserFormData({ ...UserFormData, [name]: value });
    };

    const HandleFormSubmit = async (Event) => {
        Event.preventDefault();

        // Validate Form Input Fields Have Been Filled Out
        const Form = Event.currentTarget;
        if (Form.CheckValidity() === false) {
            Event.preventDefault();
            Event.stopPropagation();
        }

        try {
            const Response = await LoginUser({
                variables: { ...UserFormData },
            });
            console.log(Response);
            Auth.Login(Response.data.Login.Token);
        } catch (Err) {
            console.error(Err);
            SetShowAlert(true);
        }

        SetUserFormData({
            Email: '',
            Password: '',
        });
    };

    return (
        <>
            <Form noValidate validated={Validated} onSubmit={HandleFormSubmit}>
                <Alert dismissible onClose={() => SetShowAlert(false)} show={ShowAlert} variant='danger'>
                    There was an issue with the provided login credentials!
                </Alert>

                <Form.Group className='mb-3'>
                    <Form.Label htmlFor='Email'>Email</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Email Address'
                        name='Email'
                        onChange={HandleInputChange}
                        value={UserFormData.Email}
                        required
                    />
                    <Form.Control.Feedback type='invalid'>Email is Required!</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Label htmlFor='Password'>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Password'
                        name='Password'
                        onChange={HandleInputChange}
                        value={UserFormData.Password}
                        required
                    />
                    <Form.Control.Feedback type='invalid'>Password is Required!</Form.Control.Feedback>
                </Form.Group>

                <Button
                    disabled={!(UserFormData.Email && UserFormData.Password)}
                    type='submit'
                    variant='success'
                >
                    Submit
                </Button>
            </Form>
        </>
    );
}

export default LoginForm;