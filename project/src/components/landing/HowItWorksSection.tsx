import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Upload, Brain, Zap, Search, Star, Trophy, CheckCircle2 } from 'lucide-react';

const steps = [
  { icon: Upload, title: 'Upload Resume', desc: 'Drop PDF or DOCX files. Supports batch uploads for high-volume hiring.', color: 'text-blue-400', bg: 'rgba(59,130,246,0.1)' },
  { icon: Brain, title: 'AI Reads Resume', desc: 'Advanced NLP models parse and understand resume content deeply.', color: 'text-gold', bg: 'rgba(212,175,55,0.1)' },
  { icon: Zap, title: 'Extract Skills', desc: '200+ skills, technologies, certifications and experience levels extracted.', color: 'text-yellow-400', bg: 'rgba(234,179,8,0.1)' },
  { icon: Search, title: 'Match Job Description', desc: 'Semantic matching compares candidate profile against your JD requirements.', color: 'text-purple-400', bg: 'rgba(168,85,247,0.1)' },
  { icon: Star, title: 'Generate Score', desc: 'AI generates a comprehensive suitability score from 0-100.', color: 'text-orange-400', bg: 'rgba(251,146,60,0.1)' },
  { icon: Trophy, title: 'Rank Candidates', desc: 'Automatic ranking places the best-fit candidates at the top.', color: 'text-gold', bg: 'rgba(212,175,55,0.1)' },
  { icon: CheckCircle2, title: 'Recruiter Reviews', desc: 'Recruiters review AI insights, shortlist, and schedule interviews instantly.', color: 'text-green-400', bg: 'rgba(34,197,94,0.1)' },
];

export default function HowItWorksSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="solutions" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 glass-gold rounded-full px-4 py-2 mb-4">
            <Zap size={14} className="text-gold" />
            <span className="text-gold text-xs font-semibold uppercase tracking-wider">How It Works</span>
          </div>
          <h2 className="font-display text-4xl lg:text-5xl font-bold mb-4">
            From Resume to{' '}
            <span className="gold-text">Hire in Minutes</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Our AI pipeline processes resumes end-to-end, eliminating manual screening and bias from your recruitment process.
          </p>
        </motion.div>

        <div ref={ref} className="relative">
          {/* Center vertical line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/30 to-transparent hidden lg:block" />

          <div className="space-y-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className={`flex items-center gap-8 ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
              >
                {/* Card */}
                <div className="flex-1 card-base gradient-border p-6 hover:shadow-card-hover hover:border-gold/30 transition-all duration-300 group">
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                      style={{ background: step.bg }}
                    >
                      <step.icon size={22} className={step.color} />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-white text-lg mb-1">{step.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </div>

                {/* Center step number */}
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gold-gradient text-obsidian font-display font-bold text-lg flex items-center justify-center shadow-gold z-10 hidden lg:flex">
                  {i + 1}
                </div>

                {/* Spacer for alignment */}
                <div className="flex-1 hidden lg:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
