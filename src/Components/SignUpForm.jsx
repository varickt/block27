import React, { useState } from 'react';

const SignUpForm = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [validationError, setValidationError] = useState(null); // Validation error state

  const validateForm = () => {
    if (username.length < 8) {
      return "Username must be at least 8 characters long";
    }
    if (password.length < 6) {
      return "Password must be at least 6 characters long";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setValidationError(null);

    const validationMessage = validateForm();
    if (validationMessage) {
      setValidationError(validationMessage); // Display validation error
      return;
    }

    try {
      const response = await fetch('https://fsa-jwt-practice.herokuapp.com/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setToken(result.token);
      } else {
        setError(result.message || 'Something went wrong');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {validationError && <p style={{ color: 'orange' }}>{validationError}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SignUpForm;
