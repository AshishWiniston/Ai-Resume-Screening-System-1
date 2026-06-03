import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, ChevronDown, Star, Mail, Calendar, Briefcase } from 'lucide-react';

const candidates = [
  { id: 1, name: 'Emily Chen', role: 'Senior React Developer', score: 96, skills: ['React', 'TypeScript', 'AWS', 'Node.js'], experience: '6 years', education: 'Stanford', status: 'Shortlisted', avatar: 'EC', color: '#3B82F6' },
  { id: 2, name: 'Marcus Johnson', role: 'Full Stack Engineer', score: 93, skills: ['Vue.js', 'Python', 'Docker', 'Kubernetes'], experience: '4 years', education: 'MIT', status: 'In Review', avatar: 'MJ', color: '#10B981' },
  { id: 3, name: 'Priya Patel', role: 'Data Scientist', score: 91, skills: ['Python', 'ML', 'TensorFlow', 'SQL'], experience: '5 years', education: 'IIT', status: 'Interview Scheduled', avatar: 'PP', color: '#8B5CF6' },
  { id: 4, name: 'Alex Rivera', role: 'DevOps Engineer', score: 88, skills: ['AWS', 'Terraform', 'Kubernetes', 'CI/CD'], experience: '5 years', education: 'UCLA', status: 'In Review', avatar: 'AR', color: '#F97316' },
  { id: 5, name: 'Sarah Kim', role: 'Product Manager', score: 85, skills: ['Agile', 'Jira', 'SQL', 'Analytics'], experience: '7 years', education: 'Harvard', status: 'Shortlisted', avatar: 'SK', color: '#EC4899' },
  { id: 6, name: 'David Lee', role: 'Backend Engineer', score: 82, skills: ['Java', 'Spring Boot', 'MySQL', 'Redis'], experience: '3 years', education: 'CMU', status: 'Under Review', avatar: 'DL', color: '#14B8A6' },
  { id: 7, name: 'Aisha Mohamed', role: 'UX Designer', score: 79, skills: ['Figma', 'User Research', 'Prototyping'], experience: '4 years', education: 'RISD', status: 'Under Review', avatar: 'AM', color: '#F59E0B' },
  { id: 8, name: 'James Wilson', role: 'iOS Developer', score: 75, skills: ['Swift', 'Objective-C', 'Xcode', 'UIKit'], experience: '3 years', education: 'Georgia Tech', status: 'Under Review', avatar: 'JW', color: '#6366F1' },
];

const statusColors: Record<string, string> = {
  'Shortlisted': 'text-green-400 bg-green-400/10 border-green-400/20',
  'Interview Scheduled': 'text-gold bg-gold/10 border-gold/20',
  'In Review': 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  'Under Review': 'text-gray-400 bg-gray-400/10 border-gray-400/20',
};

const rankMedals = ['🥇', '🥈', '🥉'];

export default function CandidateRankings() {
  const [sortBy, setSortBy] = useState<'score' | 'experience' | 'education'>('score');
  const [filter, setFilter] = useState('All');

  const sorted = [...candidates].sort((a, b) => {
    if (sortBy === 'score') return b.score - a.score;
    if (sortBy === 'experience') return parseInt(b.experience) - parseInt(a.experience);
    return 0;
  });

  const statuses = ['All', ...Array.from(new Set(candidates.map((c) => c.status)))];

  const filtered = filter === 'All' ? sorted : sorted.filter((c) => c.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-bold text-2xl text-white">Candidate Rankings</h2>
          <p className="text-gray-400 text-sm mt-1">AI-ranked candidates sorted by suitability score.</p>
        </div>

        <div className="flex items-center gap-3">
          {/* Filter by status */}
          <div className="flex items-center gap-1 glass rounded-xl px-1 py-1">
            {statuses.map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                  filter === s ? 'bg-gold text-obsidian' : 'text-gray-400 hover:text-white'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="form-input pr-8 text-sm appearance-none cursor-pointer py-2"
            >
              <option value="score">Sort: AI Score</option>
              <option value="experience">Sort: Experience</option>
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-3 gap-4">
        {filtered.slice(0, 3).map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`card-base p-6 text-center ${i === 0 ? 'border-gold/40 shadow-gold' : ''}`}
          >
            <div className="text-4xl mb-3">{rankMedals[i]}</div>
            <div
              className="w-14 h-14 rounded-2xl mx-auto flex items-center justify-center text-white font-bold text-lg mb-3"
              style={{ background: c.color }}
            >
              {c.avatar}
            </div>
            <div className="font-semibold text-white text-sm">{c.name}</div>
            <div className="text-gray-400 text-xs mb-3">{c.role}</div>
            <div className="text-3xl font-display font-bold gold-text">{c.score}%</div>
            <div className="text-gray-500 text-xs">AI Score</div>
          </motion.div>
        ))}
      </div>

      {/* Full Rankings Table */}
      <div className="card-base overflow-hidden">
        <div className="p-5 border-b border-gold/10 flex items-center justify-between">
          <h3 className="font-semibold text-white flex items-center gap-2">
            <Trophy size={18} className="text-gold" />
            Full Rankings — {filtered.length} candidates
          </h3>
        </div>

        <div className="divide-y divide-gold/5">
          {filtered.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              className="flex items-center gap-4 px-5 py-4 hover:bg-surface-hover transition-colors group cursor-pointer"
            >
              {/* Rank */}
              <div className="w-10 text-center font-display font-bold text-gray-500 text-sm">
                {i < 3 ? rankMedals[i] : `#${i + 1}`}
              </div>

              {/* Avatar */}
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                style={{ background: c.color }}
              >
                {c.avatar}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="font-medium text-white text-sm group-hover:text-gold transition-colors">{c.name}</div>
                <div className="text-gray-500 text-xs flex items-center gap-3">
                  <span className="flex items-center gap-1"><Briefcase size={11} />{c.role}</span>
                  <span>{c.experience}</span>
                  <span>{c.education}</span>
                </div>
              </div>

              {/* Skills */}
              <div className="hidden lg:flex items-center gap-1.5">
                {c.skills.slice(0, 3).map((s) => (
                  <span key={s} className="px-2 py-0.5 rounded-lg bg-gold/8 border border-gold/15 text-gold text-[10px]">
                    {s}
                  </span>
                ))}
                {c.skills.length > 3 && (
                  <span className="text-gray-500 text-xs">+{c.skills.length - 3}</span>
                )}
              </div>

              {/* Status */}
              <span className={`px-2.5 py-1 rounded-lg border text-xs font-medium ${statusColors[c.status] || ''}`}>
                {c.status}
              </span>

              {/* Score */}
              <div className="flex items-center gap-2 w-24">
                <div className="flex-1 h-1.5 bg-surface-hover rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${c.score}%`,
                      background: c.score >= 90 ? '#D4AF37' : c.score >= 80 ? '#3B82F6' : '#F97316',
                    }}
                  />
                </div>
                <span className="text-white font-bold text-sm w-10 text-right">{c.score}%</span>
              </div>

              {/* Actions */}
              <div className="hidden md:flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="w-8 h-8 rounded-lg glass hover:border-gold/30 flex items-center justify-center text-gray-400 hover:text-gold transition-colors">
                  <Mail size={14} />
                </button>
                <button className="w-8 h-8 rounded-lg glass hover:border-gold/30 flex items-center justify-center text-gray-400 hover:text-gold transition-colors">
                  <Calendar size={14} />
                </button>
                <button className="w-8 h-8 rounded-lg glass hover:border-gold/30 flex items-center justify-center text-gray-400 hover:text-gold transition-colors">
                  <Star size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
