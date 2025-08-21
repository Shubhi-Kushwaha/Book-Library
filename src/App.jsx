import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/LoginPage";
import Signup from "./pages/SignupPage"; 
import AdminDashboard from "./pages/AdminDashboard";
import Navbar from "./components/Navbar"; // ✅ import navbar

export default function App() {
  return (
     <div className="min-h-screen flex flex-col">
      {/* Navbar always visible */}
      <Navbar />

      {/* Page content */}
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} /> 
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </div>
  );
}
