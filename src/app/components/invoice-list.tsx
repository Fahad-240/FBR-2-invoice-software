import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Download, RefreshCw, CheckCircle2, AlertCircle, XCircle } from 'lucide-react';

interface Invoice {
  id: string;
  invoiceNumber: string;
  date: string;
  buyerName: string;
  totalAmount: number;
  fbrStatus: 'Sent' | 'Pending' | 'Failed';
}

export function InvoiceList() {
  const [invoices] = useState<Invoice[]>([
    {
      id: '1',
      invoiceNumber: 'INV-2026-00248',
      date: '2026-02-09',
      buyerName: 'XYZ Corporation',
      totalAmount: 85400,
      fbrStatus: 'Sent',
    },
    {
      id: '2',
      invoiceNumber: 'INV-2026-00247',
      date: '2026-02-09',
      buyerName: 'ABC Trading Co.',
      totalAmount: 42300,
      fbrStatus: 'Sent',
    },
    {
      id: '3',
      invoiceNumber: 'INV-2026-00246',
      date: '2026-02-09',
      buyerName: 'Delta Industries',
      totalAmount: 156900,
      fbrStatus: 'Pending',
    },
    {
      id: '4',
      invoiceNumber: 'INV-2026-00245',
      date: '2026-02-08',
      buyerName: 'Omega Services',
      totalAmount: 28750,
      fbrStatus: 'Sent',
    },
    {
      id: '5',
      invoiceNumber: 'INV-2026-00244',
      date: '2026-02-08',
      buyerName: 'Gamma Enterprises',
      totalAmount: 73200,
      fbrStatus: 'Failed',
    },
    {
      id: '6',
      invoiceNumber: 'INV-2026-00243',
      date: '2026-02-08',
      buyerName: 'Beta Solutions',
      totalAmount: 118500,
      fbrStatus: 'Sent',
    },
    {
      id: '7',
      invoiceNumber: 'INV-2026-00242',
      date: '2026-02-07',
      buyerName: 'Alpha Industries',
      totalAmount: 92800,
      fbrStatus: 'Sent',
    },
    {
      id: '8',
      invoiceNumber: 'INV-2026-00241',
      date: '2026-02-07',
      buyerName: 'Sigma Trading',
      totalAmount: 64100,
      fbrStatus: 'Sent',
    },
  ]);

  const getStatusIcon = (status: Invoice['fbrStatus']) => {
    switch (status) {
      case 'Sent':
        return <CheckCircle2 className="w-4 h-4" />;
      case 'Pending':
        return <AlertCircle className="w-4 h-4" />;
      case 'Failed':
        return <XCircle className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: Invoice['fbrStatus']) => {
    switch (status) {
      case 'Sent':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-amber-100 text-amber-800 border border-amber-200';
      case 'Failed':
        return 'bg-red-100 text-red-800';
    }
  };

  const getStatusLabel = (status: Invoice['fbrStatus']) => {
    if (status === 'Pending') return 'Provisional';
    return status;
  };

  const handleRetrySubmission = (invoiceNumber: string) => {
    alert(`Retrying FBR submission for ${invoiceNumber}`);
  };

  const handleDownloadPDF = (invoiceNumber: string) => {
    alert(`Downloading PDF for ${invoiceNumber}`);
  };

  return (
    <div className="max-w-[1600px]">
      <div className="mb-6">
        <h1 className="text-xl lg:text-2xl text-slate-900 mb-1">Invoice List</h1>
        <p className="text-sm text-slate-600">View and manage all sales tax invoices</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-sm shadow-sm">
        <div className="px-4 lg:px-6 py-4 border-b border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <h2 className="text-base lg:text-lg text-slate-900">All Invoices</h2>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search by invoice number or buyer..."
              className="px-3 py-2 border border-slate-300 rounded-sm text-sm w-full sm:w-80 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs text-slate-600">Invoice Number</th>
                <th className="px-6 py-3 text-left text-xs text-slate-600">Date</th>
                <th className="px-6 py-3 text-left text-xs text-slate-600">Buyer Name</th>
                <th className="px-6 py-3 text-left text-xs text-slate-600">Total Amount</th>
                <th className="px-6 py-3 text-left text-xs text-slate-600">FBR Status</th>
                <th className="px-6 py-3 text-center text-xs text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 text-sm text-slate-900">{invoice.invoiceNumber}</td>
                  <td className="px-6 py-4 text-sm text-slate-700">
                    {new Date(invoice.date).toLocaleDateString('en-PK', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-700">{invoice.buyerName}</td>
                  <td className="px-6 py-4 text-sm text-slate-900">
                    PKR {invoice.totalAmount.toLocaleString('en-PK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-xs ${getStatusColor(
                        invoice.fbrStatus
                      )}`}
                    >
                      {getStatusIcon(invoice.fbrStatus)}
                      {getStatusLabel(invoice.fbrStatus)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <Link
                        to={`/invoice-preview/${invoice.id}`}
                        className="p-1.5 hover:bg-slate-100 rounded-sm text-black"
                        title="View Invoice"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDownloadPDF(invoice.invoiceNumber)}
                        className="p-1.5 hover:bg-slate-100 rounded-sm text-slate-600"
                        title="Download PDF"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      {invoice.fbrStatus === 'Failed' && (
                        <button
                          onClick={() => handleRetrySubmission(invoice.invoiceNumber)}
                          className="p-1.5 hover:bg-amber-50 rounded-sm text-amber-600"
                          title="Retry Submission"
                        >
                          <RefreshCw className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-4 lg:px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-slate-600">Showing {invoices.length} invoices</p>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 border border-slate-300 text-sm text-slate-600 rounded-sm hover:bg-slate-50 disabled:opacity-50" disabled>
              Previous
            </button>
            <button className="px-3 py-1.5 border border-slate-300 text-sm text-slate-600 rounded-sm hover:bg-slate-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}