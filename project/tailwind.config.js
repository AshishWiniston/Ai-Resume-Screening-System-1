/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        obsidian: '#0B0B0B',
        navy: {
          DEFAULT: '#0F172A',
          800: '#1E293B',
          700: '#334155',
          600: '#475569',
        },
        gold: {
          DEFAULT: '#D4AF37',
          light: '#F0D060',
          dark: '#A8880A',
          muted: '#8B7318',
        },
        surface: {
          DEFAULT: '#111827',
          card: '#1A2332',
          hover: '#1F2D42',
          border: 'rgba(212,175,55,0.15)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Sora', 'Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #D4AF37 0%, #F0D060 50%, #A8880A 100%)',
        'navy-gradient': 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
        'hero-gradient': 'radial-gradient(ellipse at 30% 50%, rgba(212,175,55,0.12) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(30,41,59,0.8) 0%, transparent 50%)',
        'card-gradient': 'linear-gradient(135deg, rgba(26,35,50,0.95) 0%, rgba(15,23,42,0.95) 100%)',
        'glow-gold': 'radial-gradient(circle at center, rgba(212,175,55,0.25) 0%, transparent 70%)',
      },
      boxShadow: {
        'gold': '0 0 30px rgba(212,175,55,0.2), 0 4px 20px rgba(0,0,0,0.5)',
        'gold-lg': '0 0 60px rgba(212,175,55,0.3), 0 8px 40px rgba(0,0,0,0.6)',
        'card': '0 4px 24px rgba(0,0,0,0.4), 0 1px 0 rgba(212,175,55,0.1)',
        'card-hover': '0 8px 40px rgba(0,0,0,0.6), 0 0 30px rgba(212,175,55,0.15)',
        'inner-gold': 'inset 0 1px 0 rgba(212,175,55,0.2)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out infinite 2s',
        'float-slow': 'float 8s ease-in-out infinite 1s',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'border-flow': 'borderFlow 3s linear infinite',
        'gradient-shift': 'gradientShift 8s ease-in-out infinite',
        'counter': 'counterUp 2s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'spin-slow': 'spin 8s linear infinite',
        'ping-slow': 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        borderFlow: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
