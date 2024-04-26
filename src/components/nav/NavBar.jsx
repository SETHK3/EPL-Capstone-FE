import { NavLink } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa";

import logo from "../../assets/images/epl-logo-2.png";
import { useAuthInfo } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";

export default function NavBar() {
  const { logout, userInfo } = useAuthInfo();
  const isAdmin = userInfo?.user.role === "admin";
  const history = useHistory();

  const handleLogoutSubmit = () => {
    logout();
    console.log(userInfo);
    history.push("/login");
  };

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
          <NavLink to="/stats">Stats</NavLink>
          <div className="navbar-dropdown">
            <NavLink to="/players">
              Players <FaAngleDown className="dropdown-arrow" />
            </NavLink>
            <div className="dropdown-content">
              <NavLink to="/players">Player Profiles</NavLink>
              <NavLink to="/transfer">Transfer Portal</NavLink>
            </div>
          </div>
          <div className="navbar-dropdown">
            <NavLink to="/profile" className="dropdown-btn">
              Profile <FaAngleDown className="dropdown-arrow" />
            </NavLink>
            <div className="dropdown-content">
              <NavLink to="/signup">Create Account</NavLink>
              <NavLink to="/profile">My Profile</NavLink>
              {isAdmin && <NavLink to="/admin/users">Users</NavLink>}
              <NavLink to="/login">Login</NavLink>
              <button onClick={handleLogoutSubmit}>Logout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
