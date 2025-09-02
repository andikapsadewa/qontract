
import { FileText, Truck, Wrench } from 'lucide-react';
import type { Template, MockContract, Language } from './types';

export const CONTRACT_TEMPLATES: Template[] = [
  {
    id: 'freelance_project',
    title: { id: 'Proyek Freelance', en: 'Freelance Project' },
    description: { id: 'Kontrak untuk pekerjaan lepas berbasis proyek.', en: 'Contract for project-based freelance work.' },
    icon: FileText,
  },
  {
    id: 'supplier_cooperation',
    title: { id: 'Kerjasama Supplier', en: 'Supplier Cooperation' },
    description: { id: 'Perjanjian kerjasama dengan pemasok barang atau jasa.', en: 'Agreement for cooperation with a supplier of goods or services.' },
    icon: Truck,
  },
  {
    id: 'equipment_rental',
    title: { id: 'Sewa Alat', en: 'Equipment Rental' },
    description: { id: 'Kontrak untuk sewa-menyewa peralatan atau aset.', en: 'Contract for renting equipment or assets.' },
    icon: Wrench,
  },
];

export const MOCK_CONTRACTS: MockContract[] = [
    { id: 'C001', title: 'Pengembangan Website E-commerce', parties: 'PT. Digital Maju & John Doe', date: '2024-07-15', status: 'active' },
    { id: 'C002', title: 'Penyediaan Bahan Baku Kopi', parties: 'Kopi Kenangan & CV. Biji Terbaik', date: '2024-06-01', status: 'active' },
    { id: 'C003', title: 'Sewa Mesin Fotokopi Kantor', parties: 'Creative Agency & PT. Sewa Guna', date: '2023-12-20', status: 'expired' },
    { id: 'C004', title: 'Jasa Desain Logo & Branding', parties: 'UMKM Sejahtera & Jane Smith', date: '2024-08-01', status: 'active' },
];

export const LOCALIZATION_STRINGS: Record<Language, Record<string, string>> = {
  id: {
    // Header
    appName: 'Qontract',
    dashboard: 'Dashboard',
    newContract: 'Buat Kontrak Baru',
    // Dashboard
    welcome: 'Selamat Datang Kembali!',
    dashboardDescription: 'Kelola semua kontrak Anda di satu tempat. Mulai dengan membuat kontrak baru.',
    searchPlaceholder: 'Cari kontrak...',
    active: 'Aktif',
    expired: 'Kadaluarsa',
    // Creator
    step1: 'Langkah 1: Pilih Template',
    step1Description: 'Pilih jenis kontrak yang paling sesuai dengan kebutuhan Anda.',
    step2: 'Langkah 2: Isi Detail',
    step2Description: 'Lengkapi informasi para pihak dan detail perjanjian.',
    step3: 'Langkah 3: Pratinjau & Tanda Tangan',
    step3Description: 'Periksa kembali draf kontrak, bubuhkan tanda tangan, dan unduh.',
    partyOne: 'Pihak Pertama',
    partyTwo: 'Pihak Kedua',
    fullName: 'Nama Lengkap',
    position: 'Jabatan',
    address: 'Alamat',
    contractDetails: 'Detail Kontrak',
    projectTitle: 'Judul Proyek/Objek Kontrak',
    scope: 'Lingkup Pekerjaan',
    value: 'Nilai Kontrak (Rp)',
    startDate: 'Tanggal Mulai',
    endDate: 'Tanggal Selesai',
    additionalTerms: 'Ketentuan Tambahan (Opsional)',
    generateContract: 'Buat Draf Kontrak',
    back: 'Kembali',
    generating: 'Menghasilkan draf kontrak...',
    downloadPdf: 'Unduh PDF',
    saveToDashboard: 'Simpan ke Dashboard',
    signaturePartyOne: 'Tanda Tangan Pihak Pertama',
    signaturePartyTwo: 'Tanda Tangan Pihak Kedua',
    clear: 'Hapus',
    errorGenerating: 'Gagal membuat kontrak. Silakan coba lagi.',
    errorGeneratingCheckInput: 'Gagal membuat kontrak. Mohon periksa kembali data yang Anda masukkan dan coba lagi.',
  },
  en: {
    // Header
    appName: 'Qontract',
    dashboard: 'Dashboard',
    newContract: 'Create New Contract',
    // Dashboard
    welcome: 'Welcome Back!',
    dashboardDescription: 'Manage all your contracts in one place. Get started by creating a new contract.',
    searchPlaceholder: 'Search contracts...',
    active: 'Active',
    expired: 'Expired',
    // Creator
    step1: 'Step 1: Choose a Template',
    step1Description: 'Select the type of contract that best suits your needs.',
    step2: 'Step 2: Fill in Details',
    step2Description: 'Complete the information for the parties and the agreement details.',
    step3: 'Step 3: Preview & Sign',
    step3Description: 'Review the draft contract, apply signatures, and download.',
    partyOne: 'First Party',
    partyTwo: 'Second Party',
    fullName: 'Full Name',
    position: 'Position',
    address: 'Address',
    contractDetails: 'Contract Details',
    projectTitle: 'Project Title/Contract Object',
    scope: 'Scope of Work',
    value: 'Contract Value (IDR)',
    startDate: 'Start Date',
    endDate: 'End Date',
    additionalTerms: 'Additional Terms (Optional)',
    generateContract: 'Generate Contract Draft',
    back: 'Back',
    generating: 'Generating contract draft...',
    downloadPdf: 'Download PDF',
    saveToDashboard: 'Save to Dashboard',
    signaturePartyOne: 'First Party\'s Signature',
    signaturePartyTwo: 'Second Party\'s Signature',
    clear: 'Clear',
    errorGenerating: 'Failed to generate contract. Please try again.',
    errorGeneratingCheckInput: 'Failed to generate contract. Please check your input and try again.',
  },
};
