// New Import For Refactor
import { useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import { Alert, Form, Button } from 'react-bootstrap';

// import { CreateUser } from '../Utils/API';
import Auth from '../Utils/Auth';
import { ADD_USER } from '../Utils/Mutations';

const SignUpForm = () => {
    // Set Initial Form State
    const [UserFormData, SetUserFormData] = useState({
        Username: '',
        Email: '',
        Password: '',
    });

    // Set State For Form Validation
    const [Validated] = useState(false);

    // Set State For Alert
    const [ShowAlert, SetShowAlert] = useState(false);

    const [AddUser, { Error }] = useMutation(ADD_USER);

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
            const { data } = await AddUser({
                variables: { ...UserFormData },
            });
            Auth.Login(data.AddUser.Token);
        } catch (Err) {
            console.error(Err);
            // SetShowAlert(true);
        };

        // Reset Form Fields
        SetUserFormData({
            Username: '',
            Email: '',
            Password: '',
        });
    };

    return (
        <>
            <Form noValidate validated={Validated} onSubmit={HandleFormSubmit}>
                {/* Show Alert If Server Response Is Bad */}
                <Alert dismissible onClose={() => SetShowAlert(false)} show={ShowAlert} variant='danger'>
                    An Issue Occurred While Processing The SignUp!
                </Alert>

                <Form.Group className='mb-3'>
                    <Form.Label htmlFor='Username'>Username</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Username'
                        name='Username'
                        onChange={HandleInputChange}
                        value={UserFormData.Username}
                        required
                    />
                    <Form.Control.Feedback type='invalid'>Username is Required!</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Label htmlFor='Email'>Email</Form.Label>
                    <Form.Control
                        type='Email'
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
                    disabled={!(UserFormData.Username && UserFormData.Email && UserFormData.Password)}
                    type='submit'
                    variant='success'
                >
                    Submit
                </Button>
            </Form>
        </>
    );
}

export default SignUpForm;