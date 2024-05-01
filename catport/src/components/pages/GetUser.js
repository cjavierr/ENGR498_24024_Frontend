import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios

function GetUser() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    if (!username) return; // Skip request if username is empty

    try {
      console.log("attempting to make post request");
      const response = await axios.post('https://24024be.vercel.app/api/getUser', {
        username: username, // Send username in request body
      });
      console.log(response);
      setUserData(response.data); // Access data from response
      setError(null);
    } catch (error) {
      console.error('Error:', error);
      setError(error.message || 'An error occurred.'); // Handle potential errors
    }
  };

  useEffect(() => {
    fetchData();
  }, [username]); // Re-run on username change

  const handleChange = (event) => {
    setUsername(event.target.value);
  };

  return (
    <div>
      <input type="text" placeholder="Username" value={username} onChange={handleChange} />
      <button onClick={fetchData}>Fetch Data</button>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {userData ? (
        <pre>{JSON.stringify(userData, null, 2)}</pre>
      ) : (
        <p>Enter a username and click "Fetch Data".</p>
      )}
    </div>
  );
}

export default GetUser;
