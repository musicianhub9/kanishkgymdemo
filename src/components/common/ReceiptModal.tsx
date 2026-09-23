import React from 'react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { Payment } from '../../types';
import { Modal } from './Modal';
import { Printer, Download, CheckCircle, Dumbbell } from 'lucide-react';

interface ReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  payment: Payment | null;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({ isOpen, onClose, payment }) => {
  const { settings, members } = useApp();
  const { showToast } = useToast();

  if (!payment) return null;

  const member = members.find((m) => m.id === payment.memberId);
  const tax = payment.tax || Math.round(payment.amount * 0.18);
  const subtotal = payment.amount - tax;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    showToast(`Invoice ${payment.invoiceNumber} downloaded as PDF.`, 'success');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Payment Tax Invoice"
      subtitle={`Official payment receipt for ${payment.invoiceNumber}`}
      maxWidth="xl"
    >
      <div id="receipt-print-area" className="bg-[#12161f] p-6 rounded-xl border border-neutral-800 text-neutral-200">
        {/* Receipt Header */}
        <div className="flex items-start justify-between border-b border-neutral-800 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Dumbbell className="w-4 h-4" />
              </div>
              <h2 className="text-lg font-black uppercase text-white tracking-tight">
                {settings.gymName}
              </h2>
            </div>
            <p className="text-xs text-neutral-400 mt-1 max-w-xs">{settings.address}</p>
            <p className="text-xs text-neutral-400">GSTIN: 27AAAAA0000A1Z5 · Ph: {settings.phone}</p>
          </div>

          <div className="text-right">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold uppercase tracking-wider bg-emerald-950/60 text-emerald-400 border border-emerald-500/40">
              <CheckCircle className="w-3.5 h-3.5" />
              {payment.status}
            </span>
            <p className="text-sm font-bold text-white mt-2 font-mono">{payment.invoiceNumber}</p>
            <p className="text-xs text-neutral-400">Date: {payment.date}</p>
          </div>
        </div>

        {/* Billed To */}
        <div className="grid grid-cols-2 gap-4 py-4 border-b border-neutral-800 text-xs">
          <div>
            <p className="text-neutral-500 font-semibold uppercase">Billed To:</p>
            <p className="font-semibold text-white mt-1 text-sm">{payment.memberName}</p>
            {member && (
              <>
                <p className="text-neutral-400 mt-0.5">{member.email}</p>
                <p className="text-neutral-400">{member.phone}</p>
              </>
            )}
          </div>
          <div className="text-right">
            <p className="text-neutral-500 font-semibold uppercase">Payment Details:</p>
            <p className="text-neutral-300 mt-1 font-medium">Method: {payment.method}</p>
            <p className="text-neutral-400">Transaction ID: TXN-{payment.id.toUpperCase()}</p>
          </div>
        </div>

        {/* Line Items */}
        <div className="py-4 border-b border-neutral-800">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-neutral-500 uppercase border-b border-neutral-800/80">
                <th className="text-left pb-2 font-medium">Description</th>
                <th className="text-center pb-2 font-medium">Qty</th>
                <th className="text-right pb-2 font-medium">Rate</th>
                <th className="text-right pb-2 font-medium">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/40">
              <tr>
                <td className="py-3 font-medium text-white">{payment.planName}</td>
                <td className="py-3 text-center text-neutral-400">1</td>
                <td className="py-3 text-right font-mono text-neutral-300">₹{subtotal.toLocaleString()}</td>
                <td className="py-3 text-right font-mono text-white">₹{subtotal.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Calculations */}
        <div className="py-4 space-y-1.5 text-xs text-right border-b border-neutral-800 font-mono">
          <div className="flex justify-between text-neutral-400">
            <span>Taxable Subtotal:</span>
            <span>₹{subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-neutral-400">
            <span>GST (18% Integrated / CGST+SGST):</span>
            <span>₹{tax.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-neutral-800">
            <span className="font-sans uppercase">Total Paid:</span>
            <span className="text-emerald-400">₹{payment.amount.toLocaleString()}</span>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-[11px] text-neutral-500 text-center mt-4">
          This is a computer-generated tax invoice and requires no physical signature. Thank you for training with {settings.gymName}!
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-3 pt-3">
        <button
          onClick={handleDownload}
          className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-neutral-300 hover:text-white bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Save PDF</span>
        </button>
        <button
          onClick={handlePrint}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-black bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Print Receipt</span>
        </button>
      </div>
    </Modal>
  );
};
