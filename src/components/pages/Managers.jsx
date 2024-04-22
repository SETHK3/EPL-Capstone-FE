import React, { useState, useEffect } from "react";

export default function Managers() {
  const [managers, setManagers] = useState([]);
  const [activeManagers, setActiveManagers] = useState([]);
  const [selectedManager, setSelectedManager] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8086/managers")
      .then((response) => response.json())
      .then((data) => {
        setManagers(data.results || []);
      })
      .catch((error) => {
        console.error("Error fetching managers:", error);
      });

    fetch("http://localhost:8086/managers/active")
      .then((response) => response.json())
      .then((data) => {
        setActiveManagers(data.results || []);
      })
      .catch((error) => {
        console.error("Error fetching active managers:", error);
      });
  }, []);

  const handleManagerClick = (managerId) => {
    fetch(`http://localhost:8086/manager/${managerId}`)
      .then((response) => response.json())
      .then((data) => {
        setSelectedManager(data.manager);
      })
      .catch((error) => {
        console.error("Error fetching manager details:", error);
      });
  };

  return (
    <div>
      <h1>All Managers</h1>
      <ul>
        {managers.map((manager) => (
          <li
            key={manager.manager_id}
            onClick={() => handleManagerClick(manager.manager_id)}
          >
            {manager.manager_name} - {manager.nationality}
          </li>
        ))}
      </ul>

      <h1>Active Managers</h1>
      <ul>
        {activeManagers.map((manager) => (
          <li
            key={manager.manager_id}
            onClick={() => handleManagerClick(manager.manager_id)}
          >
            {manager.manager_name} - {manager.nationality}
          </li>
        ))}
      </ul>

      {selectedManager && (
        <div>
          <h2>Selected Manager Details</h2>
          <p>Name: {selectedManager.manager_name}</p>
          <p>Nationality: {selectedManager.nationality}</p>
          <p>Date of Birth: {selectedManager.date_of_birth}</p>
        </div>
      )}
    </div>
  );
}
