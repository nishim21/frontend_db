import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CustomDashboard from "./components/CustomDashboard";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Trades from "./components/Trade";

const App = () => {
  const [email, setEmail] = useState("");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login email={email} setEmail={setEmail} />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/customDashboard"
          element={<CustomDashboard email={email} />}
        />
        <Route path="/analytics" element={<span />} />
        <Route path="/Trades/:id" element={<Trades />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
