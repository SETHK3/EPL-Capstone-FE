import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Footer from "./nav/Footer";
import NavBar from "./nav/NavBar";
import Home from "./pages/Home";
import Teams from "./pages/Teams";
import PrivateRoute from "./routing/PrivateRoute";
import LoginPage from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Managers from "./pages/Managers";
import ProfilePage from "./pages/auth/Profile";
import Players from "./pages/Players";
import Stats from "./pages/Stats";

import "../styles/App.scss";

function App() {
  return (
    <div className="App">
      <Router>
        <div className="navbar-container">
          <NavBar />
        </div>
        <div className="page-container">
          <Switch>
            <PrivateRoute exact path="/home" component={Home} />
            <Route path="/login" component={LoginPage} />
            <Route path="/signup" component={Signup} />
            <Route path="/profile" component={ProfilePage} />
            <PrivateRoute path="/teams" component={Teams} />
            <PrivateRoute path="/managers" component={Managers} />
            <PrivateRoute path="/players" component={Players} />
            <PrivateRoute path="/stats" component={Stats} />
          </Switch>
        </div>
      </Router>
      <div className="footer-container">
        <Footer />
      </div>
    </div>
  );
}

export default App;
