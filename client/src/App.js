import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function AppRoutes() {
  const { user } = useAuth();
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={user ? <Layout /> : <Home />} />
      {user && (
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="land-mapping" element={<LandMapping />} />
          <Route path="farmer-portal" element={<FarmerPortal />} />
          <Route path="government" element={<GovernmentDashboard />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="communication" element={<Communication />} />
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