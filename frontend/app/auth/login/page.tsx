'use client';

import React, { useState } from "react";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { LogIn, UserPlus, ShieldCheck, Mail, Lock } from 'lucide-react';
import Image from 'next/image';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Login logic
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#050505] relative overflow-hidden flex items-center justify-center p-4">

      {/* Background Lighting - Image Colors Matching */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/10 blur-[150px] rounded-full opacity-50" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-600/5 blur-[150px] rounded-full opacity-30" />
      </div>

      {/* Main Grid: gap-4 use kiya hai taake form aur image nazdeek hon */}
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-4 items-center relative z-10">

        {/* LEFT SIDE: Form thoda right ki taraf shift kiya hai (lg:pl-20) */}
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
>
  <Image src="/robo-09.png" alt="Logo" width={30} height={30} loading="eager" style={{ width: '30%', height: '30%' }} />
</motion.div>



             <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tighter mb-2">Welcome Back</h2>
             <p className="text-amber-200/50 text-sm font-medium">Your AI-driven financial journey starts here.</p>
          </div>

          {/* Card Colors adjusted to match image (Dark with Amber Tint) */}
          <Card className="bg-gradient-to-b from-amber-500/[0.07] to-transparent backdrop-blur-3xl border border-amber-500/20 shadow-[0_0_50px_-12px_rgba(245,158,11,0.2)] p-6 sm:p-8 rounded-[2rem] relative overflow-hidden">

            <form onSubmit={handleLogin} className="space-y-4 sm:space-y-5 relative z-10">
              <div className="space-y-1.5">
                <label className="text-[8px] sm:text-[10px] font-black text-amber-500/60 uppercase tracking-[0.2em] ml-1">Email Terminal</label>
                <div className="relative">
                  <Mail className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-3 sm:w-4 h-3 sm:h-4 text-amber-500/40" />
                  <Input
                    type="email"
                    placeholder="ai-agent@finance.com"
                    className="pl-10 sm:pl-12 bg-black/40 border-amber-500/10 focus:border-amber-500/40 focus:ring-amber-500/10 h-10 sm:h-12 rounded-xl text-amber-50 placeholder:text-amber-900/40 transition-all text-sm"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[8px] sm:text-[10px] font-black text-amber-500/60 uppercase tracking-[0.2em] ml-1">Secure Key</label>
                <div className="relative">
                  <Lock className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-3 sm:w-4 h-3 sm:h-4 text-amber-500/40" />
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className="pl-10 sm:pl-12 bg-black/40 border-amber-500/10 focus:border-amber-500/40 focus:ring-amber-500/10 h-10 sm:h-12 rounded-xl text-amber-50 placeholder:text-amber-900/40 transition-all text-sm"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-amber-600 hover:bg-amber-500 text-black font-black h-10 sm:h-12 rounded-xl shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all active:scale-95 flex items-center justify-center gap-2 text-sm"
              >
                {loading ? 'Processing...' : <><LogIn className="w-3 sm:w-4 h-3 sm:h-4" /> Enter Dashboard</>}
              </Button>
            </form>

            <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-amber-500/5 text-center">
              <Link href="/auth/signup">
                <span className="text-[10px] sm:text-xs text-amber-200/30 hover:text-amber-400 transition-colors cursor-pointer font-bold uppercase tracking-widest">
                  Initialize New Account
                </span>
              </Link>
            </div>
          </Card>
        </motion.div>

        {/* RIGHT SIDE: Image Nearer to Form (lg:-ml-10) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="hidden lg:block relative h-[500px] md:h-[600px] w-full order-1 lg:order-2 lg:-ml-10"
        >
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-full h-full"
          >
            {/* Soft Glow behind image matching its colors */}
            <div className="absolute inset-0 bg-amber-600/5 blur-[120px] rounded-full scale-90" />
            <Image
              src="/bg-66.png.png"
              alt="Finance AI"
              fill
              className="object-contain drop-shadow-[0_0_30px_rgba(245,158,11,0.1)]"
              priority
            />
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
}