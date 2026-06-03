import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Brain, Calendar, Briefcase, CheckCircle, User, Filter } from 'lucide-react';

const notifications = [
  { id: 1, type: 'analysis', icon: Brain, title: 'AI Analysis Complete', message: 'Emily Chen\'s resume has been analyzed. Score: 96/100. Highly Recommended.', time: '2 minutes ago', read: false, color: 'text-gold', bg: 'rgba(212,175,55,0.1)' },
  { id: 2, type: 'upload', icon: FileText, title: 'New Resume Uploaded', message: 'Marcus Johnson uploaded their CV for Senior Full Stack Engineer role.', time: '8 minutes ago', read: false, color: 'text-blue-400', bg: 'rgba(59,130,246,0.1)' },
  { id: 3, type: 'interview', icon: Calendar, title: 'Interview Scheduled', message: 'Interview with Priya Patel confirmed for tomorrow at 2:00 PM EST.', time: '1 hour ago', read: false, color: 'text-green-400', bg: 'rgba(34,197,94,0.1)' },
  { id: 4, type: 'shortlist', icon: CheckCircle, title: 'Candidate Shortlisted', message: 'Alex Rivera has been shortlisted for the DevOps Engineer position by Sarah Connor.', time: '2 hours ago', read: true, color: 'text-gold', bg: 'rgba(212,175,55,0.1)' },
  { id: 5, type: 'application', icon: User, title: 'New Application Received', message: '14 new applications received for Senior React Developer position today.', time: '3 hours ago', read: true, color: 'text-purple-400', bg: 'rgba(168,85,247,0.1)' },
  { id: 6, type: 'job', icon: Briefcase, title: 'Job Post Expiring Soon', message: 'DevOps Engineer job posting expires in 3 days. Consider renewing or closing.', time: '5 hours ago', read: true, color: 'text-orange-400', bg: 'rgba(251,146,60,0.1)' },
  { id: 7, type: 'analysis', icon: Brain, title: 'Batch Analysis Complete', message: '23 resumes processed in batch. 8 candidates qualify for shortlisting.', time: '1 day ago', read: true, color: 'text-gold', bg: 'rgba(212,175,55,0.1)' },
];

export default function Notifications() {
  const [items, setItems] = useState(notifications);
  const [filter, setFilter] = useState('All');

  const unread = items.filter((n) => !n.read).length;
  const types = ['All', 'analysis', 'upload', 'interview', 'shortlist', 'application'];

  const filtered = filter === 'All' ? items : items.filter((n) => n.type === filter);

  function markAll() {
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  function markRead(id: number) {
    setItems((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display font-bold text-2xl text-white flex items-center gap-3">
            Notifications
            {unread > 0 && (
              <span className="px-2.5 py-0.5 rounded-full bg-gold text-obsidian text-sm font-bold">
                {unread}
              </span>
            )}
          </h2>
          <p className="text-gray-400 text-sm mt-1">Stay updated with real-time recruitment activity.</p>
        </div>
        {unread > 0 && (
          <button onClick={markAll} className="btn-ghost text-sm py-2">
            Mark all as read
          </button>
        )}
      </div>

      {/* Filter */}
      <div className="flex items-center gap-2 flex-wrap">
        <Filter size={14} className="text-gray-500" />
        {types.map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 capitalize ${
              filter === t ? 'bg-gold text-obsidian' : 'glass text-gray-400 hover:text-white hover:border-gold/30'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.map((notif, i) => (
          <motion.div
            key={notif.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04 }}
            onClick={() => markRead(notif.id)}
            className={`card-base p-4 flex items-start gap-4 cursor-pointer transition-all duration-200 hover:border-gold/30 ${
              !notif.read ? 'border-gold/20' : 'opacity-70 hover:opacity-100'
            }`}
          >
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ background: notif.bg }}
            >
              <notif.icon size={20} className={notif.color} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="font-semibold text-white text-sm">{notif.title}</div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {!notif.read && (
                    <div className="w-2 h-2 rounded-full bg-gold flex-shrink-0" />
                  )}
                  <span className="text-gray-500 text-xs">{notif.time}</span>
                </div>
              </div>
              <p className="text-gray-400 text-sm mt-0.5 leading-relaxed">{notif.message}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
