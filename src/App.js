import "./App.css";
import { Routes, Route } from "react-router-dom";
import GeneralLayout from "./components/GeneralLayout/GeneralLayout";
import Profile from "./pages/Profile/Profile";
import HomePage from "./pages/HomePage/HomePage";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Explore from "./pages/Explore/Explore";
function App() {


  return (
    <>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Profile" element={<GeneralLayout><Profile /></GeneralLayout>} />
        <Route path="/Explore" element={<GeneralLayout><Explore /></GeneralLayout>} />

      </Routes>

    </>
  );
}

export default App;
