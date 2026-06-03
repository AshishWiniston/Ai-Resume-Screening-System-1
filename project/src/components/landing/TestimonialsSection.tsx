import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Head of Talent Acquisition',
    company: 'TechNova Inc.',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?w=80&h=80&fit=crop',
    rating: 5,
    text: 'TalentAI has completely transformed our hiring process. We reduced screening time by 85% and our quality of hire improved dramatically. The AI recommendations are eerily accurate.',
  },
  {
    name: 'Marcus Williams',
    role: 'Senior Recruiter',
    company: 'Global Recruit Partners',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?w=80&h=80&fit=crop',
    rating: 5,
    text: 'The JD matching feature is phenomenal. I can post a job description and get ranked candidates in seconds. It\'s like having a team of 10 sourcers working 24/7.',
  },
  {
    name: 'Priya Sharma',
    role: 'HR Director',
    company: 'FinEdge Capital',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=80&h=80&fit=crop',
    rating: 5,
    text: 'Our time-to-hire dropped from 45 days to 12 days after implementing TalentAI. The analytics dashboard gives us insights we never had before. Absolutely enterprise-grade.',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl lg:text-5xl font-bold mb-4">
            Trusted by{' '}
            <span className="gold-text">World-Class Recruiters</span>
          </h2>
          <p className="text-gray-400 text-lg">Real results from real recruitment teams.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -6 }}
              className="card-base gradient-border p-6 hover:shadow-card-hover hover:border-gold/30 transition-all duration-300"
            >
              <Quote size={32} className="text-gold/30 mb-4" />
              <p className="text-gray-300 text-sm leading-relaxed mb-6">"{t.text}"</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-gold/20"
                  />
                  <div>
                    <div className="font-semibold text-white text-sm">{t.name}</div>
                    <div className="text-gray-500 text-xs">{t.role}</div>
                    <div className="text-gold text-xs font-medium">{t.company}</div>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={14} className="text-gold fill-gold" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
