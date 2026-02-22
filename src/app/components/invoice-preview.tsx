import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Download, Eye } from 'lucide-react';

export function InvoicePreview() {
  const { id } = useParams();

  // Mock invoice data
  const invoice = {
    invoiceNumber: 'INV-2026-00248',
    fbrInvoiceNumber: 'FBR-SRB-2026-0012458',
    date: '2026-02-09',
    sellerName: 'ABC Enterprises (Pvt) Ltd',
    sellerNTN: '1234567-8',
    sellerSTRN: '32-00-0000-000-00',
    sellerAddress: '123 Business District, Karachi, Pakistan',
    buyerName: 'XYZ Corporation',
    buyerNTN: '7654321-9',
    buyerAddress: '456 Commercial Avenue, Lahore, Pakistan',
    paymentMode: 'Cash',
    items: [
      {
        description: 'Industrial Machinery Parts',
        hsCode: '8479.89.00',
        quantity: 50,
        unit: 'PCS',
        rate: 1200,
        amount: 60000,
      },
      {
        description: 'Electronic Components',
        hsCode: '8541.40.00',
        quantity: 100,
        unit: 'PCS',
        rate: 150,
        amount: 15000,
      },
    ],
    subtotal: 75000,
    salesTax: 13500,
    total: 88500,
  };

  return (
    <div className="max-w-[1400px]">
      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            to="/invoices"
            className="p-2 hover:bg-slate-100 rounded-sm text-slate-600"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl lg:text-2xl text-slate-900 mb-1">Invoice Preview</h1>
            <p className="text-sm text-slate-600">{invoice.invoiceNumber}</p>
          </div>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <button
            onClick={() => alert('Downloading PDF...')}
            className="flex items-center justify-center gap-2 px-4 py-2 border border-slate-300 text-slate-700 rounded-sm hover:bg-slate-50 flex-1 sm:flex-initial"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Download PDF</span>
            <span className="sm:hidden">Download</span>
          </button>
          <Link
            to={`/fbr-details/${id}`}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-black text-white rounded-sm hover:bg-slate-800 flex-1 sm:flex-initial"
          >
            <Eye className="w-4 h-4" />
            <span className="hidden sm:inline">View FBR Details</span>
            <span className="sm:hidden">FBR Details</span>
          </Link>
        </div>
      </div>

      {/* Invoice Document */}
      <div className="bg-white border-2 border-slate-300 shadow-lg mx-auto overflow-x-auto" style={{ maxWidth: '210mm' }}>
        {/* Header */}
        <div className="border-b-2 border-slate-900 px-6 lg:px-12 py-6">
          <div className="text-center mb-4">
            <h1 className="text-2xl lg:text-3xl text-slate-900 tracking-tight mb-1">SALES TAX INVOICE</h1>
            <p className="text-sm text-slate-600">FBR Digital Invoice System</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            <div>
              <h2 className="text-xs text-slate-600 mb-2">SELLER INFORMATION</h2>
              <p className="text-sm text-slate-900 mb-0.5">{invoice.sellerName}</p>
              <p className="text-xs text-slate-700">NTN: {invoice.sellerNTN}</p>
              <p className="text-xs text-slate-700">STRN: {invoice.sellerSTRN}</p>
              <p className="text-xs text-slate-700 mt-1">{invoice.sellerAddress}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-600 mb-1">Invoice Number</p>
              <p className="text-base text-slate-900 mb-3">{invoice.invoiceNumber}</p>
              <p className="text-xs text-slate-600 mb-1">FBR Invoice Number</p>
              <p className="text-sm text-slate-900 mb-3">{invoice.fbrInvoiceNumber}</p>
              <p className="text-xs text-slate-600 mb-1">Date</p>
              <p className="text-sm text-slate-900">
                {new Date(invoice.date).toLocaleDateString('en-PK', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Buyer Information */}
        <div className="border-b border-slate-300 px-6 lg:px-12 py-6">
          <h2 className="text-xs text-slate-600 mb-2">BUYER INFORMATION</h2>
          <p className="text-sm text-slate-900 mb-0.5">{invoice.buyerName}</p>
          <p className="text-xs text-slate-700">NTN: {invoice.buyerNTN}</p>
          <p className="text-xs text-slate-700 mt-1">{invoice.buyerAddress}</p>
          <p className="text-xs text-slate-700 mt-2">Payment Mode: <span className="text-slate-900">{invoice.paymentMode}</span></p>
        </div>

        {/* Items Table */}
        <div className="px-6 lg:px-12 py-6 overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b-2 border-slate-900">
                <th className="text-left text-xs text-slate-900 pb-2 pr-4">Description</th>
                <th className="text-left text-xs text-slate-900 pb-2 pr-4">HS Code</th>
                <th className="text-right text-xs text-slate-900 pb-2 pr-4">Qty</th>
                <th className="text-left text-xs text-slate-900 pb-2 pr-4">Unit</th>
                <th className="text-right text-xs text-slate-900 pb-2 pr-4">Rate (PKR)</th>
                <th className="text-right text-xs text-slate-900 pb-2">Amount (PKR)</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item, index) => (
                <tr key={index} className="border-b border-slate-200">
                  <td className="py-3 pr-4 text-xs text-slate-900">{item.description}</td>
                  <td className="py-3 pr-4 text-xs text-slate-700">{item.hsCode}</td>
                  <td className="py-3 pr-4 text-xs text-slate-900 text-right">{item.quantity}</td>
                  <td className="py-3 pr-4 text-xs text-slate-700">{item.unit}</td>
                  <td className="py-3 pr-4 text-xs text-slate-900 text-right">
                    {item.rate.toLocaleString('en-PK', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="py-3 text-xs text-slate-900 text-right">
                    {item.amount.toLocaleString('en-PK', { minimumFractionDigits: 2 })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tax Summary */}
        <div className="px-6 lg:px-12 pb-8">
          <div className="flex justify-end">
            <div className="w-full sm:w-80">
              <div className="flex justify-between py-2 border-b border-slate-300">
                <span className="text-sm text-slate-700">Subtotal:</span>
                <span className="text-sm text-slate-900">
                  PKR {invoice.subtotal.toLocaleString('en-PK', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-300">
                <span className="text-sm text-slate-700">Sales Tax @ 18%:</span>
                <span className="text-sm text-slate-900">
                  PKR {invoice.salesTax.toLocaleString('en-PK', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between py-3 bg-slate-900 text-white px-4 mt-2">
                <span className="text-base">Total Amount:</span>
                <span className="text-lg">
                  PKR {invoice.total.toLocaleString('en-PK', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-300 px-6 lg:px-12 py-4 bg-slate-50">
          <p className="text-xs text-center text-slate-600">
            This is a computer-generated invoice. No signature required.
          </p>
          <p className="text-xs text-center text-slate-500 mt-1">
            Verified by Federal Board of Revenue (FBR), Government of Pakistan
          </p>
        </div>
      </div>
    </div>
  );
}