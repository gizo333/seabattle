import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from '../register/registerPage';
import AuthPage from '../authorization/AuthPage.tsx';
import Game from '../game/GamePage';
import Stat from '../page/myStatPage.tsx';
import Best from '../page/BestPage.tsx';
import ProtectedRoute from "./ProtectedRoute";



function Routs() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Register /></ProtectedRoute>} />
        <Route path="/auth" element={<ProtectedRoute><AuthPage /></ProtectedRoute>} />
        <Route path="/game" element={<ProtectedRoute><Game /></ProtectedRoute>} />
        <Route path="/myStats" element={<ProtectedRoute><Stat /></ProtectedRoute>} />
        <Route path="/bestPlayers" element={<ProtectedRoute><Best /></ProtectedRoute>} />
      </Routes>
    </Router>

  );
}

export default Routs;
