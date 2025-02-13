import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import DashbordLayout from "./layout/DashbordLayout";
import Dashboard from "./pages/Dashboard"; 
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";
 import AdminLogin from "./pages/AdminLogin";
 import LandPage from "./pages/LandPage";
import FarmersManagement from "./pages/Famers";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<AdminLogin/>}/>
      <Route path="" element={<DashbordLayout />}>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/famers" element={<FarmersManagement />} />
        <Route path="/lands" element={<LandPage />} />
        <Route path="/agents" element={<Profile />} />
        <Route path="/requests" element={<Profile />} />
        <Route path="/change-password" element={<ChangePassword />} />
      </Route>
    </Routes>
  );
}




export default App;
