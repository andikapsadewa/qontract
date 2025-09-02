
import React, { useState, useCallback } from 'react';
import { LocalizationProvider } from './context/LocalizationContext';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { ContractCreator } from './components/ContractCreator';
import type { View } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('dashboard');

  const navigate = useCallback((view: View) => {
    setCurrentView(view);
  }, []);

  return (
    <LocalizationProvider>
      <div className="bg-slate-50 min-h-screen font-sans">
        <Header navigate={navigate} />
        <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
          {currentView === 'dashboard' && <Dashboard navigateToCreator={() => navigate('creator')} />}
          {currentView === 'creator' && <ContractCreator navigateToDashboard={() => navigate('dashboard')} />}
        </main>
      </div>
    </LocalizationProvider>
  );
};

export default App;
