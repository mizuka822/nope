import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import DreamLicensePage from './pages/DreamLicensePage';
import AICompanionPage from './pages/AICompanionPage';
import PrivacyPage from './pages/PrivacyPage';
import XRImmersionPage from './pages/XRImmersionPage';
import CharacterDetailPage from './pages/CharacterDetailPage';
import LoginModal from './components/LoginModal';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);

  const renderPage = () => {
    if (selectedCharacter) {
      return (
        <CharacterDetailPage 
          character={selectedCharacter} 
          onBack={() => setSelectedCharacter(null)}
        />
      );
    }

    switch (currentPage) {
      case 'home':
        return (
          <HomePage 
            onPageChange={setCurrentPage} 
            onCharacterSelect={setSelectedCharacter}
            isLoggedIn={isLoggedIn}
            username={username}
          />
        );
      case 'dreamlicense':
        return <DreamLicensePage />;
      case 'ai-companion':
        return <AICompanionPage />;
      case 'privacy':
        return <PrivacyPage />;
      case 'xr-immersion':
        return <XRImmersionPage />;
      default:
        return (
          <HomePage 
            onPageChange={setCurrentPage} 
            onCharacterSelect={setSelectedCharacter}
            isLoggedIn={isLoggedIn}
            username={username}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-pink-100 to-gray-200 relative">
      {/* Metallic overlay for glossy effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-300/20 via-transparent to-gray-300/20 pointer-events-none"></div>
      
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
      <Sidebar 
        isLoggedIn={isLoggedIn}
        username={username}
        onLoginClick={() => setShowLoginModal(true)}
      />
      
      <main className="ml-20 relative z-10">
        {renderPage()}
      </main>

      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onLogin={(user) => {
            setIsLoggedIn(true);
            setUsername(user);
            setShowLoginModal(false);
          }}
        />
      )}
    </div>
  );
}

export default App;