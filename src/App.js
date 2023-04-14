import "./App.css";
import { useRef } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// Pages ----------------------------------------------------------------
import Game from "./components/Game";
import Home from "./components/Home";
import GameMode from "./components/GameMode";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
// -----------------------------------------------------------------------

function App() {
  const gameID = useRef();
  const userID = useRef();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/gamemode" element={<GameMode />} />
        <Route path="game/:userID/:gameID" element={<Game />} />
      </Routes>
    </Router>
  );
}

export default App;
