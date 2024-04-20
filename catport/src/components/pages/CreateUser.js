import React, { useState } from 'react';
import axios from 'axios';

function CreateUser() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/api/newuser', {
        userName: username,
        password: password,
        firstName: firstName,
        lastName: lastName,
        email: email,
      });

      setSuccessMessage(response.data.message);
      setError(null); // Clear any previous errors

      // Optionally clear form fields after successful submission
      setUsername('');
      setPassword('');
      setFirstName('');
      setLastName('');
      setEmail('');
    } catch (error) {
      console.error('Error creating user:', error);
      setError('Failed to create user. Please check your details and try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields for username, password, firstName, lastName, and email */}
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
      <div>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

      <button type="submit">Create Account</button>
    </form>
  );
}

export default CreateUser;
