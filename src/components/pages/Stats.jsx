import { useCallback, useEffect, useState } from "react";
import { useAuthInfo } from "../../context/AuthContext";

export default function Stats() {
  const [performances, setPerformances] = useState([]);
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState("");
  const [goalsScored, setGoalsScored] = useState("");
  const [assists, setAssists] = useState("");
  const [yellowCards, setYellowCards] = useState("");
  const [redCards, setRedCards] = useState("");
  const { userInfo } = useAuthInfo();
  const isAdmin = userInfo?.user.role === "admin";

  const fetchPerformances = useCallback(() => {
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

  const handleAddPerformanceCard = () => {
    const body = {
      player_id: selectedPlayer,
      goals_scored: goalsScored,
      assists: assists,
      yellow_cards: yellowCards,
      red_cards: redCards,
    };

    addPerformanceCard(body);

    setSelectedPlayer("");
    setGoalsScored("");
    setAssists("");
    setYellowCards("");
    setRedCards("");
  };

  useEffect(() => {
    fetchPerformances();
    fetchPlayers();
  }, [userInfo, fetchPerformances, fetchPlayers]);

  const body = {
    player_id: selectedPlayer,
    goals_scored: goalsScored,
    assists: assists,
    yellow_cards: yellowCards,
    red_cards: redCards,
  };

  const addPerformanceCard = () => {
    console.log("selectedPlayer:", selectedPlayer);
    console.log("goalsScored:", goalsScored);
    console.log("assists:", assists);
    console.log("yellowCards:", yellowCards);
    console.log("redCards:", redCards);
    fetch("http://localhost:8086/performance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        auth: String(userInfo.auth_token),
      },

      body: JSON.stringify(body),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to add performance record");
        }
        fetchPlayers();
      })
      .catch((error) => {
        console.error("Error adding performance record:", error);
      });
  };

  const handleDeletePerformance = (performanceId) => {
    fetch(`http://localhost:8086/performance/delete/${performanceId}`, {
      method: "DELETE",
      headers: {
        auth: String(userInfo.auth_token),
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to delete performance record");
        }
        setPerformances((prevPerformances) =>
          prevPerformances.filter(
            (performance) => performance.performance_id !== performanceId
          )
        );
      })
      .catch((error) => {
        console.error("Error deleting performance record:", error);
      });
  };

  return (
    <div className="stats-page" page-container>
      <h1>Stats Table</h1>

      <div>
        {isAdmin && (
          <form>
            <select
              value={selectedPlayer}
              onChange={(e) => setSelectedPlayer(e.target.value)}
            >
              <option value="">Select Player</option>
              {players.map((player) => (
                <option key={player.player_id} value={player.player_id}>
                  {`${player.first_name} ${player.last_name}`}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={goalsScored}
              onChange={(e) => setGoalsScored(e.target.value)}
              placeholder="Goals Scored"
            />
            <input
              type="text"
              value={assists}
              onChange={(e) => setAssists(e.target.value)}
              placeholder="Assists"
            />
            <input
              selected={yellowCards}
              onChange={(date) => setYellowCards(date)}
              placeholder="Yellow Cards"
            />
            <input
              value={redCards}
              onChange={(e) => setRedCards(e.target.value)}
              placeholder="Red Cards"
            />

            <button type="button" onClick={handleAddPerformanceCard}>
              Add Record
            </button>
          </form>
        )}
      </div>

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
              {isAdmin && (
                <button
                  onClick={() =>
                    handleDeletePerformance(performance.performance_id)
                  }
                >
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
