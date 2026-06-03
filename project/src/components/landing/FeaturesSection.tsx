import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Upload, Brain, Code2, BarChart3, Trophy, Bell,
  MessageSquareText, LineChart, Shield
} from 'lucide-react';

const features = [
  {
    icon: Upload,
    title: 'Resume Upload',
    description: 'Drag & drop PDF and DOCX resumes with instant AI processing and progress tracking.',
    color: 'text-blue-400',
    glow: 'rgba(59,130,246,0.15)',
  },
  {
    icon: Brain,
    title: 'AI Skill Extraction',
    description: 'Automatically extract 200+ skills, technologies, and competencies from every resume.',
    color: 'text-gold',
    glow: 'rgba(212,175,55,0.15)',
  },
  {
    icon: Code2,
    title: 'Resume Parsing',
    description: 'Intelligent parsing of education, experience, certifications, and contact information.',
    color: 'text-purple-400',
    glow: 'rgba(168,85,247,0.15)',
  },
  {
    icon: Trophy,
    title: 'Candidate Ranking',
    description: 'AI-powered ranking system that scores and orders candidates by suitability.',
    color: 'text-gold',
    glow: 'rgba(212,175,55,0.15)',
  },
  {
    icon: BarChart3,
    title: 'JD Matching',
    description: 'Match resumes against job descriptions with precise skill gap analysis.',
    color: 'text-green-400',
    glow: 'rgba(34,197,94,0.15)',
  },
  {
    icon: LineChart,
    title: 'AI Analytics',
    description: 'Deep recruitment analytics with hiring trends, success rates, and performance KPIs.',
    color: 'text-cyan-400',
    glow: 'rgba(34,211,238,0.15)',
  },
  {
    icon: MessageSquareText,
    title: 'AI Hiring Assistant',
    description: 'ChatGPT-style AI assistant for interview questions, hiring recommendations, and insights.',
    color: 'text-orange-400',
    glow: 'rgba(251,146,60,0.15)',
  },
  {
    icon: Shield,
    title: 'Recruiter Dashboard',
    description: 'Enterprise-grade dashboard with all recruitment activities in one centralized view.',
    color: 'text-red-400',
    glow: 'rgba(248,113,113,0.15)',
  },
  {
    icon: Bell,
    title: 'Smart Notifications',
    description: 'Real-time alerts for new applications, AI recommendations, and interview schedules.',
    color: 'text-pink-400',
    glow: 'rgba(244,114,182,0.15)',
  },
];

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group card-base gradient-border p-6 cursor-pointer hover:border-gold/40 transition-all duration-300 hover:shadow-card-hover"
    >
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
        style={{ background: feature.glow }}
      >
        <feature.icon size={26} className={feature.color} />
      </div>
      <h3 className="font-display font-semibold text-lg mb-2 text-white group-hover:text-gold transition-colors duration-300">
        {feature.title}
      </h3>
      <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>

      {/* Hover glow line */}
      <div
        className="mt-4 h-0.5 w-0 group-hover:w-full transition-all duration-500 rounded-full"
        style={{ background: `linear-gradient(90deg, transparent, ${feature.glow.replace('0.15', '0.8')}, transparent)` }}
      />
    </motion.div>
  );
}

export default function FeaturesSection() {
  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true });

  return (
    <section id="features" className="py-24 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gold/3 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 glass-gold rounded-full px-4 py-2 mb-4">
            <Brain size={14} className="text-gold" />
            <span className="text-gold text-xs font-semibold uppercase tracking-wider">Platform Features</span>
          </div>
          <h2 className="font-display text-4xl lg:text-5xl font-bold mb-4">
            Everything You Need to{' '}
            <span className="gold-text">Hire Smarter</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A complete AI recruitment suite designed for enterprise teams who demand precision, speed, and intelligence.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
