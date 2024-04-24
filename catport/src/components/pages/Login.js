import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      setIsLoggedIn(true);
      setUsername(localStorage.getItem('loggedInUser'));
    }
  }, []); // Empty dependency array to run only on initial render

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:3001/api/login', {
        username: username,
        password: password
      },{
        withCredentials: true
      });
  
      console.log(response.data.success);
      localStorage.setItem('loggedInUser', username); // Store username in localStorage
      if (response.data.success) {
        console.log("Setting Token");
        console.log("Username before setting in local storage:", username); // Add this line
        localStorage.setItem('loggedInUser', username); // Store username in localStorage
        console.log(localStorage.getItem('loggedInUser'));
        setIsLoggedIn(true);
        setError(null);
      } else {
        setError('Invalid username or password.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('An error occurred. Please try again.');
    }
  };
  

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setIsLoggedIn(false);
  };

  return (
    <div>
      {isLoggedIn ? (
        <>
          <h2>Welcome, {username}!</h2>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
      )}
    </div>
  );
}

export default Login;
