import React, { useState, useMemo } from 'react';
import { PlusCircle, Search } from 'lucide-react';
import { MOCK_CONTRACTS } from '../constants';
import { useLocalization } from '../context/LocalizationContext';

interface DashboardProps {
  navigateToCreator: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ navigateToCreator }) => {
  const { t } = useLocalization();
  const [searchTerm, setSearchTerm] = useState('');
  const [startDateFilter, setStartDateFilter] = useState('');
  const [endDateFilter, setEndDateFilter] = useState('');

  // Filter contracts by search term and optional date range (inclusive).
  const filteredContracts = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    const start = startDateFilter ? new Date(startDateFilter) : null;
    const end = endDateFilter ? new Date(endDateFilter) : null;

    // If end date is provided, set to end of day to make filter inclusive
    if (end) {
      end.setHours(23, 59, 59, 999);
    }

    return MOCK_CONTRACTS.filter(contract => {
      // basic text search
      const matchesText =
        contract.title.toLowerCase().includes(term) ||
        contract.parties.toLowerCase().includes(term);

      if (!matchesText) return false;

      // If no date filters, accept
      if (!start && !end) return true;

      // parse contract date; assume ISO date string (yyyy-mm-dd or full ISO). If parse fails, exclude.
      const contractDate = new Date(contract.date);
      if (isNaN(contractDate.getTime())) return false;

      if (start && contractDate < start) return false;
      if (end && contractDate > end) return false;
      return true;
    });
  }, [searchTerm, startDateFilter, endDateFilter]);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h1 className="text-3xl font-bold text-brand-dark-blue">{t('welcome')}</h1>
        <p className="text-gray-600 mt-2">{t('dashboardDescription')}</p>
        <button
          onClick={navigateToCreator}
          className="mt-4 inline-flex items-center px-6 py-3 bg-brand-light-blue text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
        >
          <PlusCircle className="h-5 w-5 mr-2" />
          {t('newContract')}
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder={t('searchPlaceholder')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-brand-light-blue focus:border-brand-light-blue"
          />
        </div>
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm text-gray-600 mb-1">{t('startDate') || 'Start date'}</label>
            <input
              type="date"
              value={startDateFilter}
              onChange={(e) => setStartDateFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">{t('endDate') || 'End date'}</label>
            <input
              type="date"
              value={endDateFilter}
              onChange={(e) => setEndDateFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div className="mt-4 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Judul Kontrak</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Para Pihak</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Tanggal</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredContracts.map((contract) => (
                    <tr key={contract.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">{contract.title}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{contract.parties}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{contract.date}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          contract.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {contract.status === 'active' ? t('active') : t('expired')}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
