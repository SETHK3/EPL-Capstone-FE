import { useEffect, useState } from "react";
import { useAuthInfo } from "../../context/AuthContext";

export default function players() {
  const [players, setPlayers] = useState([]);
  const { userInfo } = useAuthInfo();

  useEffect(() => {
    fetch("http://localhost:8086/players", {
      headers: {
        auth: String(userInfo.auth_token),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPlayers(data.results || []);
      })
      .catch((error) => {
        console.error("Error fetching players:", error);
      });
  }, [userInfo]);

  return (
    <div className="players-page" page-container>
      <h1>Players Table</h1>
      <div className="players-list">
        {players.map((players) => (
          <div key={players.player_id} className="player-item">
            <div>
              <img src={players.photo} alt="player-logo" />
            </div>
            <div className="player-details">
              <p>First Name: {players.first_name}</p>
              <p>Last Name: {players.last_name}</p>
              <p>Nationality: {players.nationality}</p>
              <p>Date of Birth: {players.date_of_birth}</p>
              <p>Position: {players.position}</p>
              <p>Team: {players.team}</p>
              <p>Active: {players.active}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
