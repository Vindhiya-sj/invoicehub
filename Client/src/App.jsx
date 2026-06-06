import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import CompanyDetails from "./pages/CompanyDetails";
import Settings from "./pages/Settings";
import Clients from "./pages/Clients";
import Invoice from "./pages/Invoice";
import Quotation from "./pages/Quotation";
import Payment from "./pages/Payment";
import ProtectedRoute from "./pages/ProtectedRoute";
import LandingPage from "./pages/LandingPage";
import ResetPassword from "./pages/ResetPassword";



import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/company-details" element={<CompanyDetails />} />
        <Route path="/dashboard" element={<ProtectedRoute> <Dashboard /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        <Route path="/clients" element={<ProtectedRoute><Clients /></ProtectedRoute>} />
        <Route path="/invoice" element={<ProtectedRoute><Invoice /></ProtectedRoute>} />
        <Route path="/quotation" element={<ProtectedRoute><Quotation /></ProtectedRoute>} />
        <Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

      </Routes>

      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}

export default App;