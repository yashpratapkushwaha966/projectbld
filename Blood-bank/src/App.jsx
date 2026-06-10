import "./App.css";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home/Home";
import BloodSearch from "./pages/BloodSearch";
import Hospitals from "./pages/Hospitals";
import RegisterDonor from "./pages/RegisterDonor";

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blood-search" element={<BloodSearch />} />
          <Route path="/hospitals" element={<Hospitals />} />
          <Route path="/register-donor" element={<RegisterDonor />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
export default App;
