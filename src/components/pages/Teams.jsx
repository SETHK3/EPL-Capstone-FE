import { useEffect, useState } from "react";

export default function Teams() {
  const [teamsData, setTeamsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch();
        if (!response.ok) {
          throw new Error("Failed to fetch team data");
        }
        const teamData = await response.json();
        setTeamsData(teamData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

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
    </div>
  );
}
