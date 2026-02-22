import React, { useState } from 'react';
import { Download, FileSpreadsheet, Info, Calendar } from 'lucide-react';

interface AnnexCRecord {
    id: string;
    invoiceNumber: string;
    fbrNumber: string;
    date: string;
    buyerName: string;
    buyerSTRN: string;
    province: string;
    taxableAmount: number;
    taxAmount: number;
    totalAmount: number;
}

export function AnnexC() {
    const [taxPeriod, setTaxPeriod] = useState('2026-02');

    const records: AnnexCRecord[] = [
        {
            id: '1',
            invoiceNumber: 'INV-1771102188212',
            fbrNumber: 'FBR-U4J4N',
            date: '14 Feb 2026',
            buyerName: 'XYZ Textiles Ltd',
            buyerSTRN: '32-00-5205-001-22',
            province: 'Sindh',
            taxableAmount: 125400.00,
            taxAmount: 22572.00,
            totalAmount: 147972.00,
        },
        {
            id: '2',
            invoiceNumber: 'INV-1771105367748',
            fbrNumber: 'FBR-NWV7N',
            date: '16 Feb 2026',
            buyerName: 'Al-Hamid Fabrics',
            buyerSTRN: '32-00-5208-012-34',
            province: 'Punjab',
            taxableAmount: 85200.00,
            taxAmount: 15336.00,
            totalAmount: 100536.00,
        },
        {
            id: '3',
            invoiceNumber: 'INV-17711358763832',
            fbrNumber: 'FBR-CCNA2',
            date: '17 Feb 2026',
            buyerName: 'Premium Garments (Pvt) Ltd',
            buyerSTRN: '32-00-6109-999-00',
            province: 'Sindh',
            taxableAmount: 245000.00,
            taxAmount: 44100.00,
            totalAmount: 289100.00,
        },
    ];

    const totalTaxable = records.reduce((sum, r) => sum + r.taxableAmount, 0);
    const totalTax = records.reduce((sum, r) => sum + r.taxAmount, 0);
    const totalAmount = records.reduce((sum, r) => sum + r.totalAmount, 0);

    return (
        <div className="max-w-[1600px] min-w-0 overflow-hidden">
            <div className="mb-6">
                <h1 className="text-2xl text-slate-900 mb-1">Annex-C Report</h1>
                <p className="text-sm text-slate-600 font-medium">Auto generated from FBR validated invoices only</p>
            </div>

            {/* Info Banner */}
            <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-6 flex gap-3 shadow-sm rounded-r-md max-w-full overflow-hidden">
                <Info className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div className="min-w-0">
                    <h3 className="text-sm font-bold text-amber-800">Read-Only Report</h3>
                    <p className="text-sm text-amber-700 truncate sm:whitespace-normal">
                        This Annex-C is auto generated from FBR validated invoices only. Manual editing is not allowed. Provisional, draft, or rejected invoices are excluded from this report.
                    </p>
                </div>
            </div>

            {/* Controls */}
            <div className="bg-white border border-slate-200 rounded-sm p-5 mb-6 shadow-sm overflow-hidden">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
                    <div className="flex flex-wrap items-end gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-slate-500 mb-1.5 antialiased">Tax Period</label>
                            <div className="relative">
                                <input
                                    type="month"
                                    value={taxPeriod}
                                    onChange={(e) => setTaxPeriod(e.target.value)}
                                    className="pl-3 pr-10 py-2 border border-slate-300 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-black w-48"
                                />
                            </div>
                        </div>
                        <button className="px-5 py-2 bg-slate-900 text-white rounded-sm text-sm font-semibold hover:bg-black transition-colors">
                            Generate Report
                        </button>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 text-slate-700 rounded-sm hover:bg-slate-50 text-sm font-medium whitespace-nowrap">
                            <FileSpreadsheet className="w-4 h-4" />
                            Export Excel
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 text-slate-700 rounded-sm hover:bg-slate-50 text-sm font-medium whitespace-nowrap">
                            <Download className="w-4 h-4" />
                            Export PDF
                        </button>
                    </div>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white border border-slate-200 rounded-sm p-6 shadow-sm">
                    <p className="text-xs font-semibold text-slate-400 mb-2 antialiased">Total Invoices</p>
                    <p className="text-3xl  text-slate-900">{records.length}</p>
                </div>
                <div className="bg-white border border-slate-200 rounded-sm p-6 shadow-sm">
                    <p className="text-xs font-semibold text-slate-400 mb-2 antialiased">Total Taxable Amount</p>
                    <p className="text-3xl text-slate-900">PKR {totalTaxable.toLocaleString('en-PK', { minimumFractionDigits: 2 })}</p>
                </div>
                <div className="bg-white border border-slate-200 rounded-sm p-6 shadow-sm">
                    <p className="text-xs font-semibold text-slate-400 mb-2 antialiased">Total Tax Collected</p>
                    <p className="text-3xl text-emerald-600">PKR {totalTax.toLocaleString('en-PK', { minimumFractionDigits: 2 })}</p>
                </div>
            </div>

            {/* Annex-C Table */}
            <div className="bg-white border border-slate-200 rounded-sm shadow-sm overflow-hidden w-full max-w-full">
                <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
                    <table className="w-full min-w-[1200px]">
                        <thead className="bg-[#f8f9fb] border-b border-slate-200">
                            <tr>
                                <th className="px-4 py-3 text-left text-[11px] font-bold text-slate-500 uppercase tracking-tight">Invoice No.</th>
                                <th className="px-4 py-3 text-left text-[11px] font-bold text-slate-500 uppercase tracking-tight">FBR Invoice No.</th>
                                <th className="px-4 py-3 text-left text-[11px] font-bold text-slate-500 uppercase tracking-tight">Date</th>
                                <th className="px-4 py-3 text-left text-[11px] font-bold text-slate-500 uppercase tracking-tight">Buyer Name</th>
                                <th className="px-4 py-3 text-left text-[11px] font-bold text-slate-500 uppercase tracking-tight">Buyer STRN</th>
                                <th className="px-4 py-3 text-left text-[11px] font-bold text-slate-500 uppercase tracking-tight">Province</th>
                                <th className="px-4 py-3 text-right text-[11px] font-bold text-slate-500 uppercase tracking-tight">Taxable Amount</th>
                                <th className="px-4 py-3 text-right text-[11px] font-bold text-slate-500 uppercase tracking-tight">Tax Amount</th>
                                <th className="px-4 py-3 text-right text-[11px] font-bold text-slate-500 uppercase tracking-tight">Total Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {records.map((record) => (
                                <tr key={record.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-4 py-4 text-sm font-medium text-slate-900">{record.invoiceNumber}</td>
                                    <td className="px-4 py-4 text-sm text-slate-600">{record.fbrNumber}</td>
                                    <td className="px-4 py-4 text-sm text-slate-600">{record.date}</td>
                                    <td className="px-4 py-4 text-sm text-slate-900">{record.buyerName}</td>
                                    <td className="px-4 py-4 text-sm text-slate-600">{record.buyerSTRN}</td>
                                    <td className="px-4 py-4 text-sm text-slate-600">{record.province}</td>
                                    <td className="px-4 py-4 text-sm text-slate-900 text-right">{record.taxableAmount.toLocaleString('en-PK', { minimumFractionDigits: 2 })}</td>
                                    <td className="px-4 py-4 text-sm text-slate-900 text-right">{record.taxAmount.toLocaleString('en-PK', { minimumFractionDigits: 2 })}</td>
                                    <td className="px-4 py-4 text-sm text-slate-900 text-right">{record.totalAmount.toLocaleString('en-PK', { minimumFractionDigits: 2 })}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot className="border-t-2 border-slate-200">
                            <tr className="bg-white">
                                <td colSpan={6} className="px-4 py-4 text-sm font-bold text-slate-900 uppercase">TOTAL</td>
                                <td className="px-4 py-4 text-sm font-bold text-slate-900 text-right">PKR {totalTaxable.toLocaleString('en-PK', { minimumFractionDigits: 2 })}</td>
                                <td className="px-4 py-4 text-sm font-bold text-emerald-600 text-right">PKR {totalTax.toLocaleString('en-PK', { minimumFractionDigits: 2 })}</td>
                                <td className="px-4 py-4 text-sm font-bold text-slate-900 text-right">PKR {totalAmount.toLocaleString('en-PK', { minimumFractionDigits: 2 })}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>

            <div className="mt-5 p-4 bg-[#f8f9fb] border border-slate-200 rounded-sm">
                <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">
                    Note: This report includes only FBR-validated invoices for the selected period. Invoices with status "Provisional", "Pending", "Draft", or "Rejected" are automatically excluded. Report generated on 18/02/2026, 2:17:42 am.
                </p>
            </div>
        </div>
    );
}
