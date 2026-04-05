import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";

// Founder
import FounderDashboard from "./pages/founder/Dashboard";
import CreateProject from "./pages/founder/CreateProject";
import EditProject from "./pages/founder/EditProject";

// Investor
import InvestorDashboard from "./pages/investor/Dashboard";
import InvestPage from "./pages/investor/InvestPage";

// Admin
import AdminDashboard from "./pages/admin/Dashboard";

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />

            <Route
              path="/founder/dashboard"
              element={
                <ProtectedRoute allowedRoles={["founder"]}>
                  <FounderDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/founder/create"
              element={
                <ProtectedRoute allowedRoles={["founder"]}>
                  <CreateProject />
                </ProtectedRoute>
              }
            />
            <Route
              path="/founder/edit/:id"
              element={
                <ProtectedRoute allowedRoles={["founder"]}>
                  <EditProject />
                </ProtectedRoute>
              }
            />

            <Route
              path="/investor/dashboard"
              element={
                <ProtectedRoute allowedRoles={["investor"]}>
                  <InvestorDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/investor/invest/:id"
              element={
                <ProtectedRoute allowedRoles={["investor"]}>
                  <InvestPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
