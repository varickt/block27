import React, { useState } from 'react';
import SignUpForm from './Components/SignUpForm';
import Authenticate from './Components/Authenticate';
import './App.css'; // Import the CSS

const App = () => {
  const [token, setToken] = useState(null);

  return (
    <div>
      <SignUpForm setToken={setToken} />
      <Authenticate token={token} />
    </div>
  );
};

export default App;
