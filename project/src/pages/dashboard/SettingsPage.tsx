import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Lock, Bell, Palette, Key, Save, CheckCircle, Camera } from 'lucide-react';

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'security', label: 'Security', icon: Lock },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'api', label: 'API Keys', icon: Key },
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="card-base p-6 space-y-4">
      <h3 className="font-semibold text-white text-base">{title}</h3>
      {children}
    </div>
  );
}

function Toggle({ label, desc, defaultChecked = false }: { label: string; desc?: string; defaultChecked?: boolean }) {
  const [on, setOn] = useState(defaultChecked);
  return (
    <div className="flex items-center justify-between py-2">
      <div>
        <div className="text-white text-sm font-medium">{label}</div>
        {desc && <div className="text-gray-500 text-xs">{desc}</div>}
      </div>
      <button
        onClick={() => setOn(!on)}
        className={`w-12 h-6 rounded-full transition-all duration-300 relative flex-shrink-0 ${on ? 'bg-gold' : 'bg-surface-hover'}`}
      >
        <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all duration-300 ${on ? 'left-6.5 left-[26px]' : 'left-0.5'}`} />
      </button>
    </div>
  );
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display font-bold text-2xl text-white">Settings</h2>
        <p className="text-gray-400 text-sm mt-1">Manage your account preferences and platform configuration.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Tabs */}
        <div className="lg:w-52 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-gold/10 text-gold border border-gold/20'
                  : 'text-gray-400 hover:text-white hover:bg-surface-hover'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 space-y-4">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'profile' && (
              <>
                <Section title="Profile Information">
                  {/* Avatar */}
                  <div className="flex items-center gap-4 pb-4 border-b border-white/5">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-2xl bg-gold/20 border-2 border-gold/30 flex items-center justify-center">
                        <User size={32} className="text-gold" />
                      </div>
                      <button className="absolute -bottom-2 -right-2 w-8 h-8 rounded-xl bg-gold flex items-center justify-center shadow-gold">
                        <Camera size={14} className="text-obsidian" />
                      </button>
                    </div>
                    <div>
                      <div className="text-white font-semibold">Profile Photo</div>
                      <div className="text-gray-400 text-xs">JPG, PNG up to 5MB</div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { label: 'Full Name', placeholder: 'John Smith', value: 'John Smith' },
                      { label: 'Email', placeholder: 'john@company.com', value: 'john@company.com' },
                      { label: 'Job Title', placeholder: 'Senior Recruiter', value: 'Senior Recruiter' },
                      { label: 'Company', placeholder: 'TechNova Inc.', value: 'TechNova Inc.' },
                      { label: 'Phone', placeholder: '+1 (555) 000-0000', value: '' },
                      { label: 'Location', placeholder: 'San Francisco, CA', value: '' },
                    ].map((f) => (
                      <div key={f.label}>
                        <label className="text-gray-400 text-xs block mb-1.5">{f.label}</label>
                        <input
                          defaultValue={f.value}
                          placeholder={f.placeholder}
                          className="form-input"
                        />
                      </div>
                    ))}
                  </div>
                </Section>
              </>
            )}

            {activeTab === 'security' && (
              <Section title="Password & Security">
                <div className="space-y-4">
                  {[
                    { label: 'Current Password', type: 'password' },
                    { label: 'New Password', type: 'password' },
                    { label: 'Confirm New Password', type: 'password' },
                  ].map((f) => (
                    <div key={f.label}>
                      <label className="text-gray-400 text-xs block mb-1.5">{f.label}</label>
                      <input type={f.type} placeholder="••••••••••••" className="form-input" />
                    </div>
                  ))}
                  <div className="pt-2">
                    <div className="font-medium text-white text-sm mb-3">Two-Factor Authentication</div>
                    <Toggle label="Enable 2FA" desc="Secure your account with authenticator app" defaultChecked />
                  </div>
                </div>
              </Section>
            )}

            {activeTab === 'notifications' && (
              <Section title="Notification Preferences">
                <div className="space-y-1 divide-y divide-white/5">
                  <Toggle label="Resume Upload Alerts" desc="Notify when new resumes are uploaded" defaultChecked />
                  <Toggle label="AI Analysis Complete" desc="Alert when AI finishes analyzing candidates" defaultChecked />
                  <Toggle label="Interview Reminders" desc="Send reminders 1 hour before interviews" defaultChecked />
                  <Toggle label="Candidate Shortlisted" desc="Notify when candidates are shortlisted" defaultChecked />
                  <Toggle label="Weekly Analytics Report" desc="Email digest of recruitment metrics" />
                  <Toggle label="System Updates" desc="Product news and feature announcements" />
                </div>
              </Section>
            )}

            {activeTab === 'appearance' && (
              <Section title="Theme & Appearance">
                <div className="space-y-4">
                  <div>
                    <div className="text-gray-400 text-xs mb-3">Color Theme</div>
                    <div className="grid grid-cols-4 gap-3">
                      {[
                        { name: 'Gold (Default)', bg: 'bg-gold', ring: true },
                        { name: 'Ocean Blue', bg: 'bg-blue-500', ring: false },
                        { name: 'Emerald', bg: 'bg-green-500', ring: false },
                        { name: 'Rose', bg: 'bg-pink-500', ring: false },
                      ].map((c) => (
                        <button key={c.name} className={`h-12 rounded-xl ${c.bg} ${c.ring ? 'ring-2 ring-white ring-offset-2 ring-offset-navy' : 'opacity-50 hover:opacity-80'} transition-opacity`} title={c.name} />
                      ))}
                    </div>
                  </div>
                  <Toggle label="Compact Mode" desc="Reduce spacing for more information density" />
                  <Toggle label="Animated Background" desc="Enable particle animations" defaultChecked />
                  <Toggle label="Reduced Motion" desc="Disable page transition animations" />
                </div>
              </Section>
            )}

            {activeTab === 'api' && (
              <Section title="API Configuration">
                <div className="space-y-4">
                  {[
                    { label: 'OpenAI API Key', value: 'sk-proj-••••••••••••••••••••••••••••••', help: 'Used for resume analysis and AI chat' },
                    { label: 'Supabase Project URL', value: 'https://••••••••.supabase.co', help: 'Database connection endpoint' },
                    { label: 'Webhook Secret', value: '••••••••••••••••••••••••', help: 'For secure webhook validation' },
                  ].map((f) => (
                    <div key={f.label}>
                      <label className="text-gray-400 text-xs block mb-1">{f.label}</label>
                      <input defaultValue={f.value} type="password" className="form-input font-mono text-sm" />
                      <p className="text-gray-600 text-xs mt-1">{f.help}</p>
                    </div>
                  ))}
                </div>
              </Section>
            )}
          </motion.div>

          {/* Save Button */}
          <div className="flex justify-end">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSave}
              className="btn-gold flex items-center gap-2"
            >
              {saved ? (
                <>
                  <CheckCircle size={16} />
                  Saved!
                </>
              ) : (
                <>
                  <Save size={16} />
                  Save Changes
                </>
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
