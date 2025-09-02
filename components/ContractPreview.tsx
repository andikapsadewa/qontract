
import React, { useRef, createRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useLocalization } from '../context/LocalizationContext';
import type { GeneratedContract, FormData } from '../types';
import { Download, Save, Undo2, Trash2 } from 'lucide-react';

interface ContractPreviewProps {
  contract: GeneratedContract;
  formData: FormData;
  onBack: () => void;
  onSave: () => void;
}

const SignaturePad: React.FC<{ title: string; onClear: () => void; signatureRef: React.RefObject<SignatureCanvas> }> = ({ title, onClear, signatureRef }) => {
    const { t } = useLocalization();
    return (
        <div className="mt-4">
            <h4 className="font-semibold text-gray-700">{title}</h4>
            <div className="mt-2 border border-dashed rounded-md p-2">
                <SignatureCanvas
                    ref={signatureRef}
                    penColor='black'
                    canvasProps={{ className: 'w-full h-32 bg-slate-50 rounded' }}
                />
            </div>
            <button onClick={onClear} className="text-sm text-gray-500 hover:text-red-600 mt-1 inline-flex items-center">
                <Trash2 className="h-4 w-4 mr-1" />{t('clear')}
            </button>
        </div>
    );
};


export const ContractPreview: React.FC<ContractPreviewProps> = ({ contract, onBack, onSave }) => {
  const { t } = useLocalization();
  const printRef = useRef<HTMLDivElement>(null);
  const sigPad1 = createRef<SignatureCanvas>();
  const sigPad2 = createRef<SignatureCanvas>();

  const handleDownloadPdf = async () => {
    const element = printRef.current;
    if (!element) return;
    const canvas = await html2canvas(element, { scale: 2 });
    const data = canvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    const imgX = (pdfWidth - imgWidth * ratio) / 2;
    const imgY = 10;
    
    pdf.addImage(data, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
    pdf.save('kontrak.pdf');
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-brand-dark-blue">{t('step3')}</h2>
      <p className="text-gray-600 mt-1">{t('step3Description')}</p>
      
      <div ref={printRef} className="mt-6 border border-gray-300 rounded-lg p-6 sm:p-8 bg-white font-serif text-gray-800">
        <h3 className="text-xl font-bold text-center uppercase mb-6">{contract.title}</h3>
        <p className="text-sm mb-4">{contract.opening}</p>
        
        {contract.parties.map(party => (
          <div key={party.id} className="mb-2">
            <p className="font-semibold">{party.id}</p>
            <p className="text-sm whitespace-pre-wrap ml-4">{party.details}</p>
          </div>
        ))}
        
        <p className="text-sm mt-4 mb-6">{contract.preamble}</p>

        {contract.clauses.map((clause, index) => (
          <div key={index} className="mb-4">
            <h4 className="font-bold text-center mb-2">{clause.title}</h4>
            <p className="text-sm text-justify">{clause.content}</p>
          </div>
        ))}

        <p className="text-sm mt-6 mb-8">{contract.closing}</p>

        <div className="grid grid-cols-2 gap-8 mt-16 pt-8">
            <div className="text-center">
                <p>{contract.signatures[0]?.party}</p>
                <div className="mt-16 border-t border-gray-400 pt-1">
                    <p className="font-semibold">{contract.signatures[0]?.name}</p>
                </div>
            </div>
            <div className="text-center">
                <p>{contract.signatures[1]?.party}</p>
                <div className="mt-16 border-t border-gray-400 pt-1">
                     <p className="font-semibold">{contract.signatures[1]?.name}</p>
                </div>
            </div>
        </div>
      </div>

      <div className="mt-6 p-4 border rounded-lg bg-slate-50">
        <h3 className="text-lg font-semibold">{t('E-Signature')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SignaturePad title={t('signaturePartyOne')} signatureRef={sigPad1} onClear={() => sigPad1.current?.clear()} />
            <SignaturePad title={t('signaturePartyTwo')} signatureRef={sigPad2} onClear={() => sigPad2.current?.clear()} />
        </div>
      </div>

      <div className="flex justify-between items-center mt-8 pt-4 border-t">
        <button onClick={onBack} className="inline-flex items-center px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
            <Undo2 className="h-4 w-4 mr-2"/>{t('back')}
        </button>
        <div className="flex items-center space-x-4">
            <button onClick={handleDownloadPdf} className="inline-flex items-center px-6 py-2 border border-transparent rounded-md text-sm font-medium text-brand-dark-blue bg-blue-100 hover:bg-blue-200">
                <Download className="h-4 w-4 mr-2"/>{t('downloadPdf')}
            </button>
            <button onClick={onSave} className="inline-flex items-center px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-accent hover:bg-emerald-600">
                <Save className="h-4 w-4 mr-2"/>{t('saveToDashboard')}
            </button>
        </div>
      </div>
    </div>
  );
};
