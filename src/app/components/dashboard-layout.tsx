import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, ListChecks, LogOut, Wifi, Clock, FileSpreadsheet, Package } from 'lucide-react';
import logo from '../../logo.png';

interface DashboardLayoutProps {
  children: React.ReactNode;
  onLogout: () => void;
}

export function DashboardLayout({ children, onLogout }: DashboardLayoutProps) {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/create-invoice', label: 'Create Invoice', icon: FileText },
    { path: '/invoices', label: 'Invoice List', icon: ListChecks },
    { path: '/manage-products', label: 'Manage Products', icon: Package },
    { path: '/annex-c', label: 'Annex-C (Return)', icon: FileSpreadsheet },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Fixed Header */}
      <header className="bg-white text-slate-900 h-16 flex items-center justify-between px-4 lg:px-6 fixed top-0 left-0 right-0 z-20 border-b border-slate-200">
        <div className="flex items-center ">
          <div className="w-40 h-40 flex items-center justify-center">
            <img src={logo} alt="Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <h1 className="text-xl lg:text-3xl font-bold tracking-tight text-slate-900">N.H Traders</h1>
            {/* <p className="text-xs text-slate-500 hidden lg:block">FBR Digital Invoice System</p> */}
          </div>
        </div>
        <div className="flex items-center gap-3 lg:gap-4">
          <div className="text-right hidden md:block border-r border-slate-200 pr-4 mr-1">
            <p className="text-sm font-semibold">Admin User</p>
            <p className="text-xs text-slate-500">accountant@abcent.com</p>
          </div>
          <button
            onClick={onLogout}
            className="p-2 hover:bg-slate-100 rounded-sm transition-colors text-slate-600"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Status Bar */}
      <div className="bg-[#f0fdf4] border-b border-emerald-100 h-10 flex items-center justify-between px-4 lg:px-6 fixed top-16 left-0 right-0 z-10">
        <div className="flex items-center gap-2 text-emerald-700">
          <Wifi className="w-4 h-4" />
          <span className="text-sm font-medium">Online</span>
        </div>
        <div className="flex items-center gap-2 text-slate-500">
          <Clock className="w-4 h-4" />
          <span className="text-xs">Last Sync: Just now</span>
        </div>
      </div>

      <div className="flex pt-[104px]">
        {/* Sidebar */}
        <aside className="w-48 xl:w-56 bg-white border-r border-slate-200 h-screen fixed left-0 top-[104px] hidden md:block">
          <nav className="p-3 xl:p-4">
            <ul className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`flex items-center gap-2 xl:gap-3 px-3 xl:px-4 py-2.5 rounded-sm transition-colors ${isActive
                        ? 'bg-black text-white'
                        : 'text-slate-700 hover:bg-slate-100'
                        }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-sm">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 md:ml-48 xl:ml-56 p-4 lg:p-6 xl:p-8 min-w-0 overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}