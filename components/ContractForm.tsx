
import React, { useState, useCallback } from 'react';
import { useLocalization } from '../context/LocalizationContext';
import { generateContract } from '../services/geminiService';
import type { FormData, Template, GeneratedContract } from '../types';
import { Spinner } from './Spinner';

interface ContractFormProps {
  template: Template;
  onSubmit: (formData: FormData, contract: GeneratedContract) => void;
  onBack: () => void;
}

const initialFormData: FormData = {
  partyOneName: '', partyOnePosition: '', partyOneAddress: '',
  partyTwoName: '', partyTwoPosition: '', partyTwoAddress: '',
  projectTitle: '', scope: '', value: '',
  startDate: '', endDate: '', additionalTerms: '',
};

const InputField: React.FC<{ label: string; id: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; required?: boolean }> = ({ label, id, value, onChange, required }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
        <input type="text" id={id} name={id} value={value} onChange={onChange} required={required} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-light-blue focus:border-brand-light-blue sm:text-sm" />
    </div>
);

export const ContractForm: React.FC<ContractFormProps> = ({ template, onSubmit, onBack }) => {
  const { language, t } = useLocalization();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
        const contract = await generateContract(formData, template, language);
        if (contract) {
            onSubmit(formData, contract);
        } else {
            setError(t('errorGeneratingCheckInput'));
        }
    } catch (err) {
        setError(t('errorGenerating'));
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-brand-dark-blue">{t('step2')}</h2>
      <p className="text-gray-600 mt-1">{t('step2Description')}: <span className="font-semibold">{template.title[language]}</span></p>
      
      <form onSubmit={handleSubmit} className="mt-6 space-y-8">
        <div className="space-y-4 p-4 border rounded-md">
            <h3 className="text-lg font-medium text-brand-dark-blue">{t('partyOne')}</h3>
            <InputField label={t('fullName')} id="partyOneName" value={formData.partyOneName} onChange={handleChange} required />
            <InputField label={t('position')} id="partyOnePosition" value={formData.partyOnePosition} onChange={handleChange} required />
            <InputField label={t('address')} id="partyOneAddress" value={formData.partyOneAddress} onChange={handleChange} required />
        </div>

        <div className="space-y-4 p-4 border rounded-md">
            <h3 className="text-lg font-medium text-brand-dark-blue">{t('partyTwo')}</h3>
            <InputField label={t('fullName')} id="partyTwoName" value={formData.partyTwoName} onChange={handleChange} required />
            <InputField label={t('position')} id="partyTwoPosition" value={formData.partyTwoPosition} onChange={handleChange} required />
            <InputField label={t('address')} id="partyTwoAddress" value={formData.partyTwoAddress} onChange={handleChange} required />
        </div>
        
        <div className="space-y-4 p-4 border rounded-md">
            <h3 className="text-lg font-medium text-brand-dark-blue">{t('contractDetails')}</h3>
            <InputField label={t('projectTitle')} id="projectTitle" value={formData.projectTitle} onChange={handleChange} required />
            <div>
                <label htmlFor="scope" className="block text-sm font-medium text-gray-700">{t('scope')}</label>
                <textarea id="scope" name="scope" value={formData.scope} onChange={handleChange} required rows={3} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-light-blue focus:border-brand-light-blue sm:text-sm"></textarea>
            </div>
            <InputField label={t('value')} id="value" value={formData.value} onChange={handleChange} required />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <InputField label={t('startDate')} id="startDate" value={formData.startDate} onChange={handleChange} required />
                 <InputField label={t('endDate')} id="endDate" value={formData.endDate} onChange={handleChange} required />
            </div>
             <div>
                <label htmlFor="additionalTerms" className="block text-sm font-medium text-gray-700">{t('additionalTerms')}</label>
                <textarea id="additionalTerms" name="additionalTerms" value={formData.additionalTerms} onChange={handleChange} rows={3} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-light-blue focus:border-brand-light-blue sm:text-sm"></textarea>
            </div>
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}
        
        <div className="flex justify-between items-center pt-4">
          <button type="button" onClick={onBack} className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">{t('back')}</button>
          <button type="submit" disabled={isLoading} className="inline-flex items-center px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-dark-blue hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-light-blue disabled:bg-gray-400">
            {isLoading && <Spinner />}
            {isLoading ? t('generating') : t('generateContract')}
          </button>
        </div>
      </form>
    </div>
  );
};
