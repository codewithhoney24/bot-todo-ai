'use client';

import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import {
  ArrowRight, MessageSquare, Sparkles, Rocket, CheckCircle,
  Users, DollarSign, PieChart, Target, CreditCard, LogIn
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeFeature, setActiveFeature] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isChatbotVisible, setIsChatbotVisible] = useState(true);
  const [chatbotMessages, setChatbotMessages] = useState([
    "Welcome! I'm FinanceTodoBot 🤖",
    "How can I help with your finances today?",
    "Ready to track expenses or manage bills? 💰",
    "Let's make your financial life easier! ✨",
    "Ask me anything about money management! 🎯"
  ]);
  const [currentChatIndex, setCurrentChatIndex] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.clientHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    const featureInterval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 6);
    }, 4000);

    const chatInterval = setInterval(() => {
      setCurrentChatIndex((prev) => (prev + 1) % chatbotMessages.length);
      setIsChatbotVisible(false);
      setTimeout(() => setIsChatbotVisible(true), 300);
    }, 3500);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      clearInterval(featureInterval);
      clearInterval(chatInterval);
    };
  }, [chatbotMessages.length]);

  const floatingCoins = Array.from({ length: 25 }).map((_, i) => ({
    id: i,
    size: 15 + (i % 10), // Deterministic size based on index
    left: (i * 13) % 100, // Deterministic position based on index
    top: (i * 7) % 100,   // Deterministic position based on index
    delay: (i % 5),       // Deterministic delay based on index
    duration: 2 + (i % 3), // Deterministic duration based on index
    opacity: 0.3 + (i % 3) * 0.2, // Deterministic opacity based on index
    type: ['coin', 'dollar', 'gem', 'chart'][i % 4] // Deterministic type based on index
  }));

  return (
    <>
    {/* Background & Particles */}
<div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none">
  <div className="absolute top-1/4 -left-64 w-96 h-96 bg-gradient-to-r from-amber-600/20 to-amber-900/10 rounded-full blur-3xl animate-pulse-slow" />
  <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-gradient-to-l from-amber-500/20 to-amber-800/10 rounded-full blur-3xl animate-ping-slow" />
  
  {/* Yahan (coin, i) likhna zaroori tha taake 'i' define ho jaye */}
  {floatingCoins.map((coin, i) => (
    <motion.div
      key={coin.id}
      className="absolute rounded-full"
      style={{
        left: `${coin.left}%`,
        top: `${coin.top}%`,
        width: coin.size,
        height: coin.size,
        opacity: coin.opacity,
        background: i % 2 === 0
          ? 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), rgba(255,255,255,0.2))' // White Balls
          : 'radial-gradient(circle at 30% 30%, rgba(245,158,11,0.8), rgba(180,83,9,0.3))', // Amber Balls
      }}
      initial={{ y: 0, rotate: 0 }}
      animate={{ y: [0, -50, 0], rotate: [0, 360] }}
      transition={{ duration: coin.duration, repeat: Infinity, ease: 'easeInOut' }}
    />
  ))}
