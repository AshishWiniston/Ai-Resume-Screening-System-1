import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, Play, Sparkles, TrendingUp, Users, CheckCircle } from 'lucide-react';
import DemoVideoModal from '../DemoVideoModal';

const floatingCards = [
  { label: 'AI Match Score', value: '96%', icon: Sparkles, color: 'text-gold', delay: 0 },
  { label: 'Top Candidates', value: '124', icon: Users, color: 'text-blue-400', delay: 0.4 },
  { label: 'Hiring Speed', value: '+85%', icon: TrendingUp, color: 'text-green-400', delay: 0.8 },
];

export default function HeroSection() {
  const [demoOpen, setDemoOpen] = useState(false);
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background glow orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/8 rounded-full blur-3xl animate-glow-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/4 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left: Content */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 glass-gold rounded-full px-4 py-2 mb-6"
          >
            <Sparkles size={14} className="text-gold" />
            <span className="text-gold text-xs font-semibold uppercase tracking-wider">AI-Powered Recruitment Platform</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-5xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-6"
          >
            Hire Smarter
            <br />
            with{' '}
            <span className="gold-text">AI-Powered</span>
            <br />
            Resume Screening
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-gray-400 text-lg leading-relaxed mb-10 max-w-xl"
          >
            Analyze resumes, extract skills, match job descriptions, and identify top talent using advanced Artificial Intelligence. Transform your recruitment pipeline in minutes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex flex-wrap gap-4 mb-12"
          >
            <Link to="/signup" className="btn-gold flex items-center gap-2 text-base py-4 px-8">
              Get Started Free <ChevronRight size={18} />
            </Link>
            <button onClick={() => setDemoOpen(true)} className="btn-ghost flex items-center gap-3 text-base py-4 px-8">
              <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center">
                <Play size={14} className="text-gold ml-0.5" />
              </div>
              Watch Demo
            </button>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-6"
          >
            {['SOC2 Compliant', 'GDPR Ready', 'Enterprise Grade'].map((badge) => (
              <div key={badge} className="flex items-center gap-2">
                <CheckCircle size={16} className="text-gold" />
                <span className="text-gray-400 text-sm">{badge}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: AI Brain Visualization */}
        <div className="relative flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Main AI Brain Circle */}
            <div className="relative w-80 h-80 lg:w-96 lg:h-96 mx-auto">
              {/* Outer rings */}
              <div className="absolute inset-0 rounded-full border border-gold/10 animate-spin-slow" />
              <div className="absolute inset-4 rounded-full border border-gold/15 animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '12s' }} />
              <div className="absolute inset-8 rounded-full border border-gold/20" />

              {/* Pulsing glow */}
              <div className="absolute inset-12 rounded-full bg-gold/5 animate-glow-pulse" />
              <div className="absolute inset-16 rounded-full bg-gold/8 animate-ping-slow" style={{ animationDuration: '4s' }} />

              {/* Center AI Brain SVG */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-40 h-40 rounded-full bg-navy-gradient border border-gold/30 shadow-gold flex items-center justify-center">
                  <AIBrainSVG />
                </div>
              </div>

              {/* Orbit dots */}
              {[0, 72, 144, 216, 288].map((deg, i) => (
                <motion.div
                  key={i}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10 + i * 2, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0"
                  style={{ transformOrigin: 'center' }}
                >
                  <div
                    className="absolute w-3 h-3 rounded-full bg-gold shadow-gold"
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: `rotate(${deg}deg) translateX(${140 + i * 8}px) translateY(-50%)`,
                    }}
                  />
                </motion.div>
              ))}
            </div>

            {/* Floating stat cards */}
            {floatingCards.map((card, i) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.2 }}
                className="absolute glass-gold rounded-2xl p-4 shadow-gold"
                style={{
                  top: i === 0 ? '5%' : i === 1 ? '40%' : '75%',
                  right: i === 1 ? '-20px' : 'auto',
                  left: i === 1 ? 'auto' : i === 0 ? '-20px' : '-30px',
                  animation: `float ${6 + i}s ease-in-out infinite`,
                  animationDelay: `${card.delay}s`,
                }}
              >
                <div className="flex items-center gap-3">
                  <card.icon size={18} className={card.color} />
                  <div>
                    <div className={`font-display font-bold text-xl ${card.color}`}>{card.value}</div>
                    <div className="text-gray-400 text-xs">{card.label}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-gray-600 text-xs tracking-widest uppercase">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-5 h-8 border border-gold/30 rounded-full flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 bg-gold rounded-full" />
        </motion.div>
      </motion.div>

      <DemoVideoModal isOpen={demoOpen} onClose={() => setDemoOpen(false)} />
    </section>
  );
}

function AIBrainSVG() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M40 8C24.536 8 12 20.536 12 36c0 9.2 4.44 17.36 11.32 22.52L22 68h36l-1.32-9.48C63.56 53.36 68 45.2 68 36 68 20.536 55.464 8 40 8z" fill="url(#brain-grad)" opacity="0.9"/>
      <circle cx="28" cy="32" r="4" fill="#D4AF37" opacity="0.8"/>
      <circle cx="40" cy="28" r="4" fill="#D4AF37" opacity="0.9"/>
      <circle cx="52" cy="32" r="4" fill="#D4AF37" opacity="0.8"/>
      <circle cx="34" cy="42" r="3" fill="#F0D060" opacity="0.7"/>
      <circle cx="46" cy="42" r="3" fill="#F0D060" opacity="0.7"/>
      <line x1="28" y1="32" x2="40" y2="28" stroke="#D4AF37" strokeWidth="1.5" opacity="0.6"/>
      <line x1="40" y1="28" x2="52" y2="32" stroke="#D4AF37" strokeWidth="1.5" opacity="0.6"/>
      <line x1="28" y1="32" x2="34" y2="42" stroke="#D4AF37" strokeWidth="1.5" opacity="0.6"/>
      <line x1="52" y1="32" x2="46" y2="42" stroke="#D4AF37" strokeWidth="1.5" opacity="0.6"/>
      <line x1="34" y1="42" x2="46" y2="42" stroke="#D4AF37" strokeWidth="1.5" opacity="0.6"/>
      <defs>
        <linearGradient id="brain-grad" x1="12" y1="8" x2="68" y2="72" gradientUnits="userSpaceOnUse">
          <stop stopColor="#D4AF37" stopOpacity="0.3"/>
          <stop offset="1" stopColor="#0F172A" stopOpacity="0.8"/>
        </linearGradient>
      </defs>
    </svg>
  );
}
