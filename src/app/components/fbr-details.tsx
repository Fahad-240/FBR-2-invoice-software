import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Download } from 'lucide-react';

export function FBRDetails() {
  const { id } = useParams();

  // Mock FBR data
  const fbrData = {
    invoiceNumber: 'INV-2026-00248',
    fbrInvoiceNumber: 'FBR-SRB-2026-0012458',
    submissionDate: '2026-02-09T14:23:15',
    submissionStatus: 'Successfully Submitted',
    integratorReferenceId: 'INT-REF-20260209-142315-ABC-001',
    fbrAcknowledgementId: 'ACK-FBR-2026-0012458-CONFIRMED',
    verificationCode: 'VER-2026-248-XYZ',
    qrCodeData: 'FBR-SRB-2026-0012458|ABC-ENT|88500.00|2026-02-09',
    buyerName: 'XYZ Corporation',
    totalAmount: 88500,
    taxAmount: 13500,
  };

  return (
    <div className="max-w-[1600px]">
      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            to="/invoices"
            className="p-2 hover:bg-slate-100 rounded-sm text-slate-600"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl lg:text-2xl text-slate-900 mb-1">FBR Submission Details</h1>
            <p className="text-sm text-slate-600">Federal Board of Revenue Verification</p>
          </div>
        </div>
        <button
          onClick={() => alert('Downloading FBR Certificate...')}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-black text-white rounded-sm hover:bg-slate-800 w-full sm:w-auto"
        >
          <Download className="w-4 h-4" />
          <span className="hidden sm:inline">Download Certificate</span>
          <span className="sm:hidden">Download</span>
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Main Details */}
        <div className="xl:col-span-2 space-y-6">
          {/* Status Card */}
          <div className="bg-white border-2 border-green-200 rounded-sm shadow-sm">
            <div className="px-4 lg:px-6 py-4 bg-green-50 border-b border-green-200 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 lg:w-6 lg:h-6 text-green-700" />
              <div>
                <h2 className="text-sm lg:text-base text-green-900">Submission Successful</h2>
                <p className="text-xs text-green-700">Invoice verified and accepted by FBR</p>
              </div>
            </div>
            <div className="px-4 lg:px-6 py-5">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                <div>
                  <label className="block text-xs text-slate-600 mb-1">Submission Date & Time</label>
                  <p className="text-sm text-slate-900">
                    {new Date(fbrData.submissionDate).toLocaleString('en-PK', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                    })}
                  </p>
                </div>
                <div>
                  <label className="block text-xs text-slate-600 mb-1">Submission Status</label>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-800 rounded-sm text-sm">
                    <CheckCircle2 className="w-4 h-4" />
                    {fbrData.submissionStatus}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Invoice Information */}
          <div className="bg-white border border-slate-200 rounded-sm shadow-sm">
            <div className="px-4 lg:px-6 py-4 border-b border-slate-200 bg-slate-50">
              <h2 className="text-sm lg:text-base text-slate-900">Invoice Information</h2>
            </div>
            <div className="px-4 lg:px-6 py-5">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                <div>
                  <label className="block text-xs text-slate-600 mb-1">Company Invoice Number</label>
                  <p className="text-sm text-slate-900">{fbrData.invoiceNumber}</p>
                </div>
                <div>
                  <label className="block text-xs text-slate-600 mb-1">FBR Invoice Number</label>
                  <p className="text-sm text-slate-900">{fbrData.fbrInvoiceNumber}</p>
                </div>
                <div>
                  <label className="block text-xs text-slate-600 mb-1">Buyer Name</label>
                  <p className="text-sm text-slate-900">{fbrData.buyerName}</p>
                </div>
                <div>
                  <label className="block text-xs text-slate-600 mb-1">Total Invoice Amount</label>
                  <p className="text-sm text-slate-900">
                    PKR {fbrData.totalAmount.toLocaleString('en-PK', { minimumFractionDigits: 2 })}
                  </p>
                </div>
                <div>
                  <label className="block text-xs text-slate-600 mb-1">Sales Tax Amount</label>
                  <p className="text-sm text-slate-900">
                    PKR {fbrData.taxAmount.toLocaleString('en-PK', { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* FBR Integration Details */}
          <div className="bg-white border border-slate-200 rounded-sm shadow-sm">
            <div className="px-4 lg:px-6 py-4 border-b border-slate-200 bg-slate-50">
              <h2 className="text-sm lg:text-base text-slate-900">FBR Integration Details</h2>
            </div>
            <div className="px-4 lg:px-6 py-5">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-slate-600 mb-1">Integrator Reference ID</label>
                  <p className="text-xs lg:text-sm text-slate-900 font-mono bg-slate-50 px-3 py-2 rounded-sm border border-slate-200 break-all">
                    {fbrData.integratorReferenceId}
                  </p>
                </div>
                <div>
                  <label className="block text-xs text-slate-600 mb-1">FBR Acknowledgement ID</label>
                  <p className="text-xs lg:text-sm text-slate-900 font-mono bg-slate-50 px-3 py-2 rounded-sm border border-slate-200 break-all">
                    {fbrData.fbrAcknowledgementId}
                  </p>
                </div>
                <div>
                  <label className="block text-xs text-slate-600 mb-1">Verification Code</label>
                  <p className="text-xs lg:text-sm text-slate-900 font-mono bg-slate-50 px-3 py-2 rounded-sm border border-slate-200 break-all">
                    {fbrData.verificationCode}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* QR Code Section */}
        <div className="xl:col-span-1">
          <div className="bg-white border border-slate-200 rounded-sm shadow-sm xl:sticky xl:top-8">
            <div className="px-4 lg:px-6 py-4 border-b border-slate-200 bg-slate-50">
              <h2 className="text-sm lg:text-base text-slate-900">FBR Verification QR Code</h2>
            </div>
            <div className="px-4 lg:px-6 py-8">
              <div className="flex flex-col items-center">
                <div className="w-48 h-48 bg-slate-100 border-2 border-slate-300 flex items-center justify-center mb-4">
                  <svg viewBox="0 0 100 100" className="w-full h-full p-2">
                    {/* Mock QR Code pattern */}
                    <rect x="0" y="0" width="100" height="100" fill="white" />
                    {[...Array(10)].map((_, i) =>
                      [...Array(10)].map((_, j) => {
                        const shouldFill = (i + j) % 2 === 0 || (i * j) % 3 === 0;
                        return shouldFill ? (
                          <rect
                            key={`${i}-${j}`}
                            x={i * 10}
                            y={j * 10}
                            width="10"
                            height="10"
                            fill="black"
                          />
                        ) : null;
                      })
                    )}
                  </svg>
                </div>
                <p className="text-xs text-center text-slate-600 mb-4">
                  Scan this QR code to verify invoice authenticity with FBR
                </p>
                <div className="w-full bg-slate-50 border border-slate-200 rounded-sm p-3">
                  <p className="text-xs text-slate-600 mb-1 text-center">QR Code Data:</p>
                  <p className="text-xs text-slate-900 font-mono text-center break-all">
                    {fbrData.qrCodeData}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Legal Notice */}
          <div className="bg-amber-50 border border-amber-200 rounded-sm p-4 mt-6">
            <p className="text-xs text-amber-900 leading-relaxed">
              <strong>Legal Notice:</strong> This invoice has been digitally verified and registered with the Federal Board of Revenue (FBR) under the Sales Tax Act 1990. Any tampering or unauthorized modification is a criminal offense under Pakistani tax laws.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}