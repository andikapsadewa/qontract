import React from 'react';
import { useLocalization } from '../context/LocalizationContext';
import { Languages, FileSignature } from 'lucide-react';
import type { View } from '../types';

interface HeaderProps {
  navigate: (view: View) => void;
}

export const Header: React.FC<HeaderProps> = ({ navigate }) => {
  const { language, setLanguage, t } = useLocalization();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center cursor-pointer" onClick={() => navigate('dashboard')}>
            <FileSignature className="h-8 w-8 text-brand-dark-blue" />
            <span className="ml-2 text-2xl font-bold text-brand-dark-blue">{t('appName')}</span>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('dashboard')}
              className="text-gray-600 hover:text-brand-dark-blue font-medium transition-colors"
            >
              {t('dashboard')}
            </button>
            <div className="flex items-center space-x-2 border-l pl-4">
              <Languages className="h-5 w-5 text-gray-500" />
              <button
                onClick={() => setLanguage('id')}
                className={`font-medium ${language === 'id' ? 'text-brand-dark-blue font-bold' : 'text-gray-500'}`}
              >
                ID
              </button>
              <span className="text-gray-300">|</span>
              <button
                onClick={() => setLanguage('en')}
                className={`font-medium ${language === 'en' ? 'text-brand-dark-blue font-bold' : 'text-gray-500'}`}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
