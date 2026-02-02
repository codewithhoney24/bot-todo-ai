import React, { useState } from 'react';
import { useRouter } from 'next/router';

export default function LoginPage({ auth }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const result = await auth.login(username, password);
    if (result.success) {
      // Redirect to main chat page after successful login
      router.push('/');
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="bg-slate-800 rounded-xl p-8 w-full max-w-md border border-slate-700 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-100 mb-2">Finance Buddy</h1>
          <p className="text-slate-400">Sign in to manage your finances</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-slate-300 mb-2">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-slate-700 text-slate-100 border border-slate-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-slate-300 mb-2">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-700 text-slate-100 border border-slate-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-900/50 text-red-200 rounded-lg border border-red-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-800 transition-all"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center text-slate-400 text-sm">
          <p>Demo credentials: any username/password combination works</p>
        </div>
      </div>
    </div>
  );
}