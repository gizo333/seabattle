import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from '../register/registerPage';
import Auth from '../authorization/authPage';
import Game from '../game/GamePage';
import Stat from '../page/myStatPage';
import Best from '../page/BestPage';
import ProtectedRoute from "./ProtectedRoute";



function Routs() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Register /></ProtectedRoute>} />
        <Route path="/auth" element={<ProtectedRoute><Auth /></ProtectedRoute>} />
        <Route path="/game" element={<ProtectedRoute><Game /></ProtectedRoute>} />
        <Route path="/myStats" element={<ProtectedRoute><Stat /></ProtectedRoute>} />
        <Route path="/bestPlayers" element={<ProtectedRoute><Best /></ProtectedRoute>} />
      </Routes>
    </Router>

  );
}

export default Routs;
