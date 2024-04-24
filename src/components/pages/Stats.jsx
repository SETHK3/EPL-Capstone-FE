import { useEffect, useState } from "react";
import { useAuthInfo } from "../../context/AuthContext";

export default function Stats() {
  const [performances, setPerformances] = useState([]);
  const { userInfo } = useAuthInfo();

  useEffect(() => {
    fetch("http://localhost:8086/performances", {
      headers: {
        auth: String(userInfo.auth_token),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPerformances(data.results || []);
      })
      .catch((error) => {
        console.error("Error fetching performance records:", error);
      });
  }, [userInfo]);

  return (
    <div className="stats-page" page-container>
      <h1>Stats Table</h1>

      <div className="stats-list">
        {performances.map((performance) => (
          <div key={performance.performance_id} className="stat-item">
            <div className="stat-details">
              <p>
                Player:{" "}
                {`${performance.player.first_name} ${performance.player.last_name}`}
              </p>
              <p>Goals Scored: {performance.goals_scored}</p>
              <p>Assists: {performance.assists}</p>
              <p>Yellow Cards: {performance.yellow_cards}</p>
              <p>Red Cards: {performance.red_cards}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
