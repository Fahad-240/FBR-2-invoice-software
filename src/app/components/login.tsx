import React, { useState } from 'react';
import logo from '../../logo.png';

interface LoginProps {
  onLogin: () => void;
}

export function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock authentication
    if (username && password) {
      onLogin();
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="bg-white p-12 rounded-sm shadow-md w-full max-w-md border border-slate-200">
        <div className="flex flex-col items-center mb-6">
          <div className="w-56 h-32 flex items-center justify-center overflow-hidden mb-2">
            <img src={logo} alt="FBR Logo" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-3xl text-black tracking-tight">N . H Traders</h1>
          <p className="text-sm text-slate-500 mt-2">Sales Tax Invoice Integration Portal</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="username" className="block text-sm text-slate-700 mb-1.5">
              Username / Email
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-slate-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-slate-900"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm text-slate-700 mb-1.5">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-slate-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-slate-900"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2.5 rounded-sm hover:bg-slate-800 transition-colors"
          >
            Sign In
          </button>
        </form>

        <p className="text-xs text-center text-slate-500 mt-8">
          Authorized Access Only • FBR Compliant System
        </p>
      </div>
    </div>
  );
}
