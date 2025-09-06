import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Opportunities from "./pages/Opportunities";
import Registration from "./pages/Registration";
import Profile from "./pages/Profile";

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header user={user} setUser={setUser} />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Navigate to="/register" />} />
            <Route path="/register" element={<Registration setUser={setUser} />} />
            <Route path="/dashboard" element={user ? <Dashboard user={user} /> : <Navigate to="/register" />} />
            <Route path="/opportunities" element={user ? <Opportunities user={user} /> : <Navigate to="/register" />} />
            <Route path="/profile" element={user ? <Profile user={user} setUser={setUser} /> : <Navigate to="/register" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
