import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle, ChevronRight, Zap, Crown, Building2 } from 'lucide-react';

const plans = [
  {
    icon: Zap,
    name: 'Starter',
    price: 49,
    period: '/month',
    description: 'Perfect for small teams and individual recruiters.',
    color: 'text-blue-400',
    glow: 'rgba(59,130,246,0.1)',
    features: [
      '100 resume analyses/month',
      'Basic AI skill extraction',
      'Job description matching',
      '5 active job postings',
      'Email support',
      'Standard reports',
    ],
    cta: 'Start Free Trial',
    popular: false,
  },
  {
    icon: Crown,
    name: 'Professional',
    price: 149,
    period: '/month',
    description: 'For growing recruitment teams who need more AI power.',
    color: 'text-gold',
    glow: 'rgba(212,175,55,0.1)',
    features: [
      '1,000 resume analyses/month',
      'Advanced AI candidate ranking',
      'AI Hiring Assistant (ChatBot)',
      '25 active job postings',
      'Priority support',
      'Advanced analytics & reports',
      'API access',
      'Custom scoring weights',
    ],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    icon: Building2,
    name: 'Enterprise',
    price: 499,
    period: '/month',
    description: 'For large organizations with complex hiring needs.',
    color: 'text-purple-400',
    glow: 'rgba(168,85,247,0.1)',
    features: [
      'Unlimited resume analyses',
      'Custom AI model training',
      'White-label solution',
      'Unlimited job postings',
      'Dedicated account manager',
      'Custom integrations (ATS/HRIS)',
      'SSO / SAML support',
      'SLA guarantee',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-24 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gold/4 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 glass-gold rounded-full px-4 py-2 mb-4">
            <Crown size={14} className="text-gold" />
            <span className="text-gold text-xs font-semibold uppercase tracking-wider">Pricing Plans</span>
          </div>
          <h2 className="font-display text-4xl lg:text-5xl font-bold mb-4">
            Simple,{' '}
            <span className="gold-text">Transparent Pricing</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            No hidden fees. Cancel anytime. Start with a 14-day free trial.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 items-start">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -6 }}
              className={`relative card-base p-8 transition-all duration-300 hover:shadow-card-hover ${
                plan.popular
                  ? 'border-gold/40 shadow-gold'
                  : 'hover:border-gold/20'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold-gradient text-obsidian text-xs font-bold px-4 py-1 rounded-full">
                  Most Popular
                </div>
              )}

              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                style={{ background: plan.glow }}
              >
                <plan.icon size={22} className={plan.color} />
              </div>

              <h3 className="font-display font-bold text-xl mb-1">{plan.name}</h3>
              <p className="text-gray-400 text-sm mb-5">{plan.description}</p>

              <div className="flex items-end gap-1 mb-6">
                <span className="font-display font-bold text-4xl text-white">${plan.price}</span>
                <span className="text-gray-400 text-sm mb-1">{plan.period}</span>
              </div>

              <Link
                to="/signup"
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all duration-300 mb-6 ${
                  plan.popular
                    ? 'btn-gold'
                    : 'btn-ghost'
                }`}
              >
                {plan.cta} <ChevronRight size={16} />
              </Link>

              <ul className="space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <CheckCircle size={16} className={`${plan.color} flex-shrink-0 mt-0.5`} />
                    <span className="text-gray-300 text-sm">{f}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
