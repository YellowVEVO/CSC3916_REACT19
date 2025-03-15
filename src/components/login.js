import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Import useSelector to get error state from Redux
import { submitLogin } from '../actions/authActions';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

function Login() {
  const [details, setDetails] = useState({
    username: '',
    password: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading } = useSelector(state => state.auth); // Get error and loading from Redux state

  const updateDetails = (event) => {
    setDetails({
      ...details,
      [event.target.id]: event.target.value,
    });
  };

  const login = (event) => {
    event.preventDefault(); // Prevent form from refreshing the page

    // Basic validation to check if fields are not empty
    if (!details.username || !details.password) {
      alert('Please fill out both fields.');
      return;
    }

    dispatch(submitLogin(details));
  };

  // If login is successful, navigate to the homepage or dashboard
  const handleRedirect = () => {
    if (loading === false && !error) {
      navigate('/home'); // You can replace '/home' with the desired path
    }
  };

  React.useEffect(() => {
    handleRedirect();
  }, [loading, error]); // Redirect if login is successful and no error

  return (
    <div className="login-container">
      <Form onSubmit={login} className="login-form bg-dark text-light p-4 rounded">
        <Form.Group controlId="username" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            autoComplete="username"
            value={details.username}
            onChange={updateDetails}
          />
        </Form.Group>

        <Form.Group controlId="password" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            value={details.password}
            onChange={updateDetails}
          />
        </Form.Group>

        {/* Show loading spinner while the request is in progress */}
        {loading ? (
          <Button variant="secondary" disabled>
            <Spinner animation="border" size="sm" />
            {' '}Logging In...
          </Button>
        ) : (
          <Button type="submit">Sign in</Button>
        )}

        {/* Display error message if login fails */}
        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
      </Form>
    </div>
  );
}

export default Login;
