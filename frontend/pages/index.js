import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import ChatInterface from '../components/ChatInterface';

export default function HomePage({ auth }) {
  const router = useRouter();
  const [userId, setUserId] = React.useState(null);

  // Check if user is authenticated
  useEffect(() => {
    if (!auth.user) {
      // Redirect to login if not authenticated
      router.push('/login');
    } else {
      setUserId(auth.user.id);
    }
  }, [auth.user, router]);

  if (!auth.user) {
    // Show loading state while redirecting
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <p className="text-slate-400">Redirecting to login...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200">
      <Head>
        <title>Finance Todo AI Chatbot</title>
        <meta name="description" content="Manage your finances with AI assistance" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-slate-800 border-b border-slate-700 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-slate-100">Finance Buddy</h1>
          <div className="flex items-center space-x-4">
            <span className="text-slate-300">Welcome, {auth.user.id}</span>
            <button
              onClick={auth.logout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-100 mb-2">Finance Buddy</h1>
          <p className="text-slate-400">Your AI assistant for managing finances</p>
        </div>

        <div className="bg-slate-800 rounded-xl shadow-lg overflow-hidden border border-slate-700" style={{ height: '70vh' }}>
          <ChatInterface userId={userId} />
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-800 p-4 rounded-lg shadow text-center border border-slate-700">
            <h3 className="font-semibold text-slate-200">Add Tasks</h3>
            <p className="text-sm text-slate-400">Easily add bills, budgets, and expenses</p>
          </div>
          <div className="bg-slate-800 p-4 rounded-lg shadow text-center border border-slate-700">
            <h3 className="font-semibold text-slate-200">Track Finances</h3>
            <p className="text-sm text-slate-400">Keep track of your spending and savings</p>
          </div>
          <div className="bg-slate-800 p-4 rounded-lg shadow text-center border border-slate-700">
            <h3 className="font-semibold text-slate-200">Smart Insights</h3>
            <p className="text-sm text-slate-400">Get AI-powered financial insights</p>
          </div>
        </div>
      </main>

      <footer className="bg-slate-800 border-t border-slate-700 py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-slate-400">
          <p>© {new Date().getFullYear()} Finance Todo AI Chatbot. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}