import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import LandMapping from './pages/LandMapping';
import FarmerPortal from './pages/FarmerPortal';
import GovernmentDashboard from './pages/GovernmentDashboard';
import Analytics from './pages/Analytics';
import Communication from './pages/Communication';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Home from './pages/Home';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import AdminSupport from './pages/AdminSupport';
import FarmerDashboard from './pages/FarmerDashboard';
import AnalystDashboard from './pages/AnalystDashboard';
import AdminDashboard from './pages/AdminDashboard';
import GovernmentPortal from './pages/GovernmentPortal';
import AnalystPortal from './pages/AnalystPortal';
import AdminPortal from './pages/AdminPortal';

// ProtectedRoute for RBAC
function ProtectedRoute({ allowedRoles, redirectTo = "/login", children }) {
  const { user, loading, hasRole } = useAuth();
  if (loading) return null; // or a spinner
  if (!user) return <Navigate to={redirectTo} replace />;
  if (allowedRoles && !hasRole(allowedRoles)) return <Navigate to="/" replace />;
  return children ? children : <Outlet />;
}

function AppRoutes() {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center text-lg">Loading...</div>;
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={user ? <Layout /> : <Home />} />
      {/* Make /farmer-portal a top-level route so it always matches */}
      <Route
        path="/farmer-portal"
        element={
          <ProtectedRoute allowedRoles={["farmer"]}>
            <FarmerPortal />
          </ProtectedRoute>
        }
      />
      {/* Add /government-portal as a top-level route */}
      <Route
        path="/government-portal"
        element={
          <ProtectedRoute allowedRoles={["government"]}>
            <GovernmentPortal />
          </ProtectedRoute>
        }
      />
      {user && (
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route
            path="land-mapping"
            element={
              <ProtectedRoute allowedRoles={["farmer", "government", "admin"]}>
                <LandMapping />
              </ProtectedRoute>
            }
          />

      {/* Removed /government and /government-dashboard routes. Use /government-portal only. */}
          <Route
            path="analyst-dashboard"
            element={
              <ProtectedRoute allowedRoles={["analyst"]}>
                <AnalystDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="admin-dashboard"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="analytics"
            element={
              <ProtectedRoute allowedRoles={["analyst", "government", "admin", "farmer"]}>
                <Analytics />
              </ProtectedRoute>
            }
          />
          <Route
            path="communication"
            element={
              <ProtectedRoute allowedRoles={["farmer", "government", "admin", "analyst"]}>
                <Communication />
              </ProtectedRoute>
            }
          />
          <Route
            path="admin-support"
            element={
              <ProtectedRoute allowedRoles={["admin", "staff"]}>
                <AdminSupport />
              </ProtectedRoute>
            }
          />
          <Route
            path="government-portal"
            element={
              <ProtectedRoute allowedRoles={["government"]}>
                <GovernmentPortal />
              </ProtectedRoute>
            }
          />
          <Route
            path="analyst-portal"
            element={
              <ProtectedRoute allowedRoles={["analyst"]}>
                <AnalystPortal />
              </ProtectedRoute>
            }
          />
          <Route
            path="admin-portal"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminPortal />
              </ProtectedRoute>
            }
          />
        </Route>
      )}
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true
          }}
        >
          <div className="App">
            <AppRoutes />
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
                success: {
                  duration: 3000,
                  iconTheme: {
                    primary: '#22c55e',
                    secondary: '#fff',
                  },
                },
              }}
            />
          </div>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App; 