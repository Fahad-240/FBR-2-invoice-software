import React from 'react';
import { FileText, DollarSign, CheckCircle2, AlertCircle } from 'lucide-react';

export function Dashboard() {
  const summaryData = [
    {
      title: 'Total Invoices Today',
      value: '12',
      icon: FileText,
      color: 'text-black',
      bgColor: 'bg-slate-100',
    },
    {
      title: 'Total Invoices This Month',
      value: '248',
      icon: FileText,
      color: 'text-slate-600',
      bgColor: 'bg-slate-50',
    },
    {
      title: 'Total Tax Amount (Month)',
      value: 'PKR 1,245,680',
      icon: DollarSign,
      color: 'text-green-700',
      bgColor: 'bg-green-50',
    },
    {
      title: 'FBR Submissions',
      value: '246 Sent',
      subtitle: '2 Pending',
      icon: CheckCircle2,
      color: 'text-green-700',
      bgColor: 'bg-green-50',
    },
  ];

  const recentActivity = [
    { invoice: 'INV-2026-00248', buyer: 'XYZ Corporation', amount: 'PKR 85,400', status: 'Sent', time: '10 mins ago' },
    { invoice: 'INV-2026-00247', buyer: 'ABC Trading Co.', amount: 'PKR 42,300', status: 'Sent', time: '25 mins ago' },
    { invoice: 'INV-2026-00246', buyer: 'Delta Industries', amount: 'PKR 156,900', status: 'Pending', time: '1 hour ago' },
    { invoice: 'INV-2026-00245', buyer: 'Omega Services', amount: 'PKR 28,750', status: 'Sent', time: '2 hours ago' },
  ];

  return (
    <div className="max-w-[1600px]">
      <div className="mb-6">
        <h1 className="text-xl lg:text-2xl text-slate-900 mb-1">Dashboard</h1>
        <p className="text-sm text-slate-600">FBR Digital Invoice Summary</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
        {summaryData.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="bg-white border border-slate-200 rounded-sm p-5 lg:p-6 shadow-sm"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-2.5 rounded-sm ${item.bgColor}`}>
                  <Icon className={`w-5 h-5 lg:w-6 lg:h-6 ${item.color}`} />
                </div>
              </div>
              <h3 className="text-sm text-slate-600 mb-2">{item.title}</h3>
              <p className="text-xl lg:text-2xl text-slate-900 mb-1">{item.value}</p>
              {item.subtitle && (
                <p className="text-xs text-slate-500">{item.subtitle}</p>
              )}
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-white border border-slate-200 rounded-sm shadow-sm">
        <div className="px-4 lg:px-6 py-4 border-b border-slate-200">
          <h2 className="text-base lg:text-lg text-slate-900">Recent Invoice Activity</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs text-slate-600">Invoice Number</th>
                <th className="px-6 py-3 text-left text-xs text-slate-600">Buyer Name</th>
                <th className="px-6 py-3 text-left text-xs text-slate-600">Amount</th>
                <th className="px-6 py-3 text-left text-xs text-slate-600">FBR Status</th>
                <th className="px-6 py-3 text-left text-xs text-slate-600">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentActivity.map((activity, index) => (
                <tr key={index} className="hover:bg-slate-50">
                  <td className="px-6 py-3.5 text-sm text-slate-900">{activity.invoice}</td>
                  <td className="px-6 py-3.5 text-sm text-slate-700">{activity.buyer}</td>
                  <td className="px-6 py-3.5 text-sm text-slate-900">{activity.amount}</td>
                  <td className="px-6 py-3.5">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-sm text-xs ${activity.status === 'Sent'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-amber-100 text-amber-800'
                        }`}
                    >
                      {activity.status === 'Sent' ? (
                        <CheckCircle2 className="w-3 h-3" />
                      ) : (
                        <AlertCircle className="w-3 h-3" />
                      )}
                      {activity.status}
                    </span>
                  </td>
                  <td className="px-6 py-3.5 text-sm text-slate-600">{activity.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}