import { NavLink } from "react-router-dom";

import logo from "../../assets/images/epl-logo-2.png";

export default function NavBar() {
  return (
    <div className="navbar-container">
      <div className="navbar-wrapper">
        <div className="navbar-logo">
          <img src={logo} alt="2950 logo" />
        </div>
        <div className="navbar-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/teams">Teams</NavLink>
          <NavLink to="/managers">Managers</NavLink>
          <NavLink to="/players">Players</NavLink>
          <NavLink to="/stats">Stats</NavLink>
        </div>
      </div>
    </div>
  );
}
