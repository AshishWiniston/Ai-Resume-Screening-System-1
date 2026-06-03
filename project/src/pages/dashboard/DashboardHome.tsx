import { motion } from 'framer-motion';
import { Users, Briefcase, Brain, Calendar, TrendingUp, TrendingDown, FileText, Trophy, Zap, Clock } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';

const weekData = [
  { day: 'Mon', candidates: 24 },
  { day: 'Tue', candidates: 38 },
  { day: 'Wed', candidates: 31 },
  { day: 'Thu', candidates: 52 },
  { day: 'Fri', candidates: 47 },
  { day: 'Sat', candidates: 19 },
  { day: 'Sun', candidates: 28 },
];

const topCandidates = [
  { name: 'Emily Chen', role: 'Senior React Developer', score: 96, avatar: 'EC', color: 'bg-blue-500' },
  { name: 'Marcus Johnson', role: 'Full Stack Engineer', score: 93, avatar: 'MJ', color: 'bg-green-500' },
  { name: 'Priya Patel', role: 'Data Scientist', score: 91, avatar: 'PP', color: 'bg-purple-500' },
  { name: 'Alex Rivera', role: 'DevOps Engineer', score: 88, avatar: 'AR', color: 'bg-orange-500' },
  { name: 'Sarah Kim', role: 'Product Manager', score: 85, avatar: 'SK', color: 'bg-pink-500' },
];

const recentActivity = [
  { action: 'Resume uploaded', detail: 'Emily Chen - React Developer', time: '2m ago', icon: FileText, color: 'text-blue-400' },
  { action: 'AI Analysis complete', detail: 'Marcus Johnson scored 93/100', time: '8m ago', icon: Brain, color: 'text-gold' },
  { action: 'Interview scheduled', detail: 'Priya Patel - Data Scientist', time: '1h ago', icon: Calendar, color: 'text-green-400' },
  { action: 'Candidate shortlisted', detail: 'Alex Rivera - DevOps', time: '2h ago', icon: Trophy, color: 'text-gold' },
  { action: 'Job posted', detail: 'Senior Frontend Engineer', time: '4h ago', icon: Briefcase, color: 'text-purple-400' },
];

const statsCards = [
  { label: 'Total Candidates', value: '2,847', change: '+12.5%', up: true, icon: Users, color: 'text-blue-400', glow: 'rgba(59,130,246,0.1)' },
  { label: 'Active Jobs', value: '18', change: '+3', up: true, icon: Briefcase, color: 'text-gold', glow: 'rgba(212,175,55,0.1)' },
  { label: 'AI Accuracy', value: '98.2%', change: '+0.4%', up: true, icon: Brain, color: 'text-green-400', glow: 'rgba(34,197,94,0.1)' },
  { label: 'Interviews Today', value: '12', change: '-2', up: false, icon: Calendar, color: 'text-purple-400', glow: 'rgba(168,85,247,0.1)' },
];

function StatCard({ stat, index }: { stat: typeof statsCards[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="stat-card group"
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
          style={{ background: stat.glow }}
        >
          <stat.icon size={22} className={stat.color} />
        </div>
        <div className={`flex items-center gap-1 text-xs font-medium ${stat.up ? 'text-green-400' : 'text-red-400'}`}>
          {stat.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {stat.change}
        </div>
      </div>
      <div className="font-display font-bold text-3xl text-white mb-1">{stat.value}</div>
      <div className="text-gray-400 text-sm">{stat.label}</div>
    </motion.div>
  );
}

export default function DashboardHome() {
  return (
    <div className="space-y-6">
      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h2 className="font-display font-bold text-2xl">Good morning, Recruiter</h2>
          <p className="text-gray-400 text-sm mt-1">Here's your recruitment overview for today.</p>
        </div>
        <div className="flex items-center gap-2 glass-gold rounded-xl px-4 py-2">
          <Clock size={14} className="text-gold" />
          <span className="text-gold text-sm font-medium">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </span>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statsCards.map((s, i) => <StatCard key={s.label} stat={s} index={i} />)}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Weekly Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 card-base p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-display font-semibold text-white">Candidate Activity</h3>
              <p className="text-gray-400 text-sm">This week's resume submissions</p>
            </div>
            <div className="flex items-center gap-2 text-green-400 text-sm">
              <TrendingUp size={14} />
              +18% vs last week
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={weekData}>
              <defs>
                <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#D4AF37" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="candidates"
                stroke="#D4AF37"
                strokeWidth={2}
                fill="url(#goldGrad)"
              />
              <Tooltip
                contentStyle={{ background: '#1A2332', border: '1px solid rgba(212,175,55,0.2)', borderRadius: 8, color: 'white', fontSize: 12 }}
                labelStyle={{ color: '#D4AF37' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="card-base p-6"
        >
          <h3 className="font-display font-semibold text-white mb-5">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((a, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-surface-hover flex items-center justify-center flex-shrink-0 mt-0.5">
                  <a.icon size={14} className={a.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white text-sm font-medium">{a.action}</div>
                  <div className="text-gray-500 text-xs truncate">{a.detail}</div>
                </div>
                <span className="text-gray-600 text-xs flex-shrink-0">{a.time}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Top Candidates */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="card-base p-6"
      >
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-display font-semibold text-white">Top AI-Ranked Candidates</h3>
            <p className="text-gray-400 text-sm">Highest scored candidates this week</p>
          </div>
          <button className="text-gold text-sm hover:text-gold-light transition-colors flex items-center gap-1">
            View All <Zap size={14} />
          </button>
        </div>
        <div className="space-y-3">
          {topCandidates.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.45 + i * 0.05 }}
              className="flex items-center gap-4 p-3 rounded-xl hover:bg-surface-hover transition-colors group cursor-pointer"
            >
              <div className="text-2xl font-display font-bold text-gray-600 w-8 text-center">
                {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`}
              </div>
              <div className={`w-10 h-10 rounded-xl ${c.color} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                {c.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white font-medium text-sm group-hover:text-gold transition-colors">{c.name}</div>
                <div className="text-gray-500 text-xs">{c.role}</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-24 h-1.5 bg-surface-hover rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gold-gradient rounded-full"
                    style={{ width: `${c.score}%` }}
                  />
                </div>
                <span className="text-gold font-bold text-sm w-10 text-right">{c.score}%</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
