import React, { useState, useEffect, useCallback } from "react";
import { useAuthInfo } from "../../context/AuthContext";

export default function Transfer() {
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");
  const { userInfo } = useAuthInfo();
  const isAdmin = userInfo?.user.role === "admin";

  const fetchPlayers = useCallback(() => {
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

  useEffect(() => {
    fetchPlayers();
    fetchTeams();
  }, [userInfo, fetchPlayers, fetchTeams]);

  const handleTransfer = () => {
    const body = {
      player_id: selectedPlayer,
      team_id: selectedTeam,
    };

    addTransfer(body);

    setSelectedPlayer("");
    setSelectedTeam("");
  };

  const body = {
    player_id: selectedPlayer,
    team_id: selectedTeam,
  };

  const addTransfer = () => {
    fetch("http://localhost:8086/transfer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        auth: String(userInfo.auth_token),
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to transfer player");
        }
      })
      .catch((error) => {
        console.error("Error transferring player:", error);
      });
  };

  return (
    <div>
      <h1>Transfer Portal</h1>
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/FQlBlMEmHOg?si=zYdKhYVkPdeClhC9"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
      {isAdmin && (
        <div>
          <div>
            <label>Select Player:</label>
            <select
              value={selectedPlayer}
              onChange={(e) => setSelectedPlayer(e.target.value)}
            >
              <option value="">Select Player</option>
              {players.map((player) => (
                <option key={player.player_id} value={player.player_id}>
                  {player.first_name} {player.last_name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Select Team:</label>
            <select
              value={selectedTeam}
              onChange={(e) => setSelectedTeam(e.target.value)}
            >
              <option value="">Select Team</option>
              {teams.map((team) => (
                <option key={team.team_id} value={team.team_id}>
                  {team.team_name}
                </option>
              ))}
            </select>
          </div>
          <button onClick={handleTransfer}>Transfer</button>
        </div>
      )}
    </div>
  );
}
