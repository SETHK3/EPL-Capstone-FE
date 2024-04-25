import React, { useState, useEffect, useCallback } from "react";

import managerLogo from "../../assets/images/football_manager.webp";
import { useAuthInfo } from "../../context/AuthContext";

export default function Managers() {
  const [managers, setManagers] = useState([]);
  const { userInfo } = useAuthInfo();
  const [managerName, setManagerName] = useState("");
  const [nationality, setNationality] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const isAdmin = userInfo?.user.role === "admin";

  const fetchManagers = useCallback(() => {
    fetch("http://localhost:8086/managers", {
      headers: {
        auth: String(userInfo.auth_token),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setManagers(data.results || []);
      })
      .catch((error) => {
        console.error("Error fetching managers:", error);
      });
  }, [userInfo]);

  const handleAddManager = () => {
    const body = {
      manager_name: managerName,
      nationality: nationality,
      date_of_birth: dateOfBirth,
    };

    addManager(body);

    setManagerName("");
    setNationality("");
    setDateOfBirth("");
  };

  useEffect(() => {
    fetchManagers();
  }, [userInfo, fetchManagers]);

  const body = {
    manager_name: managerName,
    nationality: nationality,
    date_of_birth: dateOfBirth,
  };

  const addManager = () => {
    fetch("http://localhost:8086/manager", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        auth: String(userInfo.auth_token),
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to add manager");
        }
        fetchManagers();
      })
      .catch((error) => {
        console.error("Error adding manager:", error);
      });
  };

  const handleDeleteManager = (managerId) => {
    fetch(`http://localhost:8086/manager/delete/${managerId}`, {
      method: "DELETE",
      headers: {
        auth: String(userInfo.auth_token),
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to delete manager record");
        }
        setManagers((prevManagers) =>
          prevManagers.filter((manager) => manager.manager_id !== managerId)
        );
      })
      .catch((error) => {
        console.error("Error deleting manager record:", error);
      });
  };

  return (
    <div className="managers-page" page-container>
      <h1>All Managers</h1>

      <div>
        {isAdmin && (
          <form>
            <input
              type="text"
              value={managerName}
              onChange={(e) => setManagerName(e.target.value)}
              placeholder="Manager Name"
            />
            <input
              type="text"
              value={nationality}
              onChange={(e) => setNationality(e.target.value)}
              placeholder="Nationality"
            />
            <input
              type="text"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              placeholder="Date of Birth"
            />
            <button type="button" onClick={handleAddManager}>
              Add Manager
            </button>
          </form>
        )}
      </div>

      <div className="manager-list">
        {managers.map((manager) => (
          <div key={manager.manager_id} className="manager-item">
            <div>
              <img src={managerLogo} alt="manager" />
            </div>
            <div className="manager-details">
              <p>Name: {manager.manager_name}</p>
              <p>Nationality: {manager.nationality}</p>
              <p>Date of Birth: {manager.date_of_birth}</p>
              {isAdmin && (
                <button onClick={() => handleDeleteManager(manager.manager_id)}>
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
