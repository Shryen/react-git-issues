import "./reset.css";
import "./App.css";
import Issues from "./Issues";
import Details from "./Details";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </nav>
      <div className="container">
        <Routes>
          <Route path="/" element={<Issues />} />
          <Route path="/issues/:id" element={<Details />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
