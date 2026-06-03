import { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Plus, Brain, X, CheckCircle, Clock, Users } from 'lucide-react';

const jobList = [
  { id: 1, title: 'Senior React Developer', dept: 'Engineering', applicants: 47, status: 'Active', match: 92, posted: '3 days ago' },
  { id: 2, title: 'Data Scientist', dept: 'AI/ML', applicants: 31, status: 'Active', match: 88, posted: '1 week ago' },
  { id: 3, title: 'DevOps Engineer', dept: 'Infrastructure', applicants: 22, status: 'Active', match: 85, posted: '2 weeks ago' },
  { id: 4, title: 'Product Manager', dept: 'Product', applicants: 58, status: 'Closed', match: 79, posted: '1 month ago' },
];

export default function JobDescriptions() {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [jd, setJd] = useState('');
  const [generated, setGenerated] = useState('');
  const [loading, setLoading] = useState(false);

  function generateJD() {
    if (!title) return;
    setLoading(true);
    setTimeout(() => {
      setGenerated(`**${title}**\n\nWe are looking for an experienced ${title} to join our growing team.\n\n**Responsibilities:**\n- Design, develop, and maintain high-quality software solutions\n- Collaborate with cross-functional teams to define and implement features\n- Conduct code reviews and mentor junior developers\n- Participate in agile ceremonies and sprint planning\n\n**Requirements:**\n- 4+ years of relevant experience\n- Strong proficiency in modern frameworks and tools\n- Excellent problem-solving and communication skills\n- Bachelor's degree in Computer Science or equivalent\n\n**Nice to Have:**\n- Experience with cloud platforms (AWS, GCP, Azure)\n- Contributions to open-source projects\n- Experience in a fast-paced startup environment\n\n**Benefits:**\n- Competitive salary and equity\n- Remote-friendly culture\n- Health, dental, and vision insurance\n- Unlimited PTO`);
      setLoading(false);
    }, 1800);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display font-bold text-2xl text-white">Job Descriptions</h2>
          <p className="text-gray-400 text-sm mt-1">Create, manage, and AI-optimize your job postings.</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-gold flex items-center gap-2 text-sm py-2.5">
          <Plus size={16} />
          New Job
        </button>
      </div>

      {/* Create JD Form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-base p-6 space-y-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-white">AI Job Description Generator</h3>
            <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-white">
              <X size={18} />
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-gray-400 text-xs block mb-1.5">Job Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Senior React Developer"
                className="form-input"
              />
            </div>
            <div>
              <label className="text-gray-400 text-xs block mb-1.5">Department</label>
              <input placeholder="e.g. Engineering" className="form-input" />
            </div>
          </div>

          <div>
            <label className="text-gray-400 text-xs block mb-1.5">Job Description (or let AI generate)</label>
            <textarea
              value={jd}
              onChange={(e) => setJd(e.target.value)}
              placeholder="Describe the role requirements or click 'Generate with AI'..."
              rows={4}
              className="form-input resize-none"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={generateJD}
              disabled={loading || !title}
              className="btn-gold flex items-center gap-2 text-sm py-2.5"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-obsidian/30 border-t-obsidian rounded-full animate-spin" />
              ) : (
                <Brain size={16} />
              )}
              Generate with AI
            </button>
            <button className="btn-ghost text-sm py-2.5">Save & Publish</button>
          </div>

          {generated && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-surface-card rounded-xl p-4 border border-gold/15"
            >
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle size={14} className="text-green-400" />
                <span className="text-green-400 text-xs font-semibold">AI Generated</span>
              </div>
              <pre className="text-gray-300 text-sm whitespace-pre-wrap font-sans leading-relaxed">{generated}</pre>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* Jobs Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {jobList.map((job, i) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="card-base p-5 hover:border-gold/30 hover:shadow-card-hover transition-all duration-300 group cursor-pointer"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-11 h-11 rounded-xl bg-gold/10 flex items-center justify-center">
                <Briefcase size={20} className="text-gold" />
              </div>
              <span className={`px-2.5 py-1 rounded-lg border text-xs font-medium ${
                job.status === 'Active'
                  ? 'text-green-400 bg-green-400/10 border-green-400/20'
                  : 'text-gray-400 bg-gray-400/10 border-gray-400/20'
              }`}>
                {job.status}
              </span>
            </div>

            <h3 className="font-semibold text-white group-hover:text-gold transition-colors mb-1">{job.title}</h3>
            <p className="text-gray-500 text-sm mb-4">{job.dept}</p>

            <div className="grid grid-cols-3 gap-3">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-gray-400">
                  <Users size={12} />
                  <span className="font-semibold text-white text-sm">{job.applicants}</span>
                </div>
                <div className="text-gray-600 text-[10px]">Applicants</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-gold text-sm">{job.match}%</div>
                <div className="text-gray-600 text-[10px]">AI Match</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-gray-400">
                  <Clock size={12} />
                </div>
                <div className="text-gray-500 text-[10px]">{job.posted}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
