import React, { useState, useEffect } from "react";

const HomeAdmin = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [newUser, setNewUser] = useState({ username: "", email: "" });
  const [editingUser, setEditingUser] = useState(null);

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/users");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUsers(data || []);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError(error.message);
      }
    };

    fetchUsers();
  }, []);

  // Add new user
  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const addedUser = await response.json();
      setUsers([...users, addedUser]);
      setNewUser({ username: "", email: "" });
    } catch (error) {
      console.error("Error adding user:", error);
      setError(error.message);
    }
  };

  // Delete user
  const handleDeleteUser = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/users/${userId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
      setError(error.message);
    }
  };

  // Start editing user
  const handleEditUser = (user) => {
    setEditingUser(user);
  };

  // Update user
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/users/${editingUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editingUser),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedUser = await response.json();
      setUsers(
        users.map((user) => (user._id === updatedUser._id ? updatedUser : user))
      );
      setEditingUser(null);
    } catch (error) {
      console.error("Error updating user:", error);
      setError(error.message);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="home-admin">
      <h1>Home Admin</h1>
      <h2>Available Users</h2>
      <ul>
        {users.length > 0 ? (
          users.map((user) => (
            <li key={user._id}>
              <span>{user.username}</span>
              <br />
              <small>{user.email}</small>
              <br />
              <button onClick={() => handleEditUser(user)}>Edit</button>
              <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
            </li>
          ))
        ) : (
          <li>No users found</li>
        )}
      </ul>

      <h2>{editingUser ? "Edit User" : "Add New User"}</h2>
      <form onSubmit={editingUser ? handleUpdateUser : handleAddUser}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={editingUser ? editingUser.username : newUser.username}
          onChange={(e) =>
            editingUser
              ? setEditingUser({ ...editingUser, username: e.target.value })
              : setNewUser({ ...newUser, username: e.target.value })
          }
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={editingUser ? editingUser.email : newUser.email}
          onChange={(e) =>
            editingUser
              ? setEditingUser({ ...editingUser, email: e.target.value })
              : setNewUser({ ...newUser, email: e.target.value })
          }
          required
        />
        <button type="submit">
          {editingUser ? "Update User" : "Add User"}
        </button>
      </form>
    </div>
  );
};

export default HomeAdmin;
