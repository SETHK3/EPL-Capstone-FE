import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Footer from "./nav/Footer";
import NavBar from "./nav/NavBar";
import Home from "./pages/Home";

import "../styles/App.scss";

function App() {
  return (
    <div className="App">
      <Router>
        <div className="navbar-container">
          <NavBar />
        </div>
        <Routes>
          <Route exact path="/" element={Home} />
        </Routes>
      </Router>
      <div className="footer-container">
        <Footer />
      </div>
    </div>
  );
}

export default App;
