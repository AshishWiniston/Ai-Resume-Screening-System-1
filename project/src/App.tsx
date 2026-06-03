import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import ParticleBackground from './components/ParticleBackground';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './components/DashboardLayout';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardHome from './pages/dashboard/DashboardHome';
import ResumeScreening from './pages/dashboard/ResumeScreening';
import CandidateRankings from './pages/dashboard/CandidateRankings';
import JobDescriptions from './pages/dashboard/JobDescriptions';
import AIAssistant from './pages/dashboard/AIAssistant';
import Analytics from './pages/dashboard/Analytics';
import Notifications from './pages/dashboard/Notifications';
import SettingsPage from './pages/dashboard/SettingsPage';

function DashboardWithLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <DashboardLayout>{children}</DashboardLayout>
    </ProtectedRoute>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ParticleBackground />
        <Routes>
          {/* Public */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Dashboard */}
          <Route path="/dashboard" element={
            <DashboardWithLayout><DashboardHome /></DashboardWithLayout>
          } />
          <Route path="/dashboard/screening" element={
            <DashboardWithLayout><ResumeScreening /></DashboardWithLayout>
          } />
          <Route path="/dashboard/rankings" element={
            <DashboardWithLayout><CandidateRankings /></DashboardWithLayout>
          } />
          <Route path="/dashboard/jobs" element={
            <DashboardWithLayout><JobDescriptions /></DashboardWithLayout>
          } />
          <Route path="/dashboard/assistant" element={
            <DashboardWithLayout><AIAssistant /></DashboardWithLayout>
          } />
          <Route path="/dashboard/analytics" element={
            <DashboardWithLayout><Analytics /></DashboardWithLayout>
          } />
          <Route path="/dashboard/notifications" element={
            <DashboardWithLayout><Notifications /></DashboardWithLayout>
          } />
          <Route path="/dashboard/settings" element={
            <DashboardWithLayout><SettingsPage /></DashboardWithLayout>
          } />

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
