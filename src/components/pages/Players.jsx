import React, { useCallback, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAuthInfo } from "../../context/AuthContext";

export default function Players() {
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const { userInfo } = useAuthInfo();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nationality, setNationality] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [position, setPosition] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");

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

  const handleAddPlayer = () => {
    const body = {
      first_name: firstName,
      last_name: lastName,
      nationality: nationality,
      date_of_birth: dateOfBirth,
      position: position,
      team_id: selectedTeam,
    };

    addPlayer(body);

    setFirstName("");
    setLastName("");
    setNationality("");
    setDateOfBirth("");
    setPosition("");
    setSelectedTeam("");
  };

  useEffect(() => {
    fetchPlayers();
    fetchTeams();
  }, [userInfo, fetchPlayers, fetchTeams]);

  const body = {
    first_name: firstName,
    last_name: lastName,
    nationality: nationality,
    date_of_birth: dateOfBirth,
    position: position,
    team_id: selectedTeam,
  };

  const addPlayer = () => {
    fetch("http://localhost:8086/player", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        auth: String(userInfo.auth_token),
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to add player");
        }
        fetchPlayers();
      })
      .catch((error) => {
        console.error("Error adding player:", error);
      });
  };

  return (
    <div className="players-page" page-container>
      <h1>Players Table</h1>

      <div>
        <form>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
          />
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
          />
          <input
            type="text"
            value={nationality}
            onChange={(e) => setNationality(e.target.value)}
            placeholder="Nationality"
          />
          <DatePicker
            selected={dateOfBirth}
            onChange={(date) => setDateOfBirth(date)}
            placeholderText="Date of Birth"
          />
          <select
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            placeholder="Position"
          >
            <option value="">Select Position</option>
            <option value="Forward">Forward</option>
            <option value="Midfield">Midfield</option>
            <option value="Defence">Defence</option>
          </select>
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
          <button type="button" onClick={handleAddPlayer}>
            Add Player
          </button>
        </form>
      </div>

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
