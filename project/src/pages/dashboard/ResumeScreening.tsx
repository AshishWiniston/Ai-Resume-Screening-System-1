import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, CheckCircle, Brain, Zap, X, ChevronDown, ChevronUp } from 'lucide-react';

interface Resume {
  id: string;
  name: string;
  file: string;
  status: 'uploading' | 'processing' | 'done';
  progress: number;
  candidate: {
    name: string;
    email: string;
    phone: string;
    skills: string[];
    experience: string;
    education: string;
    score: number;
    strengths: string[];
    weaknesses: string[];
    recommendation: string;
  } | null;
}

const demoResumes: Resume[] = [
  {
    id: '1',
    name: 'Emily_Chen_Resume.pdf',
    file: 'PDF',
    status: 'done',
    progress: 100,
    candidate: {
      name: 'Emily Chen',
      email: 'emily.chen@email.com',
      phone: '+1 (555) 234-5678',
      skills: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'AWS', 'Docker', 'PostgreSQL', 'Python'],
      experience: '6 years',
      education: 'B.S. Computer Science, Stanford University',
      score: 96,
      strengths: ['Strong React expertise with 6 years', 'Full-stack capabilities', 'Cloud infrastructure experience'],
      weaknesses: ['Limited mobile development experience', 'No team lead experience listed'],
      recommendation: 'Highly Recommended — Exceptional technical profile. Schedule first interview immediately.',
    },
  },
  {
    id: '2',
    name: 'Marcus_Johnson_CV.pdf',
    file: 'PDF',
    status: 'done',
    progress: 100,
    candidate: {
      name: 'Marcus Johnson',
      email: 'marcus.j@email.com',
      phone: '+1 (555) 876-4321',
      skills: ['Vue.js', 'Python', 'Django', 'MySQL', 'Redis', 'Kubernetes', 'CI/CD'],
      experience: '4 years',
      education: 'M.S. Software Engineering, MIT',
      score: 89,
      strengths: ['Graduate degree from top institution', 'Strong backend skills', 'DevOps experience'],
      weaknesses: ['Primary framework is Vue, not React', 'Less frontend depth needed for role'],
      recommendation: 'Recommended — Good technical fit with minor skill gaps. Worth interviewing.',
    },
  },
];

function SkillBadge({ skill }: { skill: string }) {
  return (
    <span className="px-2.5 py-1 rounded-lg bg-gold/10 border border-gold/20 text-gold text-xs font-medium">
      {skill}
    </span>
  );
}

function CircleScore({ score }: { score: number }) {
  const r = 36;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  return (
    <div className="relative w-24 h-24 flex items-center justify-center">
      <svg width="96" height="96" className="rotate-[-90deg]">
        <circle cx="48" cy="48" r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
        <circle
          cx="48" cy="48" r={r} fill="none"
          stroke={score >= 90 ? '#D4AF37' : score >= 75 ? '#3B82F6' : '#F97316'}
          strokeWidth="6" strokeLinecap="round"
          strokeDasharray={circ} strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1s ease' }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="font-display font-bold text-xl text-white">{score}</span>
        <span className="text-gray-500 text-[10px]">score</span>
      </div>
    </div>
  );
}