</div>

      {/* Navigation */}
      <motion.nav className="sticky top-0 z-40 bg-background/90 backdrop-blur-lg border-b border-border/40 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-amber-900 flex items-center justify-center shadow-lg text-amber-100">
              <DollarSign className="w-5 h-5" />
            </div>
            <span className="font-bold text-lg bg-gradient-to-r from-amber-600 to-amber-200 bg-clip-text text-transparent">FinanceTodoBot</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />
            <Link href="/auth/login">
              <Button size="sm" className="bg-amber-400 text-amber-900 font-bold transition-all duration-300 ease-out hover:bg-amber-500 hover:text-white">
                Log In
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button size="sm" className="bg-gradient-to-r from-amber-500 to-amber-200 text-amber-900 font-bold transition-all duration-300 ease-out hover:from-amber-700 hover:to-amber-600 hover:text-white">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <div ref={heroRef} className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">

            {/* Left Side: BIG IMAGE (Transparent & Moving) */}
            <motion.div
              initial={{ opacity: 0, x: -50, y: 0 }}
              animate={{
                opacity: 1,
                x: 0,
                y: [0, -20, 0],
              }}
              transition={{
                opacity: { duration: 0.8 },
                x: { duration: 0.8 },
                y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
              }}
              className="relative flex justify-center"
            >
              <div className="absolute inset-0 bg-amber-600/10 blur-3xl rounded-full" />
              <div className="relative w-full max-w-[300px] sm:max-w-[400px] md:max-w-[550px] mx-auto aspect-square">
                <Image
                  src="/sto-077.png"
                  alt="Financial Strategy"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </motion.div>

            {/* Right Side: ORIGINAL Interactive Card */}
            <motion.div initial={{ opacity: 0, x: 50, y: 0 }} animate={{ opacity: 1, x: 0, y: 0 }} className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-600/10 via-amber-900/5 to-transparent rounded-3xl blur-3xl animate-pulse-slow" />

              <Link href="/auth/login">
                <div className="relative bg-gradient-to-br from-background to-card border-2 border-amber-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-sm cursor-pointer hover:scale-[1.01] transition-transform">
                  <div className="flex items-center gap-3 mb-4 sm:mb-6">
                    <motion.div initial={{ y: 0 }} animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-amber-800 rounded-full blur-md opacity-50" />
                      <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-amber-500/30">
                        <Image src="/robo-09.png" alt="AI Robot" fill className="object-cover" loading="eager" style={{ width: '100%', height: '100%' }} />
                      </div>
                    </motion.div>
                    <div>
                      <h3 className="font-bold text-lg sm:text-xl text-foreground">FinanceTodoBot</h3>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                        <p className="text-xs sm:text-sm text-muted-foreground">AI Assistant • Online</p>
                      </div>
                    </div>
                  </div>

                <div className="space-y-4 min-h-[140px] sm:min-h-[160px] relative">
  <AnimatePresence mode="wait">
    <motion.div
      key={currentChatIndex}
      className="space-y-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Pehla Message (Bot) */}
      <motion.div
        initial={{ opacity: 0, x: -20, y: 5 }}
        animate={{
          opacity: 1,
          x: 0,
          y: [0, -5, 0] // Halka sa floating motion
        }}
        transition={{
          duration: 0.5,
          y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
        }}
        className="flex items-start gap-2 sm:gap-3"
      >
        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-600 shrink-0 shadow-sm">
          <MessageSquare className="w-3 sm:w-4 h-3 sm:h-4" />
        </div>
        <div className="bg-amber-500/10 backdrop-blur-sm rounded-2xl rounded-tl-none p-3 sm:p-4 max-w-[75%] text-xs sm:text-sm border border-amber-500/10 shadow-sm">
          {chatbotMessages[currentChatIndex]}
        </div>
      </motion.div>

      {/* Dusra Message (Tip/Sub-text) */}
      <motion.div
        initial={{ opacity: 0, x: -20, y: 5 }}
        animate={{
          opacity: 1,
          x: 0,
          y: [0, 5, 0] // Opposite direction mein floating motion
        }}
        transition={{
          duration: 0.5,
          delay: 0.2, // Thora ruk kar ayega
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }}
        className="flex items-start gap-2 sm:gap-3 ml-3 sm:ml-4" // Thora offset diya hai
      >
        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-amber-400/10 flex items-center justify-center text-amber-500 shrink-0">
          <Sparkles className="w-2.5 sm:w-3 h-2.5 sm:h-3" />
        </div>
        <motion.div
  initial={{ opacity: 0, x: -20 }}
  animate={{
    opacity: 1,
    x: 0,
    y: [0, 5, 0]
  }}
  transition={{
    duration: 0.5,
    delay: 0.3,
    y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
  }}
  className="flex items-start gap-2 sm:gap-3 ml-5 sm:ml-6"
