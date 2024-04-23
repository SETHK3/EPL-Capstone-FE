import React, { useState, useEffect } from "react";

import { useAuthInfo } from "../../context/AuthContext";

export default function Managers() {
  const [managers, setManagers] = useState([]);
  const [filterManagers, setFilterManagers] = useState([]);
  const { userInfo } = useAuthInfo();

  useEffect(() => {
    console.log(userInfo);
    fetch("http://localhost:8086/managers", {
      headers: {
        auth: String(userInfo.auth_token),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setManagers(data.results || []);
        setFilterManagers(data.results || []);
      })
      .catch((error) => {
        console.error("Error fetching managers:", error);
      });
  }, []);

  const handleFilterByActive = () => {
    const activeManagers = managers.filter((manager) => manager.active);
    setFilterManagers(activeManagers);
  };

  const handleSortAlphabetically = () => {
    const sortedManagers = [...managers].sort((a, b) =>
      a.manager_name.localeCompare(b.manager_name)
    );
    setFilterManagers(sortedManagers);
  };

  return (
    <div>
      <h1>All Managers</h1>
      <div>
        <button onClick={handleFilterByActive}>Filter by Active</button>
        <button onClick={handleSortAlphabetically}>Sort Alphabetically</button>
      </div>
      <ul>
        {filterManagers.map((manager) => (
          <li key={manager.manager_id}>
            <div>
              <img src={manager.photo} alt="Manager" />
            </div>
            <div>
              <p>Name: {manager.manager_name}</p>
              <p>Nationality: {manager.nationality}</p>
              <p>Date of Birth: {manager.date_of_birth}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