function ResumeCard({ resume }: { resume: Resume }) {
  const [expanded, setExpanded] = useState(false);
  const c = resume.candidate;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-base overflow-hidden"
    >
      {/* Header */}
      <div className="p-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center">
            <FileText size={22} className="text-gold" />
          </div>
          <div>
            <div className="font-semibold text-white text-sm">{resume.name}</div>
            {c && <div className="text-gray-400 text-xs">{c.name} — {c.experience} experience</div>}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {resume.status === 'done' && (
            <div className="flex items-center gap-1.5 text-green-400 text-xs">
              <CheckCircle size={14} />
              Analysis Complete
            </div>
          )}
          {resume.status === 'processing' && (
            <div className="flex items-center gap-1.5 text-gold text-xs">
              <Brain size={14} className="animate-pulse" />
              AI Processing...
            </div>
          )}
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-8 h-8 rounded-lg glass flex items-center justify-center hover:border-gold/30 transition-colors"
          >
            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      </div>

      {/* Expanded Analysis */}
      <AnimatePresence>
        {expanded && c && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-gold/10 overflow-hidden"
          >
            <div className="p-5 grid lg:grid-cols-3 gap-6">
              {/* Candidate Info */}
              <div className="space-y-4">
                <h4 className="text-gold text-xs font-semibold uppercase tracking-wider">Candidate Profile</h4>
                <div className="space-y-2 text-sm">
                  {[
                    { label: 'Name', value: c.name },
                    { label: 'Email', value: c.email },
                    { label: 'Phone', value: c.phone },
                    { label: 'Experience', value: c.experience },
                    { label: 'Education', value: c.education },
                  ].map((item) => (
                    <div key={item.label}>
                      <span className="text-gray-500">{item.label}: </span>
                      <span className="text-white">{item.value}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <div className="text-gray-500 text-xs mb-2">Skills</div>
                  <div className="flex flex-wrap gap-1.5">
                    {c.skills.map((s) => <SkillBadge key={s} skill={s} />)}
                  </div>
                </div>
              </div>

              {/* AI Score */}
              <div className="space-y-4">
                <h4 className="text-gold text-xs font-semibold uppercase tracking-wider">AI Analysis Score</h4>
                <div className="flex justify-center">
                  <CircleScore score={c.score} />
                </div>
                <div>
                  <div className="text-green-400 text-xs font-semibold mb-1.5">Strengths</div>
                  <ul className="space-y-1">
                    {c.strengths.map((s) => (
                      <li key={s} className="flex items-start gap-2 text-xs text-gray-300">
                        <CheckCircle size={12} className="text-green-400 flex-shrink-0 mt-0.5" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="text-red-400 text-xs font-semibold mb-1.5">Areas to Improve</div>
                  <ul className="space-y-1">
                    {c.weaknesses.map((w) => (
                      <li key={w} className="flex items-start gap-2 text-xs text-gray-300">
                        <X size={12} className="text-red-400 flex-shrink-0 mt-0.5" />
                        {w}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Recommendation */}
              <div className="space-y-4">
                <h4 className="text-gold text-xs font-semibold uppercase tracking-wider">AI Recommendation</h4>
                <div className="glass-gold rounded-xl p-4">
                  <Brain size={20} className="text-gold mb-2" />
                  <p className="text-gray-200 text-sm leading-relaxed">{c.recommendation}</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button className="btn-gold text-xs py-2">Shortlist</button>
                  <button className="btn-ghost text-xs py-2">Schedule Interview</button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function ResumeScreening() {
  const [resumes, setResumes] = useState<Resume[]>(demoResumes);
  const [dragging, setDragging] = useState(false);
  const [jd, setJd] = useState('');
  const [matchResult, setMatchResult] = useState<null | { score: number; missing: string[]; matched: string[] }>(null);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const files = Array.from(e.dataTransfer.files);
    files.forEach((file) => {
      const newResume: Resume = {
        id: Date.now().toString(),
        name: file.name,
        file: file.name.endsWith('.pdf') ? 'PDF' : 'DOCX',
        status: 'uploading',
        progress: 0,
        candidate: null,
      };
      setResumes((prev) => [newResume, ...prev]);

      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          setResumes((prev) =>
            prev.map((r) => r.id === newResume.id ? { ...r, status: 'processing', progress: 100 } : r)
          );
          setTimeout(() => {
            setResumes((prev) =>
              prev.map((r) =>
                r.id === newResume.id
                  ? { ...r, status: 'done', candidate: demoResumes[0].candidate }
                  : r
              )
            );
          }, 2500);
        } else {
          setResumes((prev) =>
            prev.map((r) => r.id === newResume.id ? { ...r, progress } : r)
          );
        }
      }, 150);
    });
  }, []);

  function analyzeJD() {
    if (!jd.trim()) return;
    setMatchResult({
      score: 88,
      matched: ['React', 'TypeScript', 'Node.js', 'AWS', 'Docker'],
      missing: ['GraphQL', 'Kubernetes'],
    });
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display font-bold text-2xl text-white">Resume Screening</h2>
        <p className="text-gray-400 text-sm mt-1">Upload resumes for AI-powered analysis and candidate ranking.</p>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Upload Zone */}
        <div className="lg:col-span-2 space-y-4">
          <div
            onDrop={handleDrop}
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 cursor-pointer ${
              dragging ? 'border-gold bg-gold/5' : 'border-gold/20 hover:border-gold/50 hover:bg-gold/3'
            }`}
          >
            <motion.div
              animate={dragging ? { scale: 1.1 } : { scale: 1 }}
              className="w-16 h-16 rounded-2xl bg-gold/10 mx-auto flex items-center justify-center mb-4"
            >
              <Upload size={28} className="text-gold" />
            </motion.div>
            <h3 className="font-semibold text-white mb-1">Drop Resumes Here</h3>
            <p className="text-gray-400 text-sm mb-4">Supports PDF and DOCX formats</p>
            <label className="btn-gold text-sm py-2 px-5 inline-block cursor-pointer">
              Browse Files
              <input type="file" className="hidden" multiple accept=".pdf,.docx" />
            </label>
          </div>

          {/* JD Matching */}
          <div className="card-base p-5 space-y-3">
            <h3 className="font-semibold text-white flex items-center gap-2">
              <Zap size={16} className="text-gold" />
              Job Description Match
            </h3>
            <textarea
              value={jd}
              onChange={(e) => setJd(e.target.value)}
              placeholder="Paste job description here to match against uploaded resumes..."
              rows={5}
              className="form-input resize-none text-sm"
            />
            <button onClick={analyzeJD} className="btn-gold w-full text-sm py-2.5 flex items-center justify-center gap-2">
              <Brain size={16} />
              Analyze Match
            </button>
            {matchResult && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3"
              >
                <div className="flex items-center gap-3">
                  <CircleScore score={matchResult.score} />
                  <div>
                    <div className="text-white font-semibold">Match Score</div>
                    <div className="text-gray-400 text-xs">vs. your Job Description</div>
                  </div>
                </div>
                <div>
                  <div className="text-green-400 text-xs mb-1">Matched Skills</div>
                  <div className="flex flex-wrap gap-1.5">
                    {matchResult.matched.map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs">{s}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-red-400 text-xs mb-1">Missing Skills</div>
                  <div className="flex flex-wrap gap-1.5">
                    {matchResult.missing.map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs">{s}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Resume List */}
        <div className="lg:col-span-3 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-white">{resumes.length} Resumes</h3>
            <span className="text-gray-500 text-xs">{resumes.filter((r) => r.status === 'done').length} analyzed</span>
          </div>
          {resumes.map((resume) => (
            <ResumeCard key={resume.id} resume={resume} />
          ))}
        </div>
      </div>
    </div>
  );
}

