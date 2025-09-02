
import React from 'react';
import { CONTRACT_TEMPLATES } from '../constants';
import type { Template } from '../types';
import { useLocalization } from '../context/LocalizationContext';

interface TemplateSelectorProps {
  onSelect: (template: Template) => void;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({ onSelect }) => {
  const { language, t } = useLocalization();

  return (
    <div>
      <h2 className="text-2xl font-bold text-brand-dark-blue">{t('step1')}</h2>
      <p className="text-gray-600 mt-1">{t('step1Description')}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {CONTRACT_TEMPLATES.map((template) => (
          <div
            key={template.id}
            onClick={() => onSelect(template)}
            className="p-6 border border-gray-200 rounded-lg hover:shadow-md hover:border-brand-light-blue cursor-pointer transition-all flex flex-col items-center text-center"
          >
            <template.icon className="h-12 w-12 text-brand-light-blue mb-4" />
            <h3 className="text-lg font-semibold text-brand-dark-blue">{template.title[language]}</h3>
            <p className="text-sm text-gray-500 mt-2">{template.description[language]}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
