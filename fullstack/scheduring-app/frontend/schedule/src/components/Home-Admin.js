import React, { useState, useEffect } from 'react';

const HomeAdmin = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/users');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUsers(data.users || []); // Set users or an empty array if data.users is undefined
      } catch (error) {
        console.error('Error fetching users:', error);
        setError(error.message);
      }
    };

    fetchUsers();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="home-admin">
      <h1>Home Admin</h1>
      <h2>Available Users</h2>
      <ul>
        {users.length > 0 ? (
          users.map(user => (
            <li key={user._id}>
              {user.username} - {user.email}
            </li>
          ))
        ) : (
          <li>No users found</li>
        )}
      </ul>
    </div>
  );
};

export default HomeAdmin;
