import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginForm from './components/Auth/LoginForm';
import SignupForm from './components/Auth/SignupForm';
import Header from './components/Layout/Header';
import TimelinePage from './components/Timeline/TimelinePage';
import ProfilePage from './components/Profile/ProfilePage';
import MessagesPage from './components/Messages/MessagesPage';
import ResourcesPage from './components/Resources/ResourcesPage';
import SearchPage from './components/Search/SearchPage';
import AdminPanel from './components/Admin/AdminPanel';
import CollegeNewsPage from './components/CollegeNews/CollegeNewsPage';
import MarketplacePage from './components/Marketplace/MarketplacePage';

function AppContent() {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState('timeline');
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  if (!user) {
    return authMode === 'login' ? (
      <LoginForm onSwitchToSignup={() => setAuthMode('signup')} />
    ) : (
      <SignupForm onSwitchToLogin={() => setAuthMode('login')} />
    );
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'timeline':
        return <TimelinePage />;
      case 'profile':
        return <ProfilePage />;
      case 'messages':
        return <MessagesPage />;
      case 'resources':
        return <ResourcesPage />;
      case 'search':
        return <SearchPage />;
      case 'admin':
        return <AdminPanel />;
      case 'news':
        return <CollegeNewsPage />;
      case 'marketplace':
        return <MarketplacePage />;
      default:
        return <TimelinePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onNavigate={setCurrentPage} currentPage={currentPage} />
      <main>{renderPage()}</main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;