import { useEffect, useState } from "react";
import { useAuthInfo } from "../../context/AuthContext";

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const { userInfo } = useAuthInfo();

  useEffect(() => {
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
      <div className="teams-list">
        {teams.map((teams) => (
          <div key={teams.team_id} className="team-item">
            <div>
              <img src={teams.photo} alt="team-logo" />
            </div>
            <div className="team-details">
              <p>Team Name: {teams.team_name}</p>
              <p>Location: {teams.location}</p>
              <p>Stadium Name: {teams.stadium_name}</p>
              <p>Manager: {teams.manager_id}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
