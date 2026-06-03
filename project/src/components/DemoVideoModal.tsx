import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play } from 'lucide-react';

interface DemoVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DemoVideoModal({ isOpen, onClose }: DemoVideoModalProps) {
  const [hasStarted, setHasStarted] = useState(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="relative w-full max-w-4xl bg-obsidian rounded-3xl overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.8)] border border-gold/20">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-50 w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <X size={20} className="text-white" />
              </button>

              {/* Video container */}
              <div className="relative w-full bg-black aspect-video">
                {!hasStarted ? (
                  // Thumbnail with play button
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-navy to-obsidian"
                  >
                    {/* Animated background elements */}
                    <div className="absolute inset-0 overflow-hidden">
                      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gold/10 rounded-full blur-3xl animate-pulse" />
                      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                    </div>

                    {/* Demo preview content */}
                    <div className="relative z-10 text-center space-y-4">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring' }}
                        className="w-24 h-24 rounded-2xl bg-gold-gradient shadow-gold flex items-center justify-center mx-auto"
                      >
                        <Play size={40} className="text-obsidian ml-1" fill="currentColor" />
                      </motion.div>
                      <h3 className="font-display font-bold text-2xl text-white">Watch Demo</h3>
                      <p className="text-gray-400">See TalentAI in action — 3 minutes</p>
                    </div>

                    {/* Play button overlay */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setHasStarted(true)}
                      className="absolute inset-0 flex items-center justify-center z-20 group"
                    >
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-20 h-20 rounded-full border-2 border-gold/50 group-hover:border-gold"
                      />
                      <motion.div
                        animate={{ scale: [0.8, 1, 0.8] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                        className="absolute w-16 h-16 rounded-full border-2 border-gold/30 group-hover:border-gold/50"
                      />
                    </motion.button>
                  </motion.div>
                ) : (
                  // Embedded iframe video
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0"
                  >
                    <iframe
                      width="100%"
                      height="100%"
                      src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                      title="TalentAI Demo"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </motion.div>
                )}
              </div>

              {/* Info bar */}
              {!hasStarted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="px-6 py-4 bg-surface-card border-t border-gold/10 flex items-center justify-between"
                >
                  <div>
                    <h4 className="font-semibold text-white text-sm">Hire Smarter with AI</h4>
                    <p className="text-gray-400 text-xs mt-0.5">See how TalentAI analyzes resumes, ranks candidates, and streamlines your recruitment pipeline</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setHasStarted(true)}
                    className="btn-gold text-xs py-2 px-5 flex-shrink-0 ml-4"
                  >
                    Play Video
                  </motion.button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
