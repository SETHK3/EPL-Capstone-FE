import React, { useEffect, useState } from "react";
import { useAuthInfo } from "../../context/AuthContext";

export default function Players() {
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
        {players.length === 0 ? (
          <p>Loading...</p>
        ) : (
          players.map((player) => (
            <div key={player.player_id} className="player-item">
              <div>
                <img src={player.photo} alt="player" />
              </div>
              <div className="player-details">
                <p>First Name: {player.first_name}</p>
                <p>Last Name: {player.last_name}</p>
                <p>Nationality: {player.nationality}</p>
                <p>Date of Birth: {player.date_of_birth}</p>
                <p>Position: {player.position}</p>
                <p>Team: {player.team.team_name}</p>
                <p>Active: {player.active}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
