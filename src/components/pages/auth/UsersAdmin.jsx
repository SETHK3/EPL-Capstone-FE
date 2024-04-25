import React, { useState, useEffect } from "react";
import { useAuthInfo } from "../../../context/AuthContext";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const { userInfo } = useAuthInfo();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8086/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            auth: String(userInfo.auth_token),
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data.results);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [userInfo.auth_token]);

  return (
    <div className="admin-page">
      <h1>Admin Page</h1>
      <table className="users-table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Active</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.user_id}>
              <td>{user.user_id.slice(0, 8)}</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.active ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
