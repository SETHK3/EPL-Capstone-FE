import teamLogo from "../../assets/images/epl-team-logo.jpeg";
import { useCallback, useEffect, useState } from "react";
import { useAuthInfo } from "../../context/AuthContext";

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [managers, setManagers] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [location, setLocation] = useState("");
  const [stadiumName, setStadiumName] = useState("");
  const [selectedManager, setSelectedManager] = useState("");
  const { userInfo } = useAuthInfo();
  const isAdmin = userInfo?.user.role === "admin";

  const fetchTeams = useCallback(() => {
    fetch("http://localhost:8086/teams", {
      headers: {
        auth: String(userInfo.auth_token),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTeams(data.results || []);
      })
      .catch((error) => {
        console.error("Error fetching teams:", error);
      });
  }, [userInfo]);

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

  const handleAddTeam = () => {
    const body = {
      team_name: teamName,
      location: location,
      stadium_name: stadiumName,
      manager_id: selectedManager,
    };

    addTeam(body);

    setTeamName("");
    setLocation("");
    setStadiumName("");
    setSelectedManager("");
  };

  useEffect(() => {
    fetchManagers();
    fetchTeams();
  }, [userInfo, fetchTeams, fetchManagers]);

  const body = {
    team_name: teamName,
    location: location,
    stadium_name: stadiumName,
    manager_id: selectedManager,
  };

  const addTeam = () => {
    fetch("http://localhost:8086/team", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        auth: String(userInfo.auth_token),
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to add team");
        }
        fetchTeams();
      })
      .catch((error) => {
        console.error("Error adding team:", error);
      });
  };

  const handleDeleteTeam = (teamId) => {
    fetch(`http://localhost:8086/team/delete/${teamId}`, {
      method: "DELETE",
      headers: {
        auth: String(userInfo.auth_token),
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to delete team record");
        }
        setTeams((prevTeams) =>
          prevTeams.filter((team) => team.team_id !== teamId)
        );
      })
      .catch((error) => {
        console.error("Error deleting team record:", error);
      });
  };

  return (
    <div className="teams-page" page-container>
      <h1>Teams Table</h1>

      <div className="teams-content-wrapper">
        <div className="teams-table">
          <table>
            <thead>
              <tr>
                <th>Club</th>
                <th>MP</th>
                <th>W</th>
                <th>D</th>
                <th>L</th>
                <th>GF</th>
                <th>GA</th>
                <th>GD</th>
                <th>Pts</th>
              </tr>
            </thead>
            <tbody>{}</tbody>
          </table>
        </div>
      </div>

      <div>
        {isAdmin && (
          <form>
            <input
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="Team Name"
            />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
            />
            <input
              type="text"
              value={stadiumName}
              onChange={(e) => setStadiumName(e.target.value)}
              placeholder="Stadium Name"
            />
            <select
              value={selectedManager}
              onChange={(e) => setSelectedManager(e.target.value)}
            >
              <option value="">Select Manager</option>
              {managers.map((manager) => (
                <option key={manager.manager_id} value={manager.manager_id}>
                  {manager.manager_name}
                </option>
              ))}
            </select>
            <button type="button" onClick={handleAddTeam}>
              Add Team
            </button>
          </form>
        )}
      </div>

      <div className="teams-list">
        {teams.map((teams) => (
          <div key={teams.team_id} className="team-item">
            <div>
              <img src={teamLogo} alt="team-logo" />
            </div>
            <div className="team-details">
              <p>Team Name: {teams.team_name}</p>
              <p>Location: {teams.location}</p>
              <p>Stadium Name: {teams.stadium_name}</p>
              <p>Manager: {teams.manager.manager_name}</p>
              {isAdmin && (
                <button onClick={() => handleDeleteTeam(teams.team_id)}>
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
