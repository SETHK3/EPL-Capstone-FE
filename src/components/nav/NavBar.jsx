import { NavLink } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa";

import logo from "../../assets/images/epl-logo-2.png";

export default function NavBar() {
  return (
    <div className="navbar-container">
      <div className="navbar-wrapper">
        <div className="navbar-logo">
          <img src={logo} alt="2950 logo" />
        </div>
        <div className="navbar-links">
          <NavLink to="/home">Home</NavLink>
          <NavLink to="/teams">Teams</NavLink>
          <NavLink to="/managers">Managers</NavLink>
          <NavLink to="/players">Players</NavLink>
          <NavLink to="/stats">Stats</NavLink>
          <div className="navbar-dropdown">
            <NavLink to="/profile" className="dropdown-btn">
              Profile <FaAngleDown className="dropdown-arrow" />
            </NavLink>
            <div className="dropdown-content">
              <NavLink to="/signup">Create Account</NavLink>
              <NavLink to="/profile">My Profile</NavLink>
              <NavLink to="/login">Login</NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
