import "./App.css";
import { Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile/Profile";
import HomePage from "./pages/HomePage/HomePage";
import Explore from "./pages/Explore/Explore";
import Share from "./pages/Share/Share";

function App() {


  return (
    <>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Share" element={<Share />} />
        <Route path="/Explore" element={<Explore />} />
      </Routes>

    </>
  );
}

export default App;
