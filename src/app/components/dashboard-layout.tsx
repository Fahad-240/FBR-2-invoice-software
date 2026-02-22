import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, ListChecks, LogOut, Wifi, Clock, FileSpreadsheet, Package, Menu, X } from 'lucide-react';
import logo from '../../logo.png';

interface DashboardLayoutProps {
  children: React.ReactNode;
  onLogout: () => void;
}

export function DashboardLayout({ children, onLogout }: DashboardLayoutProps) {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

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
      <header className="bg-white text-slate-900 h-16 flex items-center justify-between px-4 lg:px-6 fixed top-0 left-0 right-0 z-30 border-b border-slate-200">
        <div className="flex items-center gap-2">
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 md:hidden hover:bg-slate-100 rounded-sm transition-colors text-slate-600"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <div className="flex items-center">
            <div className="w-24 h-24 md:w-44 md:h-44 flex items-center justify-center">
              <img src={logo} alt="Logo" className="w-full h-full object-contain" />
            </div>
            <h1 className="text-xl md:text-3xl font-bold tracking-tight text-slate-900 -ml-2">N.H Traders</h1>
          </div>
        </div>

        <div className="flex items-center gap-2 lg:gap-4">
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
      <div className="bg-[#f0fdf4] border-b border-emerald-100 h-10 flex items-center justify-between px-4 lg:px-6 fixed top-16 left-0 right-0 z-20">
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
        {/* Mobile Sidebar Overlay */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside className={`
          fixed md:sticky top-[104px] h-[calc(100vh-104px)] bg-white border-r border-slate-200 z-50 transition-all duration-300
          w-64 md:w-48 xl:w-56 left-0 
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}>
          <nav className="p-4">
            <ul className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`flex items-center gap-3 px-4 py-3 rounded-sm transition-colors ${isActive
                        ? 'bg-black text-white'
                        : 'text-slate-700 hover:bg-slate-100'
                        }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Mobile Bottom Section */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-100 md:hidden">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">User</p>
            <p className="text-sm font-bold text-slate-900">Admin User</p>
            <p className="text-xs text-slate-500 mb-4">accountant@abcent.com</p>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 w-full px-4 py-2 border border-slate-200 text-slate-700 rounded-sm hover:bg-slate-50 text-sm font-semibold"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-6 xl:p-8 min-w-0 overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