>
  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-br from-amber-500/20 to-amber-200/10 flex items-center justify-center text-amber-500 shrink-0 border border-amber-500/20 shadow-inner">
    <Sparkles className="w-2.5 sm:w-3 h-2.5 sm:h-3 animate-pulse" />
  </div>

  <div className="relative bg-gradient-to-r from-amber-500/5 to-transparent backdrop-blur-md rounded-2xl rounded-tl-none p-2.5 sm:p-3 max-w-[75%] border border-white/10 shadow-lg">
    <div className="flex flex-col gap-1">
      <span className="text-[10px] sm:text-[11px] font-medium text-amber-600/80 dark:text-amber-400/80 uppercase tracking-wider">
        Smart Suggestion
      </span>
      <p className="text-[10px] sm:text-[12px] text-muted-foreground leading-relaxed">
        {currentChatIndex % 2 === 0
          ? "Analyzing your spending patterns... 📊"
          : "Searching for better investment deals... 💰"}
      </p>

      {/* Typing Indicator Dots */}
      <div className="flex gap-1 mt-1">
        {[0, 1, 2].map((dot) => (
          <motion.div
            key={dot}
            initial={{ opacity: 0.3 }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: dot * 0.2 }}
            className="w-1 h-1 bg-amber-500/50 rounded-full"
          />
        ))}
      </div>
    </div>
  </div>
</motion.div>
      </motion.div>
    </motion.div>
  </AnimatePresence>
</div>

                 <div className="grid grid-cols-2 gap-2 sm:gap-3 mt-4 sm:mt-6">
  {[
    { icon: DollarSign, label: 'Add Bill', color: 'from-amber-500/30 to-amber-600/10', iconColor: 'text-amber-500' },
    { icon: PieChart, label: 'Show Budget', color: 'from-orange-500/30 to-orange-600/10', iconColor: 'text-orange-500' },
    { icon: Target, label: 'Set Goal', color: 'from-yellow-500/30 to-yellow-600/10', iconColor: 'text-yellow-500' },
    { icon: CreditCard, label: 'Track Expense', color: 'from-amber-600/30 to-amber-700/10', iconColor: 'text-amber-600' },
  ].map((action, i) => (
    <motion.div
      key={i}
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.1 }}
      className={cn(
        "relative group cursor-pointer overflow-hidden",
        "bg-gradient-to-br p-[1px] rounded-xl border border-white/10 shadow-md"
      )}
    >
      {/* Dynamic Background Glow - Thoda zyada light color diya hai */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-br opacity-20 group-hover:opacity-40 transition-opacity duration-500",
        action.color
      )} />

      {/* Content Layer */}
      <div className="relative bg-amber-500/[0.03] dark:bg-white/[0.02] backdrop-blur-md py-2 px-2 sm:py-2.5 sm:px-3 rounded-[11px] flex items-center gap-1.5 sm:gap-2 group-hover:bg-amber-500/[0.08] transition-colors duration-500">

        {/* Icon Container with soft background */}
        <div className={cn(
          "p-1 sm:p-1.5 rounded-lg bg-background/80 shadow-sm border border-white/5 group-hover:scale-110 transition-transform duration-500",
          action.iconColor
        )}>
          <action.icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
        </div>

        {/* Label */}
        <span className="text-[12px] sm:text-[14px] md:text-[16px] font-bold text-foreground/70 group-hover:text-foreground transition-colors tracking-tight">
          {action.label}
        </span>

        {/* Bottom subtle shine line */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </motion.div>
  ))}
</div>
                  <div className="flex justify-center gap-1.5 sm:gap-2 mt-4 sm:mt-6">
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className={cn("w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full transition-all", i === activeFeature ? "bg-amber-500 w-3 sm:w-4" : "bg-muted")} />
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      <footer className="border-t border-amber-500/10 py-6 sm:py-8 text-center">
        <p className="text-xs sm:text-sm text-muted-foreground">© 2026 FinanceTodoBot. Built with AI for smarter management.</p>
      </footer>

      <style jsx global>{`
        .animate-pulse-slow { animation: pulse 3s infinite; }
        .animate-ping-slow { animation: ping 3s infinite; }
      `}</style>
    </>
  );
}