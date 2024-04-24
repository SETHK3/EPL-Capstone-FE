import React, { useState, useEffect } from "react";

import { useAuthInfo } from "../../context/AuthContext";

export default function Managers() {
  const [managers, setManagers] = useState([]);
  const [filterManagers, setFilterManagers] = useState([]);
  const [activeManagers, setActiveManagers] = useState([]);
  const { userInfo } = useAuthInfo();

  useEffect(() => {
    fetch("http://localhost:8086/managers", {
      headers: {
        auth: String(userInfo.auth_token),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setManagers(data.results || []);
        setFilterManagers(data.results || []);
      })
      .catch((error) => {
        console.error("Error fetching managers:", error);
      });
  }, [userInfo]);

  const filterByActive = () => {
    fetch("http://localhost:8086/managers/active", {
      headers: {
        auth: String(userInfo.auth_token),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setActiveManagers(data.results || []);
      })
      .catch((error) => {
        console.error("Error fetching active managers:", error);
      });
  };

  const handleSortAlphabetically = () => {
    const sortedManagers = [...managers].sort((a, b) =>
      a.manager_name.localeCompare(b.manager_name)
    );
    setFilterManagers(sortedManagers);
  };

  return (
    <div className="managers-page" page-container>
      <h1>All Managers</h1>
      <div>
        <button onClick={filterByActive}>Filter by Active</button>
        <button onClick={handleSortAlphabetically}>Sort Alphabetically</button>
      </div>
      <div className="manager-list">
        {filterManagers.map((manager) => (
          <div key={manager.manager_id} className="manager-item">
            <div>
              <img src={manager.photo} alt="manager" />
            </div>
            <div className="manager-details">
              <p>Name: {manager.manager_name}</p>
              <p>Nationality: {manager.nationality}</p>
              <p>Date of Birth: {manager.date_of_birth}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
