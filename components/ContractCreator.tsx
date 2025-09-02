
import React, { useState } from 'react';
import { TemplateSelector } from './TemplateSelector';
import { ContractForm } from './ContractForm';
import { ContractPreview } from './ContractPreview';
import type { FormData, Template, GeneratedContract } from '../types';
import { useLocalization } from '../context/LocalizationContext';

interface ContractCreatorProps {
  navigateToDashboard: () => void;
}

type Step = 'template' | 'form' | 'preview';

export const ContractCreator: React.FC<ContractCreatorProps> = ({ navigateToDashboard }) => {
  const [step, setStep] = useState<Step>('template');
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [generatedContract, setGeneratedContract] = useState<GeneratedContract | null>(null);
  const { t } = useLocalization();

  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template);
    setStep('form');
  };

  const handleFormSubmit = (data: FormData, contract: GeneratedContract) => {
    setFormData(data);
    setGeneratedContract(contract);
    setStep('preview');
  };

  const handleBackToForm = () => {
    setStep('form');
  };
  
  const handleBackToTemplate = () => {
    setStep('template');
  };

  const renderStepContent = () => {
    switch (step) {
      case 'template':
        return <TemplateSelector onSelect={handleTemplateSelect} />;
      case 'form':
        if (!selectedTemplate) return null;
        return <ContractForm template={selectedTemplate} onSubmit={handleFormSubmit} onBack={handleBackToTemplate} />;
      case 'preview':
        if (!generatedContract || !formData) return null;
        return <ContractPreview contract={generatedContract} formData={formData} onBack={handleBackToForm} onSave={navigateToDashboard} />;
      default:
        return null;
    }
  };
  
  const getStepClass = (s: Step) => {
    if (s === step) return 'border-brand-light-blue text-brand-light-blue';
    if ((step === 'form' && s === 'template') || (step === 'preview' && (s === 'template' || s === 'form'))) {
      return 'border-green-500 text-green-600';
    }
    return 'border-gray-300 text-gray-500';
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
      <div className="mb-8 border-b pb-4">
        <nav aria-label="Progress">
          <ol role="list" className="flex justify-between items-center">
             <li className={`flex-1 text-center text-sm font-medium border-b-4 pb-2 ${getStepClass('template')}`}>
                {t('step1')}
            </li>
            <li className={`flex-1 text-center text-sm font-medium border-b-4 pb-2 ${getStepClass('form')}`}>
                {t('step2')}
            </li>
             <li className={`flex-1 text-center text-sm font-medium border-b-4 pb-2 ${getStepClass('preview')}`}>
                {t('step3')}
            </li>
          </ol>
        </nav>
      </div>
      {renderStepContent()}
    </div>
  );
};
