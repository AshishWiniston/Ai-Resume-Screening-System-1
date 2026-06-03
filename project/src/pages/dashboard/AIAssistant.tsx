import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brain, Send, User, Sparkles, RefreshCw, Copy, CheckCheck } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const suggestions = [
  'Compare top 3 candidates for the React Developer role',
  'Generate interview questions for a Data Scientist',
  'Write a job description for a Senior DevOps Engineer',
  'What skills are missing from our candidate pool?',
  'Recommend the best candidate for product management',
  'Analyze hiring trends from the past month',
];

const demoReplies: Record<string, string> = {
  default: `I've analyzed your request based on your current candidate pool and job requirements.\n\nHere's my assessment:\n\n**Key Findings:**\n- Your top candidates show strong technical alignment with open roles\n- Emily Chen (96% score) is an exceptional match for your React Developer position\n- There's a notable gap in DevOps/infrastructure expertise in your pipeline\n\n**Recommendations:**\n1. Prioritize scheduling interviews with top 3 ranked candidates\n2. Consider broadening your DevOps role requirements to attract more applicants\n3. The skill gap in Kubernetes suggests targeted sourcing on specialized platforms\n\nWould you like me to generate specific interview questions or draft outreach emails?`,
  interview: `Here are **tailored interview questions** for a Data Scientist role:\n\n**Technical Questions:**\n1. Explain the difference between L1 and L2 regularization and when to use each.\n2. How would you handle class imbalance in a classification problem?\n3. Walk me through your approach to feature engineering for a time-series dataset.\n4. Describe a situation where your model performed well in training but poorly in production.\n\n**Behavioral Questions:**\n1. Tell me about a time you had to communicate complex findings to non-technical stakeholders.\n2. How do you prioritize competing projects with tight deadlines?\n3. Describe your experience working in cross-functional teams.\n\n**Case Study:**\n"Given 6 months of user behavior data, how would you build a churn prediction model?"\n\nShall I generate follow-up probes for any of these questions?`,
};

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 bg-gold rounded-full"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  );
}

function MessageBubble({ msg }: { msg: Message }) {
  const [copied, setCopied] = useState(false);
  const isAI = msg.role === 'assistant';

  function copy() {
    navigator.clipboard.writeText(msg.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`flex gap-3 ${isAI ? '' : 'flex-row-reverse'}`}
    >
      {/* Avatar */}
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-1 ${
        isAI ? 'bg-gold-gradient shadow-gold' : 'bg-surface-hover border border-white/10'
      }`}>
        {isAI ? <Brain size={17} className="text-obsidian" /> : <User size={17} className="text-gray-400" />}
      </div>

      {/* Bubble */}
      <div className={`max-w-[75%] group ${isAI ? '' : 'items-end flex flex-col'}`}>
        <div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed relative ${
          isAI
            ? 'bg-surface-card border border-gold/10 text-gray-200 rounded-tl-sm'
            : 'bg-gold/10 border border-gold/20 text-white rounded-tr-sm'
        }`}>
          {isAI ? (
            <div className="whitespace-pre-wrap" dangerouslySetInnerHTML={{
              __html: msg.content
                .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
                .replace(/\n/g, '<br/>')
            }} />
          ) : msg.content}

          {isAI && (
            <button
              onClick={copy}
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-lg hover:bg-white/10"
            >
              {copied ? <CheckCheck size={12} className="text-green-400" /> : <Copy size={12} className="text-gray-500" />}
            </button>
          )}
        </div>
        <span className="text-gray-600 text-[10px] mt-1 px-1">
          {msg.timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </motion.div>
  );
}

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'assistant',
      content: `Hello! I'm your **TalentAI Assistant** — powered by advanced AI to help streamline your recruitment process.\n\nI can help you with:\n- **Candidate comparison** and evaluation\n- **Interview question** generation\n- **Job description** writing and optimization\n- **Hiring recommendations** and insights\n- **Recruitment strategy** advice\n\nWhat would you like to explore today?`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  async function sendMessage(text: string) {
    if (!text.trim()) return;
    setInput('');

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setTyping(true);

    await new Promise((r) => setTimeout(r, 1200 + Math.random() * 800));

    const reply = text.toLowerCase().includes('interview')
      ? demoReplies.interview
      : demoReplies.default;

    setTyping(false);
    setMessages((prev) => [...prev, {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: reply,
      timestamp: new Date(),
    }]);
  }

  function clearChat() {
    setMessages([messages[0]]);
  }

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gold-gradient flex items-center justify-center shadow-gold">
            <Brain size={20} className="text-obsidian" />
          </div>
          <div>
            <h2 className="font-display font-bold text-xl text-white">AI Recruitment Assistant</h2>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-400 text-xs">Online — Ready to assist</span>
            </div>
          </div>
        </div>
        <button onClick={clearChat} className="btn-ghost text-xs py-2 px-4 flex items-center gap-2">
          <RefreshCw size={13} />
          Clear
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 card-base overflow-y-auto p-5 space-y-5 min-h-0">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} msg={msg} />
        ))}
        {typing && (
          <div className="flex gap-3">
            <div className="w-9 h-9 rounded-xl bg-gold-gradient flex items-center justify-center flex-shrink-0 shadow-gold">
              <Brain size={17} className="text-obsidian" />
            </div>
            <div className="bg-surface-card border border-gold/10 rounded-2xl rounded-tl-sm">
              <TypingIndicator />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggestions */}
      <div className="mt-3 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {suggestions.slice(0, 4).map((s) => (
          <button
            key={s}
            onClick={() => sendMessage(s)}
            className="flex-shrink-0 text-xs text-gray-400 border border-white/10 hover:border-gold/30 hover:text-gold rounded-xl px-3 py-1.5 transition-all duration-200 flex items-center gap-1.5"
          >
            <Sparkles size={11} className="text-gold" />
            {s}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="mt-3 flex gap-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage(input)}
          placeholder="Ask about candidates, write job descriptions, generate interview questions..."
          className="form-input flex-1"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => sendMessage(input)}
          disabled={!input.trim() || typing}
          className="btn-gold px-4 py-3 flex items-center gap-2 disabled:opacity-50"
        >
          <Send size={18} />
        </motion.button>
      </div>
    </div>
  );
}
