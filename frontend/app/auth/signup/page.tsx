'use client';

import React, { useState } from "react";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { UserPlus, Mail, Lock, User } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message || 'Signup failed');
        return;
      }

      router.push('/dashboard');
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] relative overflow-hidden flex items-center justify-center p-4">

      {/* Background Lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/10 blur-[150px] rounded-full opacity-50" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-600/5 blur-[150px] rounded-full opacity-30" />
      </div>

      {/* Main Grid */}
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-4 items-center relative z-10">

        {/* LEFT SIDE: Form */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md mx-auto lg:ml-auto lg:mr-0 lg:pl-10 order-2 lg:order-1"
        >
          <div className="text-center lg:text-left mb-6">
            <motion.div
              animate={{ x: [0, 12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block"
            >
              {/* AI Logo Robot */}
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="30" cy="30" r="28" fill="url(#gradient1)" />
                <rect x="18" y="20" width="24" height="20" rx="3" fill="#1a1a1a" />
                <circle cx="24" cy="28" r="3" fill="#f59e0b" />
                <circle cx="36" cy="28" r="3" fill="#f59e0b" />
                <motion.rect
                  x="22" y="35" width="16" height="2" rx="1" fill="#f7f6f5"
                  animate={{ scaleX: [1, 0.8, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  initial={{ scaleX: 1 }}
                />
                <rect x="15" y="18" width="3" height="5" rx="1.5" fill="#f7f6f5" />
                <rect x="42" y="18" width="3" height="5" rx="1.5" fill="#f7f6f5" />
                <defs>
                  <linearGradient id="gradient1" x1="0" y1="0" x2="60" y2="60">
                    <stop offset="0%" stopColor="#7f490b" />
                    <stop offset="100%" stopColor="#7f490b" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#ffff]/70 tracking-tighter mb-2">Join The Future</h2>
            <p className="text-amber-200/50 text-sm font-medium">Create your AI-powered financial account today.</p>
          </div>

          {/* Signup Card */}
          <Card className="bg-gradient-to-b from-amber-500/[0.07] to-transparent backdrop-blur-3xl border border-amber-500/20 shadow-[0_0_50px_-12px_rgba(245,158,11,0.2)] p-6 sm:p-8 rounded-[2rem] relative overflow-hidden">

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm font-medium"
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSignup} className="space-y-3 sm:space-y-4 relative z-10">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-[8px] sm:text-[10px] font-black text-[#ffff]/70 uppercase tracking-[0.2em] ml-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-3 sm:w-4 h-3 sm:h-4 text-[#ffff]/70" />
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="pl-10 sm:pl-12 bg-black/40 border-[#7f490b]/10 focus:border-[#7f490b]/40 focus:ring-[#7f490b]/10 h-10 sm:h-12 rounded-xl text-white placeholder-[#7f490b] transition-all text-sm"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-[8px] sm:text-[10px] font-black text-[#ffff]/70 uppercase tracking-[0.2em] ml-1">Email Terminal</label>
                <div className="relative">
                  <Mail className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-3 sm:w-4 h-3 sm:h-4 text-[#ffff]/70" />
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@finance.com"
                    className="pl-10 sm:pl-12 bg-black/40 border-[#7f490b]/10 focus:border-[#7f490b]/40 focus:ring-[#7f490b]/10 h-10 sm:h-12 rounded-xl text-amber-50 placeholder-[#7f490b] transition-all text-sm"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-[8px] sm:text-[10px] font-black text-[#ffff]/70 uppercase tracking-[0.2em] ml-1">Secure Key</label>
                <div className="relative">
                  <Lock className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-3 sm:w-4 h-3 sm:h-4 text-[#ffff]/70" />
                  <Input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="pl-10 sm:pl-12 bg-black/40 border-[#7f490b]/10 focus:border-[#7f490b]/40 focus:ring-[#7f490b]/10 h-10 sm:h-12 rounded-xl text-amber-50 placeholder-[#7f490b] transition-all text-sm"
                    required
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-1.5">
                <label className="text-[8px] sm:text-[10px] font-black text-[#ffff]/70 uppercase tracking-[0.2em] ml-1">Confirm Key</label>
                <div className="relative">
                  <Lock className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-3 sm:w-4 h-3 sm:h-4 text-[#ffff]/70" />
                  <Input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="pl-10 sm:pl-12 bg-black/40 border-[#7f490b]/10 focus:border-[#7f490b]/40 focus:ring-[#7f490b]/10 h-10 sm:h-12 rounded-xl text-amber-50 placeholder-[#7f490b] transition-all text-sm"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-[#7f490b] hover:bg-[#9c5f1a] text-black font-black h-10 sm:h-12 rounded-xl shadow-[0_0_20px_rgba(127,73,11,0.3)] transition-all active:scale-95 flex items-center justify-center gap-2 mt-4 sm:mt-6 text-sm"
              >
                {loading ? 'Processing...' : <><UserPlus className="w-3 sm:w-4 h-3 sm:h-4" /> Create Account</>}
              </Button>
            </form>

            <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-amber-500/5 text-center">
              <Link href="/auth/login">
                <span className="text-[10px] sm:text-xs text-amber-200/30 hover:text-amber-400 transition-colors cursor-pointer font-bold uppercase tracking-widest">
                  Already Have an Account? Sign In
                </span>
              </Link>
            </div>
          </Card>

          {/* Footer */}
          <p className="text-center text-amber-200/20 text-[10px] sm:text-xs mt-4 sm:mt-6 font-medium">
            Secure Registration • AI-Powered Platform
          </p>
        </motion.div>

        {/* RIGHT SIDE: Animated Robot */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="hidden lg:block relative h-[500px] md:h-[600px] w-full order-1 lg:order-2 lg:-ml-10"
        >
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.05 }}
            className="relative w-full h-full flex items-center justify-center -translate-y-12 cursor-pointer"
          >
            {/* Soft Glow behind robot */}
            <div className="absolute inset-0 bg-orange-500/10 blur-[120px] rounded-full scale-90" />

            {/* AI Finance Robot SVG */}
            <svg width="500" height="500" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_0_40px_rgba(249,115,22,0.3)] transition-all duration-300 hover:drop-shadow-[0_0_60px_rgba(249,115,22,0.5)]">
              {/* Robot Body */}
              <rect x="150" y="180" width="200" height="240" rx="20" fill="url(#bodyGradient)" />
              <rect x="155" y="185" width="190" height="230" rx="15" fill="#0f0f0f" />

              {/* Head */}
              <rect x="180" y="100" width="140" height="100" rx="15" fill="url(#headGradient)" />
              <rect x="185" y="105" width="130" height="90" rx="10" fill="#0f0f0f" />

              {/* Antenna */}
              <motion.line
                x1="250" y1="80" x2="250" y2="100"
                stroke="#efe4cd" strokeWidth="4" strokeLinecap="round"
                animate={{ y1: [75, 85, 75] }}
                transition={{ duration: 2, repeat: Infinity }}
                initial={{ y1: 80 }}
              />
              <motion.circle
                cx="250" cy="75" r="8" fill="#fed7aa"
                animate={{ scale: [1, 1.2, 1], opacity: [1, 0.6, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              {/* Eyes */}
              <motion.circle
                cx="215" cy="140" r="15" fill="#efe4cd"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <motion.circle
                cx="285" cy="140" r="15" fill="#efe4cd"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              />

              {/* Eye Glow */}
              <circle cx="215" cy="140" r="20" fill="#fed7aa" opacity="0.4" />
              <circle cx="285" cy="140" r="20" fill="#fed7aa" opacity="0.4" />

              {/* Mouth/Display */}
              <motion.rect
                x="210" y="165" width="80" height="15" rx="7" fill="#efe4cd"
                animate={{ width: [80, 70, 80] }}
                transition={{ duration: 2, repeat: Infinity }}
                initial={{ width: 80 }}
              />

              {/* Chest Panel */}
              <rect x="200" y="220" width="100" height="80" rx="10" fill="#1a1a1a" />

              {/* FINANCE BOT Text */}
              <text x="250" y="245" fontSize="11" fontWeight="bold" fill="#fed7aa" textAnchor="middle">FINANCE</text>
              <text x="250" y="260" fontSize="11" fontWeight="bold" fill="#fed7aa" textAnchor="middle">BOT</text>

              {/* Digital Display Lines */}
              <motion.line
                x1="220" y1="275" x2="280" y2="275"
                stroke="#fed7aa" strokeWidth="2"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                initial={{ opacity: 0.5 }}
              />
              <motion.line
                x1="220" y1="285" x2="270" y2="285"
                stroke="#fed7aa" strokeWidth="2"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                initial={{ opacity: 1 }}
              />

              {/* Arms */}
              <rect x="100" y="200" width="50" height="120" rx="10" fill="url(#armGradient)" />
              <rect x="350" y="200" width="50" height="120" rx="10" fill="url(#armGradient)" />

              {/* Hands */}
              <motion.circle
                cx="125" cy="330" r="25" fill="#f8e0c5"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <circle cx="125" cy="330" r="30" fill="#f8e0c5" opacity="0.3" />

              <motion.circle
                cx="375" cy="330" r="25" fill="#f8e0c5"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
              />
              <circle cx="375" cy="330" r="30" fill="#f8e0c5" opacity="0.3" />

              {/* Legs */}
              <rect x="180" y="420" width="50" height="60" rx="8" fill="url(#legGradient)" />
              <rect x="270" y="420" width="50" height="60" rx="8" fill="url(#legGradient)" />

              {/* Feet */}
              <ellipse cx="205" cy="485" rx="35" ry="15" fill="#f8e0c5" />
              <ellipse cx="295" cy="485" rx="35" ry="15" fill="#f8e0c5" />

              {/* Decorative Circles */}
              <circle cx="170" cy="250" r="5" fill="#7f4900" />
              <circle cx="330" cy="250" r="5" fill="#7f4900" />
              <circle cx="170" cy="380" r="5" fill="#7f4900" />
              <circle cx="330" cy="380" r="5" fill="#7f4900" />

              {/* Money Symbol */}
              <motion.text
                x="245" y="360"
                fontSize="40"
                fontWeight="bold"
                fill="#f8e0c5"
                animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                $
              </motion.text>

              {/* Gradients */}
              <defs>
                <linearGradient id="bodyGradient" x1="150" y1="180" x2="350" y2="420">
                  <stop offset="0%" stopColor="#7f490b" />
                  <stop offset="50%" stopColor="#edae66" />
                  <stop offset="100%" stopColor="#edae66" />
                </linearGradient>
                <linearGradient id="headGradient" x1="180" y1="100" x2="320" y2="200">
                  <stop offset="0%" stopColor="#7f490b" />
                  <stop offset="50%" stopColor="#edae66" />
                  <stop offset="100%" stopColor="#edae66" />
                </linearGradient>
                <linearGradient id="armGradient" x1="0" y1="200" x2="0" y2="320">
                  <stop offset="0%" stopColor="#7f490b" />
                  <stop offset="50%" stopColor="#edae66" />
                  <stop offset="100%" stopColor="#edae66" />
                </linearGradient>
                <linearGradient id="legGradient" x1="0" y1="420" x2="0" y2="480">
                  <stop offset="0%" stopColor="#7f490b" />
                  <stop offset="50%" stopColor="#edae66" />
                  <stop offset="100%" stopColor="#edae66" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
}