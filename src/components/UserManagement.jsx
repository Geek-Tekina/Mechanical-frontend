import React, { useEffect, useState } from "react";
import API from "../api";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const fetchUsers = () => {
    API.get("/users").then((res) => setUsers(res.data));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    await API.post("/users", newUser);
    setNewUser({ name: "", email: "", password: "", role: "user" });
    fetchUsers();
  };

  const handleDelete = async (id) => {
    await API.delete(`/users/${id}`);
    fetchUsers();
  };

  return (
    <div>
      <h3>Manage Users</h3>
      {users.map((u) => (
        <div key={u._id}>
          {u.name} ({u.email}){" "}
          <button onClick={() => handleDelete(u._id)}>Delete</button>
        </div>
      ))}

      <h4>Add New User</h4>
      <form onSubmit={handleCreate}>
        <input
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          placeholder="Name"
        />
        <input
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          placeholder="Email"
        />
        <input
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          placeholder="Password"
          type="password"
        />
        <select
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Register User</button>
      </form>
    </div>
  );
};

export default UserManagement;
