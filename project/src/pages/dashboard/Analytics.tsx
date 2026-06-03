import { motion } from 'framer-motion';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
  ResponsiveContainer, Tooltip, XAxis, YAxis, Legend
} from 'recharts';

const hiringTrends = [
  { month: 'Jan', applications: 120, hires: 8, interviews: 32 },
  { month: 'Feb', applications: 145, hires: 11, interviews: 38 },
  { month: 'Mar', applications: 98, hires: 7, interviews: 24 },
  { month: 'Apr', applications: 178, hires: 14, interviews: 45 },
  { month: 'May', applications: 210, hires: 18, interviews: 52 },
  { month: 'Jun', applications: 195, hires: 15, interviews: 48 },
];

const skillDemand = [
  { skill: 'React', demand: 85 },
  { skill: 'Python', demand: 78 },
  { skill: 'AWS', demand: 72 },
  { skill: 'Node.js', demand: 68 },
  { skill: 'TypeScript', demand: 65 },
  { skill: 'Docker', demand: 58 },
  { skill: 'SQL', demand: 55 },
];

const deptHiring = [
  { name: 'Engineering', value: 45, color: '#D4AF37' },
  { name: 'Data/AI', value: 20, color: '#3B82F6' },
  { name: 'Product', value: 15, color: '#8B5CF6' },
  { name: 'Design', value: 10, color: '#EC4899' },
  { name: 'Operations', value: 10, color: '#10B981' },
];

const radarData = [
  { metric: 'Speed', score: 92 },
  { metric: 'Accuracy', score: 98 },
  { metric: 'Quality', score: 88 },
  { metric: 'Diversity', score: 75 },
  { metric: 'Retention', score: 83 },
  { metric: 'Satisfaction', score: 90 },
];

const tooltipStyle = {
  contentStyle: { background: '#1A2332', border: '1px solid rgba(212,175,55,0.2)', borderRadius: 8, color: 'white', fontSize: 12 },
  labelStyle: { color: '#D4AF37' },
};

function ChartCard({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-base p-5"
    >
      <div className="mb-4">
        <h3 className="font-semibold text-white">{title}</h3>
        {subtitle && <p className="text-gray-400 text-xs mt-0.5">{subtitle}</p>}
      </div>
      {children}
    </motion.div>
  );
}

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display font-bold text-2xl text-white">Recruitment Analytics</h2>
        <p className="text-gray-400 text-sm mt-1">Deep insights into your hiring pipeline and team performance.</p>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Avg. Time to Hire', value: '12 days', change: '-33%', color: 'text-green-400' },
          { label: 'Offer Acceptance Rate', value: '87%', change: '+5%', color: 'text-green-400' },
          { label: 'Interview Success Rate', value: '62%', change: '+8%', color: 'text-green-400' },
          { label: 'Recruiter Efficiency', value: '94%', change: '+12%', color: 'text-green-400' },
        ].map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.07 }}
            className="stat-card text-center"
          >
            <div className="font-display font-bold text-2xl text-white mb-1">{kpi.value}</div>
            <div className="text-gray-400 text-xs mb-1">{kpi.label}</div>
            <div className={`text-xs font-semibold ${kpi.color}`}>{kpi.change} vs last quarter</div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Hiring Trends */}
        <ChartCard title="Hiring Trends" subtitle="Applications, interviews, and hires over 6 months">
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={hiringTrends}>
              <defs>
                <linearGradient id="appGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#D4AF37" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="intGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" {...tooltipStyle.labelStyle} />
              <Tooltip {...tooltipStyle} />
              <Legend />
              <Area type="monotone" dataKey="applications" stroke="#D4AF37" fill="url(#appGrad)" strokeWidth={2} name="Applications" />
              <Area type="monotone" dataKey="interviews" stroke="#3B82F6" fill="url(#intGrad)" strokeWidth={2} name="Interviews" />
              <Area type="monotone" dataKey="hires" stroke="#10B981" fill="none" strokeWidth={2} name="Hires" strokeDasharray="4 2" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Department Distribution */}
        <ChartCard title="Hiring by Department" subtitle="Current open positions distribution">
          <div className="flex items-center gap-6">
            <ResponsiveContainer width="50%" height={180}>
              <PieChart>
                <Pie data={deptHiring} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                  {deptHiring.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip {...tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2.5 flex-1">
              {deptHiring.map((d) => (
                <div key={d.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm flex-shrink-0" style={{ background: d.color }} />
                  <span className="text-gray-400 text-xs flex-1">{d.name}</span>
                  <span className="text-white text-xs font-semibold">{d.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </ChartCard>

        {/* Skill Demand */}
        <ChartCard title="Top Skills in Demand" subtitle="Most requested skills across all job postings">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={skillDemand} layout="vertical" barCategoryGap="20%">
              <XAxis type="number" domain={[0, 100]} />
              <YAxis type="category" dataKey="skill" width={70} />
              <Tooltip {...tooltipStyle} />
              <Bar dataKey="demand" radius={[0, 4, 4, 0]}>
                {skillDemand.map((_, i) => (
                  <Cell key={i} fill={`rgba(212,175,55,${0.4 + (skillDemand.length - i) * 0.08})`} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Radar */}
        <ChartCard title="Recruiter Performance" subtitle="AI-assessed recruitment quality metrics">
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="rgba(255,255,255,0.05)" />
              <PolarAngleAxis dataKey="metric" tick={{ fill: '#9CA3AF', fontSize: 11 }} />
              <Radar name="Score" dataKey="score" stroke="#D4AF37" fill="#D4AF37" fillOpacity={0.15} strokeWidth={2} />
              <Tooltip {...tooltipStyle} />
            </RadarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}
