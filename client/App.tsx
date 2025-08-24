import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Login from "./pages/Login";
import FarmerDashboard from "./pages/FarmerDashboard";
import TruckerDashboard from "./pages/TruckerDashboard";
import FarmerRequests from "./pages/FarmerRequests";
import Placeholder from "./pages/Placeholder";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected Route component
function ProtectedRoute({ children, allowedRole }: { children: React.ReactNode; allowedRole?: 'farmer' | 'trucker' }) {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (allowedRole && user?.role !== allowedRole) {
    return <Navigate to={user?.role === 'farmer' ? '/farmer-dashboard' : '/trucker-dashboard'} replace />;
  }

  return <>{children}</>;
}

// Home Route component - redirects based on auth status
function HomeRoute() {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Login />;
  }

  if (user?.role === 'farmer') {
    return <Navigate to="/farmer-dashboard" replace />;
  } else {
    return <Navigate to="/trucker-dashboard" replace />;
  }
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomeRoute />} />

      {/* Farmer Routes */}
      <Route
        path="/farmer-dashboard"
        element={
          <ProtectedRoute allowedRole="farmer">
            <FarmerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/farmer-requests"
        element={
          <ProtectedRoute allowedRole="farmer">
            <FarmerRequests />
          </ProtectedRoute>
        }
      />
      <Route
        path="/track-shipments"
        element={
          <ProtectedRoute allowedRole="farmer">
            <Placeholder />
          </ProtectedRoute>
        }
      />
      <Route
        path="/farmer-analytics"
        element={
          <ProtectedRoute allowedRole="farmer">
            <Placeholder />
          </ProtectedRoute>
        }
      />
      <Route
        path="/farmer-settings"
        element={
          <ProtectedRoute allowedRole="farmer">
            <Placeholder />
          </ProtectedRoute>
        }
      />

      {/* Trucker Routes */}
      <Route
        path="/trucker-dashboard"
        element={
          <ProtectedRoute allowedRole="trucker">
            <TruckerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/trucker-requests"
        element={
          <ProtectedRoute allowedRole="trucker">
            <Placeholder />
          </ProtectedRoute>
        }
      />
      <Route
        path="/trucker-trips"
        element={
          <ProtectedRoute allowedRole="trucker">
            <Placeholder />
          </ProtectedRoute>
        }
      />
      <Route
        path="/route-optimizer"
        element={
          <ProtectedRoute allowedRole="trucker">
            <Placeholder />
          </ProtectedRoute>
        }
      />
      <Route
        path="/trucker-earnings"
        element={
          <ProtectedRoute allowedRole="trucker">
            <Placeholder />
          </ProtectedRoute>
        }
      />
      <Route
        path="/trucker-settings"
        element={
          <ProtectedRoute allowedRole="trucker">
            <Placeholder />
          </ProtectedRoute>
        }
      />

      {/* Legacy routes for backward compatibility */}
      <Route path="/transport" element={<Placeholder />} />
      <Route path="/routes" element={<Placeholder />} />
      <Route path="/analytics" element={<Placeholder />} />
      <Route path="/farmers" element={<Placeholder />} />
      <Route path="/shipments" element={<Placeholder />} />
      <Route path="/settings" element={<Placeholder />} />

      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
