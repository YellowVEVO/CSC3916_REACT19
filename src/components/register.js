import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { submitRegister } from '../actions/authActions'; // Ensure this imports the correct action
import { Form, Button, Alert, Spinner } from 'react-bootstrap';

function Register() {
    const [details, setDetails] = useState({
        name: '',
        username: '',
        password: ''
    });

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const updateDetails = (event) => {
        setDetails({
          ...details,
          [event.target.id]: event.target.value
        });
    };

    const register = (event) => {
        event.preventDefault(); // Prevent form default action (page refresh)
        
        // Validate form inputs
        if (!details.name || !details.username || !details.password) {
            setError('Please fill in all fields');
            return;
        }

        setLoading(true);
        setError(null); // Reset error message

        // Dispatch the register action
        dispatch(submitRegister(details))
            .then(() => {
                // Success - Redirect user or show success message
                setLoading(false);
            })
            .catch((err) => {
                // Handle error (e.g., username already exists)
                setLoading(false);
                setError(err.response?.data?.message || 'Something went wrong.');
            });
    };

    return (
        <div className="register-container">
            <Form onSubmit={register} className='register-form bg-dark text-light p-4 rounded'>
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                        onChange={updateDetails} 
                        value={details.name} 
                        type="text" 
                        placeholder="Name" 
                    />
                </Form.Group>

                <Form.Group controlId="username">
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                        onChange={updateDetails} 
                        value={details.username} 
                        autoComplete="username" 
                        type="email" 
                        placeholder="Enter email" 
                    />
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        onChange={updateDetails} 
                        value={details.password} 
                        autoComplete="current-password" 
                        type="password" 
                        placeholder="Password" 
                    />
                </Form.Group>

                {/* Show error message if any */}
                {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

                {/* Display loading spinner if request is in progress */}
                <Button type="submit" className="mt-3" disabled={loading}>
                    {loading ? (
                        <Spinner animation="border" size="sm" />
                    ) : (
                        'Register'
                    )}
                </Button>
            </Form>
        </div>
    );
}

export default Register;