import React, { useState } from 'react';

const Authenticate = ({ token }) => {
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [username, setUsername] = useState(null); // Add username state to hold the authenticated username

  const handleClick = async () => {
    try {
      const response = await fetch('https://fsa-jwt-practice.herokuapp.com/authenticate', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
        },
      });

      const result = await response.json();

      if (result.success) {
        setSuccessMessage(result.message);
        setUsername(result.data.username); // Store the username from the data property
      } else {
        setError(result.message || 'Authentication failed');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="authenticate-container">
      <h2>Authenticate</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {username && <p>Welcome, {username}!</p>} {/* Display the username */}
      <button onClick={handleClick}>Authenticate Token</button>
    </div>
  );
};

export default Authenticate;
