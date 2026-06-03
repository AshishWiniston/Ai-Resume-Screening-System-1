import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain, LayoutDashboard, FileText, Trophy, Briefcase, MessageSquareText,
  BarChart3, Bell, Settings, LogOut, Menu, ChevronRight, User
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { label: 'Resume Screening', icon: FileText, path: '/dashboard/screening' },
  { label: 'Candidate Rankings', icon: Trophy, path: '/dashboard/rankings' },
  { label: 'Job Descriptions', icon: Briefcase, path: '/dashboard/jobs' },
  { label: 'AI Assistant', icon: MessageSquareText, path: '/dashboard/assistant' },
  { label: 'Analytics', icon: BarChart3, path: '/dashboard/analytics' },
  { label: 'Notifications', icon: Bell, path: '/dashboard/notifications', badge: 3 },
  { label: 'Settings', icon: Settings, path: '/dashboard/settings' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebar, setMobileSidebar] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  async function handleSignOut() {
    await signOut();
    navigate('/');
  }

  const Sidebar = ({ mobile = false }) => (
    <div className={`flex flex-col h-full ${mobile ? 'w-72' : sidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300`}>
      {/* Logo */}
      <div className={`p-5 flex items-center gap-3 border-b border-gold/10 ${!sidebarOpen && !mobile ? 'justify-center' : ''}`}>
        <div className="w-10 h-10 rounded-xl bg-gold-gradient flex items-center justify-center shadow-gold flex-shrink-0">
          <Brain size={20} className="text-obsidian" />
        </div>
        {(sidebarOpen || mobile) && (
          <span className="font-display font-bold text-lg">
            Talent<span className="gold-text">AI</span>
          </span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => mobile && setMobileSidebar(false)}
              className={`sidebar-link ${active ? 'active' : ''} ${!sidebarOpen && !mobile ? 'justify-center px-0' : ''}`}
              title={!sidebarOpen && !mobile ? item.label : ''}
            >
              <div className="relative flex-shrink-0">
                <item.icon size={20} />
                {item.badge && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-gold text-obsidian text-[10px] font-bold rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
              {(sidebarOpen || mobile) && (
                <span className="flex-1">{item.label}</span>
              )}
              {active && (sidebarOpen || mobile) && (
                <ChevronRight size={14} className="text-gold/60" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className={`p-3 border-t border-gold/10`}>
        <div className={`flex items-center gap-3 p-3 rounded-xl hover:bg-gold/5 transition-colors cursor-pointer ${!sidebarOpen && !mobile ? 'justify-center' : ''}`}>
          <div className="w-9 h-9 rounded-xl bg-gold/20 border border-gold/30 flex items-center justify-center flex-shrink-0">
            <User size={16} className="text-gold" />
          </div>
          {(sidebarOpen || mobile) && (
            <div className="flex-1 min-w-0">
              <div className="text-white text-sm font-medium truncate">
                {user?.user_metadata?.full_name || 'Recruiter'}
              </div>
              <div className="text-gray-500 text-xs truncate">{user?.email || 'user@example.com'}</div>
            </div>
          )}
        </div>
        <button
          onClick={handleSignOut}
          className={`sidebar-link w-full mt-1 ${!sidebarOpen && !mobile ? 'justify-center px-0' : ''} hover:text-red-400 hover:bg-red-400/5`}
          title={!sidebarOpen && !mobile ? 'Logout' : ''}
        >
          <LogOut size={18} className="flex-shrink-0" />
          {(sidebarOpen || mobile) && <span>Logout</span>}
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-obsidian">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col bg-navy border-r border-gold/10 flex-shrink-0 relative z-20">
        <Sidebar />
        {/* Collapse Toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-navy border border-gold/20 flex items-center justify-center hover:border-gold/50 transition-colors z-30"
        >
          <ChevronRight size={12} className={`text-gold transition-transform ${sidebarOpen ? 'rotate-180' : ''}`} />
        </button>
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileSidebar && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40 md:hidden"
              onClick={() => setMobileSidebar(false)}
            />
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed left-0 top-0 bottom-0 z-50 bg-navy border-r border-gold/10 md:hidden flex flex-col"
            >
              <Sidebar mobile />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        {/* Top Bar */}
        <header className="h-16 bg-navy/80 backdrop-blur-sm border-b border-gold/10 flex items-center justify-between px-6 flex-shrink-0">
          <div className="flex items-center gap-4">
            <button
              className="md:hidden text-gray-400 hover:text-gold transition-colors"
              onClick={() => setMobileSidebar(true)}
            >
              <Menu size={22} />
            </button>
            <div>
              <h1 className="font-display font-semibold text-white text-sm">
                {navItems.find((n) => n.path === location.pathname)?.label || 'Dashboard'}
              </h1>
              <p className="text-gray-500 text-xs">TalentAI Platform</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/dashboard/notifications" className="relative w-9 h-9 rounded-xl glass flex items-center justify-center hover:border-gold/30 hover:text-gold text-gray-400 transition-all">
              <Bell size={18} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-gold rounded-full" />
            </Link>
            <div className="w-9 h-9 rounded-xl bg-gold/20 border border-gold/30 flex items-center justify-center">
              <User size={16} className="text-gold" />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
