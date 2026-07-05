import "./App.css";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home/Home";
import BloodSearch from "./pages/BloodSearch";
import Hospitals from "./pages/Hospitals";
import RegisterDonor from "./pages/RegisterDonor";
import Login from "./pages/Auth/Login";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/blood-search" element={<ProtectedRoute><BloodSearch /></ProtectedRoute>} />
          <Route path="/hospitals" element={<Hospitals />} />
          <Route path="/register-donor" element={<RegisterDonor />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
export default App;
