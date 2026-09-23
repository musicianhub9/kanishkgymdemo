import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { Payment } from '../../types';
import { ReceiptModal } from '../common/ReceiptModal';
import { Modal } from '../common/Modal';
import { CreditCard, Plus, Search, CheckCircle2, Download, Printer } from 'lucide-react';

interface AdminPaymentsProps {
  navigate: (path: string) => void;
}

export const AdminPayments: React.FC<AdminPaymentsProps> = () => {
  const { payments, members, addPayment } = useApp();
  const { showToast } = useToast();

  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState<Payment | null>(null);

  const [form, setForm] = useState({
    memberId: members[0]?.id || '',
    planName: 'Pro Tier Renewal (Monthly)',
    amount: 3499,
    method: 'UPI / GPay',
    status: 'Paid' as 'Paid' | 'Pending',
    date: new Date().toISOString().split('T')[0],
  });

  const filteredPayments = payments.filter(
    (p) =>
      p.memberName.toLowerCase().includes(search.toLowerCase()) ||
      p.invoiceNumber.toLowerCase().includes(search.toLowerCase()) ||
      p.planName.toLowerCase().includes(search.toLowerCase())
  );

  const totalCollected = filteredPayments.reduce((acc, curr) => acc + curr.amount, 0);

  const handleOpenAdd = () => {
    setForm({
      memberId: members[0]?.id || '',
      planName: 'Pro Tier Renewal (Monthly)',
      amount: 3499,
      method: 'UPI / GPay',
      status: 'Paid',
      date: new Date().toISOString().split('T')[0],
    });
    setModalOpen(true);
  };

  const handleSavePayment = (e: React.FormEvent) => {
    e.preventDefault();
    const member = members.find((m) => m.id === form.memberId) || members[0];

    const newPayment = addPayment({
      memberId: member.id,
      memberName: member.name,
      planName: form.planName,
      amount: Number(form.amount),
      date: form.date,
      method: form.method,
      status: form.status,
    });

    showToast(`Payment of ₹${form.amount} recorded for ${member.name}. Invoice #${newPayment.invoiceNumber} generated.`, 'success');
    setModalOpen(false);
  };

  const exportPaymentsCSV = () => {
    const headers = 'Invoice No,Member Name,Description,Amount,Date,Method,Status\n';
    const rows = filteredPayments
      .map(
        (p) =>
          `"${p.invoiceNumber}","${p.memberName}","${p.planName}",${p.amount},"${p.date}","${p.method}","${p.status}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `one-life-payments-ledger-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    showToast('Payment ledger exported to CSV file.', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-[#0f1319] border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white uppercase tracking-tight">Financial Ledger & Invoices</h2>
          <p className="text-xs text-neutral-400 mt-1">
            Real-time transaction tracking, point-of-sale receipt issuance, and revenue auditing.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={exportPaymentsCSV}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-1.5 px-4 py-2 bg-emerald-400 hover:bg-emerald-300 text-black rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Record Payment</span>
          </button>
        </div>
      </div>

      {/* Filter and stats */}
      <div className="p-6 rounded-2xl bg-[#0f1319] border border-neutral-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-850 pb-4">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search member, invoice #..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#12161f] border border-neutral-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="text-neutral-500">Filtered Total:</span>
            <span className="text-lg font-black text-emerald-400 tabular-nums">
              ₹{totalCollected.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Ledger Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="text-neutral-500 uppercase border-b border-neutral-800/80">
                <th className="pb-3 font-semibold">Invoice No.</th>
                <th className="pb-3 font-semibold">Member</th>
                <th className="pb-3 font-semibold">Description</th>
                <th className="pb-3 font-semibold">Date</th>
                <th className="pb-3 font-semibold">Payment Mode</th>
                <th className="pb-3 text-right font-semibold">Amount</th>
                <th className="pb-3 text-right font-semibold">Status</th>
                <th className="pb-3 text-right font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-850">
              {filteredPayments.map((p) => (
                <tr key={p.id} className="hover:bg-neutral-900/30 transition-colors">
                  <td className="py-3 font-mono font-bold text-white">{p.invoiceNumber}</td>
                  <td className="py-3 font-medium text-white">{p.memberName}</td>
                  <td className="py-3 text-neutral-400">{p.planName}</td>
                  <td className="py-3 font-mono text-neutral-400">{p.date}</td>
                  <td className="py-3 text-neutral-300">{p.method}</td>
                  <td className="py-3 text-right font-mono font-bold text-emerald-400">
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
                      onClick={() => setSelectedReceipt(p)}
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

      {/* Record Payment Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Record Financial Transaction"
        subtitle="Log offline cash, card POS, or manual bank wire entries"
        maxWidth="md"
      >
        <form onSubmit={handleSavePayment} className="space-y-4">
          <div>
            <label className="block text-xs text-neutral-300 mb-1">Select Member</label>
            <select
              value={form.memberId}
              onChange={(e) => setForm({ ...form, memberId: e.target.value })}
              className="w-full bg-[#12161f] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
            >
              {members.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} ({m.planName})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs text-neutral-300 mb-1">Description / Plan</label>
            <input
              type="text"
              required
              value={form.planName}
              onChange={(e) => setForm({ ...form, planName: e.target.value })}
              className="w-full bg-[#12161f] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-neutral-300 mb-1">Amount (₹)</label>
              <input
                type="number"
                required
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })}
                className="w-full bg-[#12161f] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
              />
            </div>

            <div>
              <label className="block text-xs text-neutral-300 mb-1">Payment Date</label>
              <input
                type="date"
                required
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full bg-[#12161f] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-neutral-300 mb-1">Payment Method</label>
              <select
                value={form.method}
                onChange={(e) => setForm({ ...form, method: e.target.value })}
                className="w-full bg-[#12161f] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
              >
                <option value="UPI / GPay">UPI / GPay</option>
                <option value="Card (POS Machine)">Card (POS Machine)</option>
                <option value="Cash at Reception">Cash at Reception</option>
                <option value="Net Banking / NEFT">Net Banking / NEFT</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-neutral-300 mb-1">Transaction Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value as any })}
                className="w-full bg-[#12161f] border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
              >
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-800">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-neutral-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-black text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
            >
              Log Entry
            </button>
          </div>
        </form>
      </Modal>

      {/* Invoice Modal */}
      <ReceiptModal
        isOpen={!!selectedReceipt}
        onClose={() => setSelectedReceipt(null)}
        payment={selectedReceipt}
      />
    </div>
  );
};
