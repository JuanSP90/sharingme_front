import React from "react";
import { Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile/Profile";
import HomePage from "./pages/HomePage/HomePage";
import Explore from "./pages/Explore/Explore";
import Share from "./pages/Share/Share";
import NotFound from './pages/NotFound/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/user/:userName" element={<Profile />} />
      <Route path="/Share" element={<Share />} />
      <Route path="/Explore" element={<Explore />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
