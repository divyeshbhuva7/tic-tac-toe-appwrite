import "./App.css";
import Game from "./components/Game";
import Home from "./components/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GameMode from "./components/GameMode";
import { useRef } from "react";

function App() {
  const gameID = useRef();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gamemode" element={<GameMode />} />
        <Route path="game/:gameID" element={<Game />} />
      </Routes>
    </Router>
  );
}

export default App;
