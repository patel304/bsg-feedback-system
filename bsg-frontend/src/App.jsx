import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Certificate from "./pages/Certificate";
import ProtectedRoute from "./components/ProtectedRoute";
import VerifyCertificate from "./pages/VerifyCertificate";



function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["candidate"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin", "superadmin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/certificate/:id"
          element={
            <ProtectedRoute allowedRoles={["candidate", "admin", "superadmin"]}>
              <Certificate />
            </ProtectedRoute>
          }
        />
        <Route path="/verify" element={<VerifyCertificate />} />
      </Routes>



      <Footer />
    </>
  );
}

export default App;