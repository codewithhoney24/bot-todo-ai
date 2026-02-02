// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        // Custom gradient colors
        gradient: {
          start: '#6366f1',
          middle: '#8b5cf6',
          end: '#06b6d4',
        },
      },
      animation: {
        // Gradient animations
        'gradient-x': 'gradient-x 15s ease infinite',
        'gradient-y': 'gradient-y 15s ease infinite',
        'gradient-xy': 'gradient-xy 15s ease infinite',
        
        // Particle animations
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'float-fast': 'float 4s ease-in-out infinite',
        
        // Grid animations
        'grid-move': 'gridMove 20s linear infinite',
        'grid-shift': 'gridShift 30s linear infinite',
        
        // Border animations
        'gradient-border': 'gradient-border 3s ease infinite',
        'border-pulse': 'border-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        
        // Text animations
        'gradient-text': 'gradient-text 3s ease infinite',
        'text-shimmer': 'text-shimmer 2s ease-in-out infinite',
        
        // Button animations
        'button-glow': 'button-glow 2s ease-in-out infinite',
        'button-pulse': 'button-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        
        // Loading animations
        'ping-slow': 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite',
        'ping-slower': 'ping 4s cubic-bezier(0, 0, 0.2, 1) infinite',
        'bounce-subtle': 'bounce-subtle 2s ease-in-out infinite',
        'bounce-delayed': 'bounce-delayed 1.5s infinite',
        
        // Chatbot animations
        'eye-blink': 'eye-blink 3s ease-in-out infinite',
        'mouth-talk': 'mouth-talk 2s ease-in-out infinite',
        'antenna-bounce': 'antenna-bounce 2s ease-in-out infinite',
        
        // Special effects
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite',
        'spin-slow': 'spin 3s linear infinite',
        'spin-slower': 'spin 4s linear infinite',
        
        // Entrance animations
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'slide-in-left': 'slideInLeft 0.5s ease-out',
        
        // Error animations
        'shake': 'shake 0.5s ease-in-out',
        'shake-slow': 'shake 1s ease-in-out infinite',
        
        // Particle system
        'particle-float': 'particle-float 4s ease-in-out infinite',
        
        // Card animations
        'card-float': 'card-float 3s ease-in-out infinite',
        'card-hover': 'card-hover 0.3s ease-out',
      },
      keyframes: {
        // Gradient animations
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
        'gradient-y': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'center top',
          },
          '50%': {
            'background-size': '400% 400%',
            'background-position': 'center bottom',
          },
        },
        'gradient-xy': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'left top',
          },
          '50%': {
            'background-size': '400% 400%',
            'background-position': 'right bottom',
          },
        },
        
        // Floating animations
        'float': {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(5deg)' },
        },
        
        // Grid animations
        'gridMove': {
          '0%': { 'background-position': '0 0' },
          '100%': { 'background-position': '60px 60px' },
        },
        'gridShift': {
          '0%': { 'background-position': '0 0' },
          '100%': { 'background-position': '80px 80px' },
        },
        
        // Border animations
        'gradient-border': {
          '0%, 100%': { opacity: '0.2' },
          '50%': { opacity: '0.4' },
        },
        'border-pulse': {
          '0%, 100%': { 'border-color': 'rgba(99, 102, 241, 0.3)' },
          '50%': { 'border-color': 'rgba(99, 102, 241, 0.7)' },
        },
        
        // Text animations
        'gradient-text': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        'text-shimmer': {
          '0%': { 'background-position': '-200% 0' },
          '100%': { 'background-position': '200% 0' },
        },
        
        // Button animations
        'button-glow': {
          '0%, 100%': {
            'box-shadow': '0 0 20px rgba(99, 102, 241, 0.5)',
          },
          '50%': {
            'box-shadow': '0 0 40px rgba(99, 102, 241, 0.8)',
          },
        },
        'button-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        
        // Loading animations
        'bounce-subtle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        'bounce-delayed': {
          '0%, 80%, 100%': { transform: 'scale(0)' },
          '40%': { transform: 'scale(1)' },
        },
        
        // Chatbot animations
        'eye-blink': {
          '0%, 90%, 100%': { transform: 'scaleY(1)' },
          '95%': { transform: 'scaleY(0.1)' },
        },
        'mouth-talk': {
          '0%, 100%': { width: '3rem' },
          '50%': { width: '2.5rem' },
        },
        'antenna-bounce': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        
        // Special effects
        'glow-pulse': {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.6' },
        },
        'shimmer': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        
        // Entrance animations
        'fadeIn': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slideUp': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slideDown': {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slideInRight': {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'slideInLeft': {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        
        // Error animations
        'shake': {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-5px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(5px)' },
        },
        
        // Particle system
        'particle-float': {
          '0%, 100%': { transform: 'translateY(0) translateX(0)', opacity: '0.4' },
          '25%': { transform: 'translateY(-15px) translateX(5px)', opacity: '0.8' },
          '50%': { transform: 'translateY(-25px) translateX(-5px)', opacity: '0.4' },
          '75%': { transform: 'translateY(-15px) translateX(5px)', opacity: '0.6' },
        },
        
        // Card animations
        'card-float': {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '33%': { transform: 'translateY(-10px) rotate(1deg)' },
          '66%': { transform: 'translateY(-5px) rotate(-1deg)' },
        },
        'card-hover': {
          '0%': { transform: 'translateY(0) scale(1)' },
          '100%': { transform: 'translateY(-4px) scale(1.02)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-bg': 'linear-gradient(135deg, #0A192F 0%, #0D1B2A 50%, #1A1F2E 100%)',
        'gradient-card': 'linear-gradient(135deg, rgba(13, 27, 42, 0.9) 0%, rgba(10, 25, 47, 0.95) 100%)',
        'gradient-button': 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #06b6d4 100%)',
        'gradient-chatbot': 'linear-gradient(135deg, #0066FF 0%, #0084FF 50%, #00A3FF 100%)',
        'gradient-border': 'linear-gradient(90deg, #6366f1, #8b5cf6, #06b6d4, #8b5cf6, #6366f1)',
        'gradient-grid': 'linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)',
      },
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '24px',
        '3xl': '32px',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(99, 102, 241, 0.5)',
        'glow-lg': '0 0 40px rgba(99, 102, 241, 0.7)',
        'glow-xl': '0 0 60px rgba(99, 102, 241, 0.9)',
        'inner-glow': 'inset 0 2px 4px 0 rgba(255, 255, 255, 0.1)',
        'chatbot': '0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        'neon': '0 0 10px rgba(99, 102, 241, 0.5), 0 0 20px rgba(99, 102, 241, 0.3), 0 0 30px rgba(99, 102, 241, 0.2)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        '4xl': '2.5rem',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
        'display': ['Clash Display', 'Inter', 'sans-serif'],
      },
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'smooth': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'elastic': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '1200': '1200ms',
      },
      scale: {
        '102': '1.02',
        '103': '1.03',
        '98': '0.98',
      },
      blur: {
        'xs': '2px',
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '24px',
        '3xl': '32px',
      },
      opacity: {
        '15': '0.15',
        '35': '0.35',
        '65': '0.65',
        '85': '0.85',
      },
    },
  },
  plugins: [],
}

export default config