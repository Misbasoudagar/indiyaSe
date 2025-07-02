import React, { useEffect, useState } from "react";
import axios from "axios";

const UserList = () => {
  const [users, setUsers] = useState([]); // default to empty array
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/users")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setUsers(res.data);
        } else {
          setError("Unexpected data format");
          setUsers([]);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch users", err);
        setError("Failed to load users");
      });
  }, []);

  return (
    <div>
      <h3>User Management</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Role</th>
            <th>Active</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => (
            <tr key={idx}>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.isActive ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
