import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Payment } from '../../types';
import { ReceiptModal } from '../common/ReceiptModal';
import { CreditCard, CheckCircle2, Download, Printer } from 'lucide-react';

interface MemberPaymentsProps {
  navigate: (path: string) => void;
}

export const MemberPayments: React.FC<MemberPaymentsProps> = () => {
  const { currentMember, payments } = useApp();
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);

  if (!currentMember) return null;

  const memberPayments = payments.filter((p) => p.memberId === currentMember.id);
  const totalSpent = memberPayments.reduce((acc, curr) => acc + curr.amount, 0);

  const handleOpenReceipt = (payment: Payment) => {
    setSelectedPayment(payment);
    setIsReceiptOpen(true);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Top Summary */}
      <div className="p-6 rounded-2xl bg-[#0f1319] border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white uppercase tracking-tight">Billing & Tax Invoices</h2>
          <p className="text-xs text-neutral-400 mt-1">
            Download GST-compliant tax invoices and track your membership transaction history.
          </p>
        </div>

        <div className="text-right">
          <p className="text-[10px] uppercase font-bold text-neutral-400">Total Billed to Date</p>
          <span className="text-2xl font-black text-emerald-400 tabular-nums">
            ₹{totalSpent.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="p-6 rounded-2xl bg-[#0f1319] border border-neutral-800 space-y-4">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">Payment Records</h3>
          <span className="text-xs font-mono text-neutral-400">{memberPayments.length} Invoices</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="text-neutral-500 uppercase border-b border-neutral-800/80">
                <th className="pb-3 font-semibold">Invoice No.</th>
                <th className="pb-3 font-semibold">Description</th>
                <th className="pb-3 font-semibold">Date</th>
                <th className="pb-3 font-semibold">Method</th>
                <th className="pb-3 text-right font-semibold">Amount</th>
                <th className="pb-3 text-right font-semibold">Status</th>
                <th className="pb-3 text-right font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-850">
              {memberPayments.map((p) => (
                <tr key={p.id} className="hover:bg-neutral-900/30 transition-colors">
                  <td className="py-3 font-mono font-bold text-white">{p.invoiceNumber}</td>
                  <td className="py-3 text-neutral-300 font-medium">{p.planName}</td>
                  <td className="py-3 text-neutral-400 font-mono">{p.date}</td>
                  <td className="py-3 text-neutral-400">{p.method}</td>
                  <td className="py-3 text-right font-mono font-bold text-white">
                    ₹{p.amount.toLocaleString()}
                  </td>
                  <td className="py-3 text-right">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-emerald-950/60 text-emerald-400 border border-emerald-500/30">
                      <CheckCircle2 className="w-3 h-3" />
                      {p.status}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <button
                      onClick={() => handleOpenReceipt(p)}
                      className="px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white font-medium text-[11px] transition-colors cursor-pointer"
                    >
                      Receipt
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Printable Receipt Modal */}
      <ReceiptModal
        isOpen={isReceiptOpen}
        onClose={() => setIsReceiptOpen(false)}
        payment={selectedPayment}
      />
    </div>
  );
};
