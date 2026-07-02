import React, { useState, useEffect } from 'react';
import { Project, SkillGroup, Certificate, TimelineEvent, SystemLog, ProfileInfo } from '../types';
import { 
  LayoutDashboard, 
  FolderGit2, 
  Binary, 
  Terminal, 
  Settings as SettingsIcon, 
  Rocket, 
  LogOut, 
  Plus, 
  Trash2, 
  Edit, 
  Layers, 
  Cpu, 
  Save, 
  CheckCircle2, 
  Activity, 
  Clock, 
  TrendingUp, 
  X,
  PlusCircle,
  FileText,
  Award
} from 'lucide-react';

interface AdminConsoleProps {
  profile: ProfileInfo;
  projects: Project[];
  skills: SkillGroup;
  certificates: Certificate[];
  timeline: TimelineEvent[];
  systemLogs: SystemLog[];
  onUpdateProfile: (p: ProfileInfo) => void;
  onUpdateProjects: (p: Project[]) => void;
  onUpdateSkills: (s: SkillGroup) => void;
  onUpdateCertificates: (c: Certificate[]) => void;
  onUpdateTimeline: (t: TimelineEvent[]) => void;
  onLogout: () => void;
}

type AdminTab = 'dashboard' | 'projects' | 'skills' | 'experience' | 'logs' | 'settings';

export default function AdminConsole({
  profile,
  projects,
  skills,
  certificates,
  timeline,
  systemLogs,
  onUpdateProfile,
  onUpdateProjects,
  onUpdateSkills,
  onUpdateCertificates,
  onUpdateTimeline,
  onLogout,
}: AdminConsoleProps) {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [uptime, setUptime] = useState({
    days: profile.uptimeDays,
    hours: profile.uptimeHours,
    mins: profile.uptimeMins,
    secs: 32
  });
  
  // Real-time Uptime counter simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setUptime(prev => {
        let s = prev.secs + 1;
        let m = prev.mins;
        let h = prev.hours;
        let d = prev.days;
        if (s >= 60) {
          s = 0;
          m += 1;
        }
        if (m >= 60) {
          m = 0;
          h += 1;
        }
        if (h >= 24) {
          h = 0;
          d += 1;
        }
        return { days: d, hours: h, mins: m, secs: s };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // System Logs Auto-Streaming (High-Tech Feel)
  const [liveLogs, setLiveLogs] = useState<SystemLog[]>(systemLogs);
  useEffect(() => {
    const logGenerator = setInterval(() => {
      const sources = ['MCU_CORE', 'GPIO_BUS', 'ADC_FILTER', 'SIEMENS_PLC', 'SCADA_UI', 'HEARTBEAT'];
      const messages = [
        'Routine diagnostic check passed. Status code 0x00.',
        'Actuation valve position validated. Error delta is 0.012%.',
        'Bus telemetry packets successfully routed.',
        'Ping interval resolved. Latency is 4.2ms.',
        'DMA buffers cleared and refreshed for serial logging.',
        'Voltage safety threshold confirmed at +5.02V.',
        'WDT feed complete. System status verified operational.'
      ];
      const types: ('INFO' | 'WARN' | 'SUCCESS')[] = ['INFO', 'SUCCESS', 'INFO'];
      const randomSource = sources[Math.floor(Math.random() * sources.length)];
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      const randomType = types[Math.floor(Math.random() * types.length)];
      
      const now = new Date();
      const timestamp = now.toTimeString().split(' ')[0];
      
      const newLog: SystemLog = {
        id: `live-log-${Date.now()}`,
        timestamp,
        type: randomType,
        source: randomSource,
        message: randomMessage
      };
      
      setLiveLogs(prev => [newLog, ...prev.slice(0, 49)]);
    }, 4500);
    return () => clearInterval(logGenerator);
  }, []);

  // Modal & Edit Form States
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);
  const [newProject, setNewProject] = useState<Partial<Project>>({
    title: '',
    subtitle: '',
    date: '',
    description: '',
    tags: [],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCnKUYGl_xCFsMT3dDSh2mQ0rD0IXXpBX9bhHZd_v-aRnDKgdAV9s9lxTMWkbVw1fHTzDEQ2wCAKB2-N-RwZopaz2WMcI3Y_dVZPFa1hz0EYC3NpW8DWyF06wHfq4DixHbWfrmMBkLsIEfkpIHPXUdBN1i3McPa5DaSCjToXZ19mToP9wYEBln4gExQyW0GeQ3OizFdFpX1DdmVsLwYTtWhd5UJJ6zsBOVGk9TBkS3d8a8tH6JwclSavI6OP93bru5bnoS8KTBygLU',
    status: 'ACTIVE_DEV',
    refCode: 'SYS-SPEC-909'
  });
  const [tagInput, setTagInput] = useState('');

  // Skill Add States
  const [newLang, setNewLang] = useState('');
  const [newTool, setNewTool] = useState('');
  const [newSoft, setNewSoft] = useState('');

  // Profile Edit State
  const [profileForm, setProfileForm] = useState<ProfileInfo>({ ...profile });

  // Experience (Timeline) CRUD States
  const [editingTimeline, setEditingTimeline] = useState<TimelineEvent | null>(null);
  const [isAddTimelineOpen, setIsAddTimelineOpen] = useState(false);
  const [newTimeline, setNewTimeline] = useState<Partial<TimelineEvent>>({
    company: '',
    role: '',
    date: '',
    location: '',
    description: '',
    isProjected: false
  });

  // Certificates CRUD States
  const [editingCertificate, setEditingCertificate] = useState<Certificate | null>(null);
  const [isAddCertificateOpen, setIsAddCertificateOpen] = useState(false);
  const [newCertificate, setNewCertificate] = useState<Partial<Certificate>>({
    title: '',
    issuer: '',
    description: '',
    iconName: 'award'
  });

  // Timeline Handlers
  const handleSaveTimelineEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTimeline) return;
    const updated = timeline.map(t => t.id === editingTimeline.id ? editingTimeline : t);
    onUpdateTimeline(updated);
    setEditingTimeline(null);
  };

  const handleCreateTimeline = (e: React.FormEvent) => {
    e.preventDefault();
    const created: TimelineEvent = {
      id: `time-${Date.now()}`,
      company: newTimeline.company || 'New Company',
      role: newTimeline.role || 'Engineer',
      date: newTimeline.date || 'Present',
      location: newTimeline.location || 'Remote',
      description: newTimeline.description || 'System descriptions.',
      isProjected: !!newTimeline.isProjected
    };
    onUpdateTimeline([created, ...timeline]);
    setIsAddTimelineOpen(false);
    setNewTimeline({
      company: '',
      role: '',
      date: '',
      location: '',
      description: '',
      isProjected: false
    });
  };

  const handleDeleteTimeline = (id: string) => {
    if (confirm('Are you sure you want to delete this trajectory event?')) {
      onUpdateTimeline(timeline.filter(t => t.id !== id));
    }
  };

  // Certificate Handlers
  const handleSaveCertificateEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCertificate) return;
    const updated = certificates.map(c => c.id === editingCertificate.id ? editingCertificate : c);
    onUpdateCertificates(updated);
    setEditingCertificate(null);
  };

  const handleCreateCertificate = (e: React.FormEvent) => {
    e.preventDefault();
    const created: Certificate = {
      id: `cert-${Date.now()}`,
      title: newCertificate.title || 'New Certification',
      issuer: newCertificate.issuer || 'System Issuer',
      description: newCertificate.description || 'Scope parameters.',
      iconName: newCertificate.iconName || 'award'
    };
    onUpdateCertificates([created, ...certificates]);
    setIsAddCertificateOpen(false);
    setNewCertificate({
      title: '',
      issuer: '',
      description: '',
      iconName: 'award'
    });
  };

  const handleDeleteCertificate = (id: string) => {
    if (confirm('Are you sure you want to delete this certification?')) {
      onUpdateCertificates(certificates.filter(c => c.id !== id));
    }
  };

  // Projects CRUD Handlers
  const handleSaveProjectEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;
    const updated = projects.map(p => p.id === editingProject.id ? editingProject : p);
    onUpdateProjects(updated);
    setEditingProject(null);
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    const created: Project = {
      id: `proj-${Date.now()}`,
      title: newProject.title || 'Untitled Project',
      subtitle: newProject.subtitle || 'System Subtitle',
      date: newProject.date || 'Present',
      description: newProject.description || 'System description parameters.',
      tags: newProject.tags && newProject.tags.length > 0 ? newProject.tags : ['STM32', 'C++'],
      imageUrl: newProject.imageUrl || 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9-oCQZF34VHNRw6M33I6uXQNFjwtBW4-w9lCxReEl81vewi7y9B39HC3zgn-WWFB0q9ce_MhBkgpYZeNFqMoUvLCGdafVxGdWf5ntSsNsTBCjzQOg9ZZCgIY4GnpeGNek3EKylEcbmXiqDHBJ86a2udQ25FosEMoOUJnuamZDsCxMs_N3whAhbmxFCwhX_CWxgdC-15IyWa2tVstX3D4O78Oog-Xx45JdX_BBaJpm7vmbRwzCOx0wddrrU43ZKA5HVkgq1KzNqxg',
      status: newProject.status as any || 'ACTIVE_DEV',
      refCode: `SYS-REF-${Math.floor(100 + Math.random() * 900)}`
    };
    onUpdateProjects([created, ...projects]);
    setIsAddProjectOpen(false);
    setNewProject({
      title: '',
      subtitle: '',
      date: '',
      description: '',
      tags: [],
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCnKUYGl_xCFsMT3dDSh2mQ0rD0IXXpBX9bhHZd_v-aRnDKgdAV9s9lxTMWkbVw1fHTzDEQ2wCAKB2-N-RwZopaz2WMcI3Y_dVZPFa1hz0EYC3NpW8DWyF06wHfq4DixHbWfrmMBkLsIEfkpIHPXUdBN1i3McPa5DaSCjToXZ19mToP9wYEBln4gExQyW0GeQ3OizFdFpX1DdmVsLwYTtWhd5UJJ6zsBOVGk9TBkS3d8a8tH6JwclSavI6OP93bru5bnoS8KTBygLU',
      status: 'ACTIVE_DEV',
      refCode: 'SYS-SPEC-909'
    });
    setTagInput('');
  };

  const handleDeleteProject = (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      onUpdateProjects(projects.filter(p => p.id !== id));
    }
  };

  // Skill Handlers
  const handleAddSkill = (type: 'languages' | 'toolsAndTech' | 'softSkills', value: string) => {
    if (!value.trim()) return;
    const updated = { ...skills };
    updated[type] = [...updated[type], value.trim()];
    onUpdateSkills(updated);
    if (type === 'languages') setNewLang('');
    if (type === 'toolsAndTech') setNewTool('');
    if (type === 'softSkills') setNewSoft('');
  };

  const handleRemoveSkill = (type: 'languages' | 'toolsAndTech' | 'softSkills', index: number) => {
    const updated = { ...skills };
    updated[type] = updated[type].filter((_, i) => i !== index);
    onUpdateSkills(updated);
  };

  // Profile Save
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(profileForm);
    alert('Branded Profile settings successfully updated in core system!');
  };

  return (
    <div className="min-h-screen bg-background text-on-background relative flex select-none overflow-hidden">
      
      {/* SIDEBAR NAVIGATION SHELL */}
      <aside className="h-screen w-64 shrink-0 bg-surface-container border-r border-outline-variant/60 flex flex-col py-6 z-30">
        
        {/* Brand Logo Header */}
        <div className="px-6 mb-8">
          <div className="flex items-center gap-2 mb-1">
            <Cpu className="text-primary w-5 h-5" />
            <h1 className="font-display text-lg font-bold text-on-surface tracking-tighter">Admin Console</h1>
          </div>
          <p className="font-mono text-[10px] text-outline opacity-80 uppercase">VER: {profile.systemVersion}</p>
        </div>

        {/* Navigation Menu Links */}
        <nav className="flex-1 px-4 space-y-1">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 p-3 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'dashboard'
                ? 'bg-secondary-container text-on-secondary-container'
                : 'text-on-surface-variant hover:bg-surface-variant/50'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard</span>
          </button>
          
          <button
            onClick={() => setActiveTab('projects')}
            className={`w-full flex items-center gap-3 p-3 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'projects'
                ? 'bg-secondary-container text-on-secondary-container'
                : 'text-on-surface-variant hover:bg-surface-variant/50'
            }`}
          >
            <FolderGit2 className="w-4 h-4" />
            <span>Project Manager</span>
          </button>

          <button
            onClick={() => setActiveTab('skills')}
            className={`w-full flex items-center gap-3 p-3 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'skills'
                ? 'bg-secondary-container text-on-secondary-container'
                : 'text-on-surface-variant hover:bg-surface-variant/50'
            }`}
          >
            <Binary className="w-4 h-4" />
            <span>Skill Matrix</span>
          </button>

          <button
            onClick={() => setActiveTab('experience')}
            className={`w-full flex items-center gap-3 p-3 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'experience'
                ? 'bg-secondary-container text-on-secondary-container'
                : 'text-on-surface-variant hover:bg-surface-variant/50'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Experience Manager</span>
          </button>

          <button
            onClick={() => setActiveTab('logs')}
            className={`w-full flex items-center gap-3 p-3 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'logs'
                ? 'bg-secondary-container text-on-secondary-container'
                : 'text-on-surface-variant hover:bg-surface-variant/50'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>System Logs</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 p-3 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-secondary-container text-on-secondary-container'
                : 'text-on-surface-variant hover:bg-surface-variant/50'
            }`}
          >
            <SettingsIcon className="w-4 h-4" />
            <span>Settings</span>
          </button>
        </nav>

        {/* Sidebar Footer */}
        <div className="px-6 mt-auto pt-6 border-t border-outline-variant/30 space-y-4">
          <button 
            onClick={() => {
              alert('Compiling site structures and initiating static production deployment to server on port 3000... System operational!');
            }}
            className="w-full bg-primary-container text-on-primary-container py-2.5 px-4 font-mono text-xs font-bold rounded-lg flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all cursor-pointer"
          >
            <Rocket className="w-4 h-4" />
            Deploy Update
          </button>
          
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 p-2.5 rounded text-xs font-mono font-bold text-outline hover:text-red-400 hover:bg-red-950/20 transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* MAIN CANVAS CONTAINER */}
      <main className="flex-1 h-screen overflow-y-auto micro-grid p-8 md:p-12 relative z-10">
        
        {/* Header telemetry info */}
        <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-outline-variant/30 pb-6">
          <div>
            <h2 className="font-display text-3xl font-bold text-primary mb-2 uppercase tracking-tight">
              {activeTab === 'dashboard' && 'Systems Overview'}
              {activeTab === 'projects' && 'Project Specifications'}
              {activeTab === 'skills' && 'Skills Configuration'}
              {activeTab === 'experience' && 'Experience & Certifications'}
              {activeTab === 'logs' && 'System Logs Terminal'}
              {activeTab === 'settings' && 'Core Identity Settings'}
            </h2>
            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="border border-outline-variant/50 px-3 py-0.5 rounded uppercase tracking-wider bg-surface-container-low/70">
                {profile.name}
              </span>
              <span className="text-primary opacity-50">/</span>
              <span className="text-outline uppercase">SENIOR PORTFOLIO ROOT</span>
            </div>
          </div>
          
          <div className="flex gap-4 bg-surface-container-low/60 p-4 border border-outline-variant/30 rounded-lg">
            <div className="text-right">
              <p className="font-mono text-[9px] text-outline tracking-wider uppercase">CORE_UPTIME</p>
              <p className="font-sans text-sm font-bold text-on-surface flex items-center gap-2 mt-1">
                <Clock className="w-4 h-4 text-primary animate-spin" style={{ animationDuration: '4s' }} />
                {uptime.days}D {uptime.hours}H {uptime.mins}M {uptime.secs}S
              </p>
            </div>
          </div>
        </header>

        {/* TAB VIEWS */}
        
        {/* TAB 1: DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-fade-in">
            {/* Bento metrics rows */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Stat card 1 */}
              <div className="bg-surface-container-high/60 border border-outline-variant p-6 rounded-lg relative overflow-hidden technical-border">
                <div className="scanline"></div>
                <div className="flex justify-between items-start mb-4">
                  <FolderGit2 className="text-primary w-5 h-5" />
                  <span className="bg-primary/10 text-primary text-[9px] font-mono px-2 py-0.5 rounded border border-primary/25">
                    STABLE
                  </span>
                </div>
                <p className="font-mono text-[10px] text-outline uppercase tracking-wider">TOTAL ACTIVE PROJECTS</p>
                <h3 className="font-display text-4xl font-bold mt-2 text-on-surface">{projects.length}</h3>
                <p className="font-mono text-[10px] text-primary mt-4 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  +2 this quarter
                </p>
              </div>

              {/* Stat card 2 */}
              <div className="bg-surface-container-high/60 border border-outline-variant p-6 rounded-lg relative overflow-hidden technical-border">
                <div className="flex justify-between items-start mb-4">
                  <Binary className="text-primary w-5 h-5" />
                  <span className="bg-primary/10 text-primary text-[9px] font-mono px-2 py-0.5 rounded border border-primary/25">
                    CALIBRATED
                  </span>
                </div>
                <p className="font-mono text-[10px] text-outline uppercase tracking-wider">SKILLS COMPILED</p>
                <h3 className="font-display text-4xl font-bold mt-2 text-on-surface">
                  {skills.languages.length + skills.toolsAndTech.length}
                </h3>
                <p className="font-mono text-[10px] text-outline mt-4">
                  Languages: {skills.languages.length} | Tools: {skills.toolsAndTech.length}
                </p>
              </div>

              {/* Stat card 3 */}
              <div className="bg-surface-container-high/60 border border-outline-variant p-6 rounded-lg relative overflow-hidden technical-border">
                <div className="flex justify-between items-start mb-4">
                  <Activity className="text-primary w-5 h-5 animate-pulse" />
                  <span className="bg-green-500/10 text-green-400 text-[9px] font-mono px-2 py-0.5 rounded border border-green-500/25">
                    ONLINE
                  </span>
                </div>
                <p className="font-mono text-[10px] text-outline uppercase tracking-wider">SYSTEM THREAD STATUS</p>
                <h3 className="font-display text-4xl font-bold mt-2 text-on-surface">100%</h3>
                <p className="font-mono text-[10px] text-green-400 mt-4">
                  All signal buses reporting normal
                </p>
              </div>

            </div>

            {/* Visual diagnostic layouts */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Profile Details Block */}
              <div className="lg:col-span-4 bg-surface-container p-6 border border-outline-variant rounded-lg flex flex-col justify-between">
                <div>
                  <h4 className="font-mono text-xs text-primary mb-4 border-b border-outline-variant/30 pb-2">
                    Branded Hardware Node
                  </h4>
                  <div className="flex gap-4 items-center mb-6">
                    <img 
                      src={profile.imageUrl} 
                      alt={profile.name} 
                      className="w-16 h-16 object-cover rounded border border-outline-variant"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <p className="font-display font-bold text-on-surface text-base">{profile.name}</p>
                      <p className="font-mono text-[10px] text-primary">{profile.title}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2.5 font-mono text-[11px] text-on-surface-variant">
                    <p><span className="text-outline">EMAIL:</span> {profile.email}</p>
                    <p><span className="text-outline">PHONE:</span> {profile.phone}</p>
                    <p><span className="text-outline">LOCATION:</span> {profile.location}</p>
                  </div>
                </div>

                <button 
                  onClick={() => setActiveTab('settings')}
                  className="w-full mt-6 bg-surface-container-highest border border-outline-variant hover:border-primary text-on-surface py-2.5 rounded font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <SettingsIcon className="w-4 h-4" />
                  Modify Profile Specs
                </button>
              </div>

              {/* Dynamic Live Logs terminal preview */}
              <div className="lg:col-span-8 bg-surface-container-lowest p-6 border border-outline-variant rounded-lg font-mono flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 font-mono text-[9px] text-primary opacity-30">// DIAGNOSTIC_STREAM</div>
                
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></div>
                    <span className="text-xs font-bold text-on-surface">LIVE_SYSTEM_TELEMETRY</span>
                  </div>
                  
                  <div className="space-y-2 max-h-[220px] overflow-y-auto text-[11px] scroll-hide">
                    {liveLogs.slice(0, 7).map((log) => (
                      <div key={log.id} className="flex gap-4 hover:bg-surface-container-high/30 p-1.5 rounded transition-colors">
                        <span className="text-outline-variant">{log.timestamp}</span>
                        <span className={`font-bold shrink-0 w-20 ${
                          log.type === 'SUCCESS' ? 'text-green-400' : log.type === 'WARN' ? 'text-yellow-400' : 'text-primary'
                        }`}>
                          [{log.source}]
                        </span>
                        <span className="text-on-surface-variant">{log.message}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={() => setActiveTab('logs')}
                  className="w-full mt-6 bg-surface-container-low text-outline hover:text-primary py-2.5 rounded text-xs font-bold border border-outline-variant/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Terminal className="w-4 h-4" />
                  Open Raw Stream Terminal
                </button>
              </div>

            </div>
          </div>
        )}

        {/* TAB 2: PROJECTS MANAGER */}
        {activeTab === 'projects' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center">
              <h3 className="font-mono text-xs text-primary uppercase tracking-widest">
                Registered hardware systems & prototypes
              </h3>
              <button 
                onClick={() => setIsAddProjectOpen(true)}
                className="bg-primary text-on-primary font-mono text-xs font-bold px-4 py-2.5 rounded-lg flex items-center gap-2 hover:scale-95 transition-transform cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Add New Prototype
              </button>
            </div>

            {/* List of current projects */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((proj) => (
                <div key={proj.id} className="bg-surface-container/60 border border-outline-variant rounded-lg p-6 flex flex-col justify-between hover:border-outline transition-all">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <span className="font-mono text-[10px] text-primary bg-primary/10 border border-primary/25 px-2.5 py-0.5 rounded">
                        {proj.status}
                      </span>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => setEditingProject(proj)}
                          className="p-1.5 bg-surface-container-high hover:text-primary rounded border border-outline-variant/30 cursor-pointer"
                          title="Edit Specs"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteProject(proj.id)}
                          className="p-1.5 bg-surface-container-high hover:text-red-400 rounded border border-outline-variant/30 cursor-pointer"
                          title="Delete Spec"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <h4 className="font-display font-bold text-on-surface text-lg mb-1">{proj.title}</h4>
                    <p className="font-mono text-xs text-outline mb-3">{proj.date}</p>
                    <p className="font-sans text-xs text-on-surface-variant line-clamp-3 leading-relaxed mb-4">
                      {proj.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 border-t border-outline-variant/30 pt-4 mt-2">
                    {proj.tags.map(t => (
                      <span key={t} className="font-mono text-[9px] bg-background px-2 py-0.5 rounded border border-outline-variant/20">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* ADD NEW PROJECT MODAL */}
            {isAddProjectOpen && (
              <div className="fixed inset-0 bg-background/80 backdrop-blur-md z-50 flex items-center justify-center p-6">
                <div className="bg-surface-container border border-outline-variant p-8 rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto relative shadow-2xl">
                  <button 
                    onClick={() => setIsAddProjectOpen(false)}
                    className="absolute top-4 right-4 text-outline hover:text-primary cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <h4 className="font-display font-bold text-xl text-primary mb-6 flex items-center gap-2">
                    <PlusCircle className="w-5 h-5" />
                    CREATE SPECIFICATION SHEETS
                  </h4>

                  <form onSubmit={handleCreateProject} className="space-y-4">
                    <div>
                      <label className="font-mono text-[10px] text-outline block mb-1">PROJECT TITLE</label>
                      <input 
                        type="text" 
                        required 
                        value={newProject.title} 
                        onChange={(e) => setNewProject(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full bg-background border border-outline-variant p-3 text-on-surface font-sans text-xs focus:outline-none focus:border-primary rounded"
                        placeholder="e.g. Smart IoT Grid Node"
                      />
                    </div>

                    <div>
                      <label className="font-mono text-[10px] text-outline block mb-1">SUBTITLE</label>
                      <input 
                        type="text" 
                        required 
                        value={newProject.subtitle} 
                        onChange={(e) => setNewProject(prev => ({ ...prev, subtitle: e.target.value }))}
                        className="w-full bg-background border border-outline-variant p-3 text-on-surface font-sans text-xs focus:outline-none focus:border-primary rounded"
                        placeholder="e.g. Industrial automated substation concepts"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="font-mono text-[10px] text-outline block mb-1">DATE / SPAN</label>
                        <input 
                          type="text" 
                          required 
                          value={newProject.date} 
                          onChange={(e) => setNewProject(prev => ({ ...prev, date: e.target.value }))}
                          className="w-full bg-background border border-outline-variant p-3 text-on-surface font-mono text-xs focus:outline-none focus:border-primary rounded"
                          placeholder="e.g. Jan 2026 - Present"
                        />
                      </div>
                      <div>
                        <label className="font-mono text-[10px] text-outline block mb-1">SYSTEM STATUS</label>
                        <select 
                          value={newProject.status} 
                          onChange={(e) => setNewProject(prev => ({ ...prev, status: e.target.value as any }))}
                          className="w-full bg-background border border-outline-variant p-3 text-on-surface font-mono text-xs focus:outline-none focus:border-primary rounded"
                        >
                          <option value="STABLE_V1.0">STABLE_V1.0</option>
                          <option value="ACTIVE_DEV">ACTIVE_DEV</option>
                          <option value="COMPLETED">COMPLETED</option>
                          <option value="PLANNING">PLANNING</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="font-mono text-[10px] text-outline block mb-1">IMAGE SOURCE URL</label>
                      <input 
                        type="text" 
                        required 
                        value={newProject.imageUrl} 
                        onChange={(e) => setNewProject(prev => ({ ...prev, imageUrl: e.target.value }))}
                        className="w-full bg-background border border-outline-variant p-3 text-on-surface font-sans text-xs focus:outline-none focus:border-primary rounded"
                      />
                    </div>

                    <div>
                      <label className="font-mono text-[10px] text-outline block mb-1">CORE TECHNICAL TAGS (COMMA SEPARATED)</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="e.g. STM32, C++, RTOS, SPI"
                        value={tagInput}
                        onChange={(e) => {
                          setTagInput(e.target.value);
                          setNewProject(prev => ({ 
                            ...prev, 
                            tags: e.target.value.split(',').map(t => t.trim().toUpperCase()).filter(Boolean) 
                          }));
                        }}
                        className="w-full bg-background border border-outline-variant p-3 text-on-surface font-mono text-xs focus:outline-none focus:border-primary rounded"
                      />
                    </div>

                    <div>
                      <label className="font-mono text-[10px] text-outline block mb-1">DETAILED ARCHITECTURAL DESCRIPTION</label>
                      <textarea 
                        rows={4} 
                        required 
                        value={newProject.description} 
                        onChange={(e) => setNewProject(prev => ({ ...prev, description: e.target.value }))}
                        className="w-full bg-background border border-outline-variant p-3 text-on-surface font-sans text-xs focus:outline-none focus:border-primary rounded"
                        placeholder="Describe the hardware components and engineering process..."
                      />
                    </div>

                    <button 
                      type="submit"
                      className="w-full bg-primary text-on-primary font-mono text-xs font-bold uppercase tracking-wider py-4 rounded-lg flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      Commit Spec Sheet
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* EDIT PROJECT MODAL */}
            {editingProject && (
              <div className="fixed inset-0 bg-background/80 backdrop-blur-md z-50 flex items-center justify-center p-6">
                <div className="bg-surface-container border border-outline-variant p-8 rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto relative shadow-2xl">
                  <button 
                    onClick={() => setEditingProject(null)}
                    className="absolute top-4 right-4 text-outline hover:text-primary cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <h4 className="font-display font-bold text-xl text-primary mb-6 flex items-center gap-2">
                    <Edit className="w-5 h-5" />
                    EDIT SPECIFICATION DATA
                  </h4>

                  <form onSubmit={handleSaveProjectEdit} className="space-y-4">
                    <div>
                      <label className="font-mono text-[10px] text-outline block mb-1">PROJECT TITLE</label>
                      <input 
                        type="text" 
                        required 
                        value={editingProject.title} 
                        onChange={(e) => setEditingProject(prev => prev ? ({ ...prev, title: e.target.value }) : null)}
                        className="w-full bg-background border border-outline-variant p-3 text-on-surface font-sans text-xs focus:outline-none focus:border-primary rounded"
                      />
                    </div>

                    <div>
                      <label className="font-mono text-[10px] text-outline block mb-1">SUBTITLE</label>
                      <input 
                        type="text" 
                        required 
                        value={editingProject.subtitle} 
                        onChange={(e) => setEditingProject(prev => prev ? ({ ...prev, subtitle: e.target.value }) : null)}
                        className="w-full bg-background border border-outline-variant p-3 text-on-surface font-sans text-xs focus:outline-none focus:border-primary rounded"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="font-mono text-[10px] text-outline block mb-1">DATE / SPAN</label>
                        <input 
                          type="text" 
                          required 
                          value={editingProject.date} 
                          onChange={(e) => setEditingProject(prev => prev ? ({ ...prev, date: e.target.value }) : null)}
                          className="w-full bg-background border border-outline-variant p-3 text-on-surface font-mono text-xs focus:outline-none focus:border-primary rounded"
                        />
                      </div>
                      <div>
                        <label className="font-mono text-[10px] text-outline block mb-1">SYSTEM STATUS</label>
                        <select 
                          value={editingProject.status} 
                          onChange={(e) => setEditingProject(prev => prev ? ({ ...prev, status: e.target.value as any }) : null)}
                          className="w-full bg-background border border-outline-variant p-3 text-on-surface font-mono text-xs focus:outline-none focus:border-primary rounded"
                        >
                          <option value="STABLE_V1.0">STABLE_V1.0</option>
                          <option value="ACTIVE_DEV">ACTIVE_DEV</option>
                          <option value="COMPLETED">COMPLETED</option>
                          <option value="PLANNING">PLANNING</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="font-mono text-[10px] text-outline block mb-1">IMAGE SOURCE URL</label>
                      <input 
                        type="text" 
                        required 
                        value={editingProject.imageUrl} 
                        onChange={(e) => setEditingProject(prev => prev ? ({ ...prev, imageUrl: e.target.value }) : null)}
                        className="w-full bg-background border border-outline-variant p-3 text-on-surface font-sans text-xs focus:outline-none focus:border-primary rounded"
                      />
                    </div>

                    <div>
                      <label className="font-mono text-[10px] text-outline block mb-1">CORE TECHNICAL TAGS (COMMA SEPARATED)</label>
                      <input 
                        type="text" 
                        required 
                        value={editingProject.tags.join(', ')}
                        onChange={(e) => {
                          const updatedTags = e.target.value.split(',').map(t => t.trim().toUpperCase()).filter(Boolean);
                          setEditingProject(prev => prev ? ({ ...prev, tags: updatedTags }) : null);
                        }}
                        className="w-full bg-background border border-outline-variant p-3 text-on-surface font-mono text-xs focus:outline-none focus:border-primary rounded"
                      />
                    </div>

                    <div>
                      <label className="font-mono text-[10px] text-outline block mb-1">DETAILED ARCHITECTURAL DESCRIPTION</label>
                      <textarea 
                        rows={4} 
                        required 
                        value={editingProject.description} 
                        onChange={(e) => setEditingProject(prev => prev ? ({ ...prev, description: e.target.value }) : null)}
                        className="w-full bg-background border border-outline-variant p-3 text-on-surface font-sans text-xs focus:outline-none focus:border-primary rounded"
                      />
                    </div>

                    <button 
                      type="submit"
                      className="w-full bg-primary text-on-primary font-mono text-xs font-bold uppercase tracking-wider py-4 rounded-lg flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      Save Configurations
                    </button>
                  </form>
                </div>
              </div>
            )}

          </div>
        )}

        {/* TAB 3: SKILLS CONFIG */}
        {activeTab === 'skills' && (
          <div className="space-y-8 animate-fade-in">
            <h4 className="font-mono text-xs text-primary uppercase tracking-widest border-b border-outline-variant/30 pb-2">
              Dynamically populate languages and toolstacks
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Programming Languages */}
              <div className="bg-surface-container/60 border border-outline-variant p-6 rounded-lg flex flex-col justify-between">
                <div>
                  <h4 className="font-display font-bold text-on-surface text-base mb-4 flex items-center justify-between">
                    <span>Languages</span>
                    <span className="font-mono text-[10px] text-primary">QTY: {skills.languages.length}</span>
                  </h4>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {skills.languages.map((lang, index) => (
                      <span key={index} className="inline-flex items-center gap-1.5 bg-surface-container-high border border-outline-variant/50 px-3 py-1 rounded font-mono text-xs text-on-surface-variant">
                        {lang}
                        <button 
                          onClick={() => handleRemoveSkill('languages', index)}
                          className="hover:text-red-400 cursor-pointer text-outline font-bold text-[10px] ml-1"
                        >
                          ✕
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <input 
                    type="text" 
                    placeholder="Add Programming Language" 
                    value={newLang}
                    onChange={(e) => setNewLang(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddSkill('languages', newLang)}
                    className="w-full bg-background border border-outline-variant p-2.5 text-on-surface font-mono text-xs focus:outline-none focus:border-primary rounded"
                  />
                  <button 
                    onClick={() => handleAddSkill('languages', newLang)}
                    className="w-full bg-surface-container-highest text-primary border border-primary/20 hover:border-primary hover:bg-primary/10 font-mono text-xs p-2 rounded transition-colors cursor-pointer"
                  >
                    + Register Language
                  </button>
                </div>
              </div>

              {/* Tools & Tech */}
              <div className="bg-surface-container/60 border border-outline-variant p-6 rounded-lg flex flex-col justify-between">
                <div>
                  <h4 className="font-display font-bold text-on-surface text-base mb-4 flex items-center justify-between">
                    <span>Tools & Technologies</span>
                    <span className="font-mono text-[10px] text-primary">QTY: {skills.toolsAndTech.length}</span>
                  </h4>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {skills.toolsAndTech.map((tool, index) => (
                      <span key={index} className="inline-flex items-center gap-1.5 bg-surface-container-high border border-outline-variant/50 px-3 py-1 rounded font-mono text-xs text-on-surface-variant">
                        {tool}
                        <button 
                          onClick={() => handleRemoveSkill('toolsAndTech', index)}
                          className="hover:text-red-400 cursor-pointer text-outline font-bold text-[10px] ml-1"
                        >
                          ✕
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <input 
                    type="text" 
                    placeholder="Add Tool (e.g. KiCad)" 
                    value={newTool}
                    onChange={(e) => setNewTool(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddSkill('toolsAndTech', newTool)}
                    className="w-full bg-background border border-outline-variant p-2.5 text-on-surface font-mono text-xs focus:outline-none focus:border-primary rounded"
                  />
                  <button 
                    onClick={() => handleAddSkill('toolsAndTech', newTool)}
                    className="w-full bg-surface-container-highest text-primary border border-primary/20 hover:border-primary hover:bg-primary/10 font-mono text-xs p-2 rounded transition-colors cursor-pointer"
                  >
                    + Register Tool/Tech
                  </button>
                </div>
              </div>

              {/* Soft Attributes */}
              <div className="bg-surface-container/60 border border-outline-variant p-6 rounded-lg flex flex-col justify-between">
                <div>
                  <h4 className="font-display font-bold text-on-surface text-base mb-4 flex items-center justify-between">
                    <span>Soft Attributes</span>
                    <span className="font-mono text-[10px] text-primary">QTY: {skills.softSkills.length}</span>
                  </h4>
                  <div className="space-y-2 mb-6">
                    {skills.softSkills.map((soft, index) => (
                      <div key={index} className="flex justify-between items-center bg-surface-container-high border border-outline-variant/40 p-2 rounded font-sans text-xs text-on-surface-variant">
                        <span>{soft}</span>
                        <button 
                          onClick={() => handleRemoveSkill('softSkills', index)}
                          className="text-outline hover:text-red-400 font-bold font-mono text-xs cursor-pointer ml-2 shrink-0"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <input 
                    type="text" 
                    placeholder="Add Soft Attribute" 
                    value={newSoft}
                    onChange={(e) => setNewSoft(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddSkill('softSkills', newSoft)}
                    className="w-full bg-background border border-outline-variant p-2.5 text-on-surface font-sans text-xs focus:outline-none focus:border-primary rounded"
                  />
                  <button 
                    onClick={() => handleAddSkill('softSkills', newSoft)}
                    className="w-full bg-surface-container-highest text-primary border border-primary/20 hover:border-primary hover:bg-primary/10 font-mono text-xs p-2 rounded transition-colors cursor-pointer"
                  >
                    + Register Attribute
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 4: EXPERIENCE MANAGER */}
        {activeTab === 'experience' && (
          <div className="space-y-8 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Timeline (Trajectory) Section */}
              <div className="bg-surface-container/40 border border-outline-variant p-6 rounded-xl flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-6 border-b border-outline-variant/30 pb-4">
                    <h4 className="font-display font-bold text-on-surface text-lg flex items-center gap-2">
                      <Clock className="w-5 h-5 text-primary" />
                      Professional Trajectory
                    </h4>
                    <button 
                      onClick={() => setIsAddTimelineOpen(true)}
                      className="bg-primary/10 border border-primary/25 text-primary hover:bg-primary/20 font-mono text-xs font-bold px-3 py-1.5 rounded flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      ADD_EVENT
                    </button>
                  </div>

                  <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                    {timeline.map((item) => (
                      <div key={item.id} className="p-4 bg-surface-container border border-outline-variant/50 rounded-lg flex flex-col justify-between hover:border-primary transition-colors">
                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <span className="font-mono text-[10px] text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20">
                              {item.date}
                            </span>
                            <div className="flex gap-2 text-outline">
                              <button 
                                onClick={() => setEditingTimeline(item)}
                                className="p-1 hover:text-primary rounded border border-outline-variant/30 bg-surface-container-high cursor-pointer"
                              >
                                <Edit className="w-3.5 h-3.5" />
                              </button>
                              <button 
                                onClick={() => handleDeleteTimeline(item.id)}
                                className="p-1 hover:text-red-400 rounded border border-outline-variant/30 bg-surface-container-high cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                          <h5 className="font-display font-bold text-on-surface mt-2 text-sm">{item.company}</h5>
                          <p className="font-mono text-[10px] text-outline">{item.role} | {item.location}</p>
                          <p className="font-sans text-xs text-on-surface-variant mt-2 line-clamp-3 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Certifications Section */}
              <div className="bg-surface-container/40 border border-outline-variant p-6 rounded-xl flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-6 border-b border-outline-variant/30 pb-4">
                    <h4 className="font-display font-bold text-on-surface text-lg flex items-center gap-2">
                      <Award className="w-5 h-5 text-primary" />
                      Certifications
                    </h4>
                    <button 
                      onClick={() => setIsAddCertificateOpen(true)}
                      className="bg-primary/10 border border-primary/25 text-primary hover:bg-primary/20 font-mono text-xs font-bold px-3 py-1.5 rounded flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      ADD_CERT
                    </button>
                  </div>

                  <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                    {certificates.map((cert) => (
                      <div key={cert.id} className="p-4 bg-surface-container border border-outline-variant/50 rounded-lg flex flex-col justify-between hover:border-primary transition-colors">
                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <span className="font-mono text-[10px] text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20">
                              {cert.issuer}
                            </span>
                            <div className="flex gap-2 text-outline">
                              <button 
                                onClick={() => setEditingCertificate(cert)}
                                className="p-1 hover:text-primary rounded border border-outline-variant/30 bg-surface-container-high cursor-pointer"
                              >
                                <Edit className="w-3.5 h-3.5" />
                              </button>
                              <button 
                                onClick={() => handleDeleteCertificate(cert.id)}
                                className="p-1 hover:text-red-400 rounded border border-outline-variant/30 bg-surface-container-high cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                          <h5 className="font-display font-bold text-on-surface mt-2 text-sm">{cert.title}</h5>
                          <p className="font-sans text-xs text-on-surface-variant mt-2 line-clamp-3 leading-relaxed">
                            {cert.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* ADD TIMELINE MODAL */}
            {isAddTimelineOpen && (
              <div className="fixed inset-0 bg-background/80 backdrop-blur-md z-50 flex items-center justify-center p-6">
                <div className="bg-surface-container border border-outline-variant p-8 rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto relative shadow-2xl">
                  <button 
                    onClick={() => setIsAddTimelineOpen(false)}
                    className="absolute top-4 right-4 text-outline hover:text-primary cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <h4 className="font-display font-bold text-xl text-primary mb-6 flex items-center gap-2 uppercase tracking-wider">
                    <Plus className="w-5 h-5" />
                    REGISTER PROFESSIONAL RECORD
                  </h4>

                  <form onSubmit={handleCreateTimeline} className="space-y-4">
                    <div>
                      <label className="font-mono text-[10px] text-outline block mb-1">COMPANY NAME</label>
                      <input 
                        type="text" 
                        required 
                        value={newTimeline.company} 
                        onChange={(e) => setNewTimeline(prev => ({ ...prev, company: e.target.value }))}
                        className="w-full bg-background border border-outline-variant p-3 text-on-surface font-sans text-xs focus:outline-none focus:border-primary rounded"
                        placeholder="e.g. Siemens Electrical Systems"
                      />
                    </div>

                    <div>
                      <label className="font-mono text-[10px] text-outline block mb-1">ROLE / TITLE</label>
                      <input 
                        type="text" 
                        required 
                        value={newTimeline.role} 
                        onChange={(e) => setNewTimeline(prev => ({ ...prev, role: e.target.value }))}
                        className="w-full bg-background border border-outline-variant p-3 text-on-surface font-sans text-xs focus:outline-none focus:border-primary rounded"
                        placeholder="e.g. Systems Engineer / Intern"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="font-mono text-[10px] text-outline block mb-1">DATE / SPAN</label>
                        <input 
                          type="text" 
                          required 
                          value={newTimeline.date} 
                          onChange={(e) => setNewTimeline(prev => ({ ...prev, date: e.target.value }))}
                          className="w-full bg-background border border-outline-variant p-3 text-on-surface font-mono text-xs focus:outline-none focus:border-primary rounded"
                          placeholder="e.g. Jun 2025 - Present"
                        />
                      </div>
                      <div>
                        <label className="font-mono text-[10px] text-outline block mb-1">LOCATION</label>
                        <input 
                          type="text" 
                          required 
                          value={newTimeline.location} 
                          onChange={(e) => setNewTimeline(prev => ({ ...prev, location: e.target.value }))}
                          className="w-full bg-background border border-outline-variant p-3 text-on-surface font-sans text-xs focus:outline-none focus:border-primary rounded"
                          placeholder="e.g. Hyderabad, TS"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 py-2">
                      <input 
                        type="checkbox" 
                        id="isProjected" 
                        checked={newTimeline.isProjected} 
                        onChange={(e) => setNewTimeline(prev => ({ ...prev, isProjected: e.target.checked }))}
                        className="w-4 h-4 accent-primary"
                      />
                      <label htmlFor="isProjected" className="font-mono text-[10px] text-outline cursor-pointer uppercase select-none">Mark as projected/future milestones</label>
                    </div>

                    <div>
                      <label className="font-mono text-[10px] text-outline block mb-1">DETAILED ARCHITECTURAL DESCRIPTION</label>
                      <textarea 
                        rows={4} 
                        required 
                        value={newTimeline.description} 
                        onChange={(e) => setNewTimeline(prev => ({ ...prev, description: e.target.value }))}
                        className="w-full bg-background border border-outline-variant p-3 text-on-surface font-sans text-xs focus:outline-none focus:border-primary rounded"
                        placeholder="Describe your primary electrical / hardware responsibilities..."
                      />
                    </div>

                    <button 
                      type="submit"
                      className="w-full bg-primary text-on-primary font-mono text-xs font-bold uppercase tracking-wider py-4 rounded-lg flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      Commit Trajectory Spec
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* EDIT TIMELINE MODAL */}
            {editingTimeline && (
              <div className="fixed inset-0 bg-background/80 backdrop-blur-md z-50 flex items-center justify-center p-6">
                <div className="bg-surface-container border border-outline-variant p-8 rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto relative shadow-2xl">
                  <button 
                    onClick={() => setEditingTimeline(null)}
                    className="absolute top-4 right-4 text-outline hover:text-primary cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <h4 className="font-display font-bold text-xl text-primary mb-6 flex items-center gap-2 uppercase tracking-wider">
                    <Edit className="w-5 h-5" />
                    EDIT TRAJECTORY SPEC
                  </h4>

                  <form onSubmit={handleSaveTimelineEdit} className="space-y-4">
                    <div>
                      <label className="font-mono text-[10px] text-outline block mb-1">COMPANY NAME</label>
                      <input 
                        type="text" 
                        required 
                        value={editingTimeline.company} 
                        onChange={(e) => setEditingTimeline(prev => prev ? ({ ...prev, company: e.target.value }) : null)}
                        className="w-full bg-background border border-outline-variant p-3 text-on-surface font-sans text-xs focus:outline-none focus:border-primary rounded"
                      />
                    </div>

                    <div>
                      <label className="font-mono text-[10px] text-outline block mb-1">ROLE / TITLE</label>
                      <input 
                        type="text" 
                        required 
                        value={editingTimeline.role} 
                        onChange={(e) => setEditingTimeline(prev => prev ? ({ ...prev, role: e.target.value }) : null)}
                        className="w-full bg-background border border-outline-variant p-3 text-on-surface font-sans text-xs focus:outline-none focus:border-primary rounded"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="font-mono text-[10px] text-outline block mb-1">DATE / SPAN</label>
                        <input 
                          type="text" 
                          required 
                          value={editingTimeline.date} 
                          onChange={(e) => setEditingTimeline(prev => prev ? ({ ...prev, date: e.target.value }) : null)}
                          className="w-full bg-background border border-outline-variant p-3 text-on-surface font-mono text-xs focus:outline-none focus:border-primary rounded"
                        />
                      </div>
                      <div>
                        <label className="font-mono text-[10px] text-outline block mb-1">LOCATION</label>
                        <input 
                          type="text" 
                          required 
                          value={editingTimeline.location} 
                          onChange={(e) => setEditingTimeline(prev => prev ? ({ ...prev, location: e.target.value }) : null)}
                          className="w-full bg-background border border-outline-variant p-3 text-on-surface font-sans text-xs focus:outline-none focus:border-primary rounded"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 py-2">
                      <input 
                        type="checkbox" 
                        id="editIsProjected" 
                        checked={editingTimeline.isProjected} 
                        onChange={(e) => setEditingTimeline(prev => prev ? ({ ...prev, isProjected: e.target.checked }) : null)}
                        className="w-4 h-4 accent-primary"
                      />
                      <label htmlFor="editIsProjected" className="font-mono text-[10px] text-outline cursor-pointer uppercase select-none">Mark as projected/future milestones</label>
                    </div>

                    <div>
                      <label className="font-mono text-[10px] text-outline block mb-1">DETAILED ARCHITECTURAL DESCRIPTION</label>
                      <textarea 
                        rows={4} 
                        required 
                        value={editingTimeline.description} 
                        onChange={(e) => setEditingTimeline(prev => prev ? ({ ...prev, description: e.target.value }) : null)}
                        className="w-full bg-background border border-outline-variant p-3 text-on-surface font-sans text-xs focus:outline-none focus:border-primary rounded"
                      />
                    </div>

                    <button 
                      type="submit"
                      className="w-full bg-primary text-on-primary font-mono text-xs font-bold uppercase tracking-wider py-4 rounded-lg flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      Save Spec Configurations
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* ADD CERTIFICATE MODAL */}
            {isAddCertificateOpen && (
              <div className="fixed inset-0 bg-background/80 backdrop-blur-md z-50 flex items-center justify-center p-6">
                <div className="bg-surface-container border border-outline-variant p-8 rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto relative shadow-2xl">
                  <button 
                    onClick={() => setIsAddCertificateOpen(false)}
                    className="absolute top-4 right-4 text-outline hover:text-primary cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <h4 className="font-display font-bold text-xl text-primary mb-6 flex items-center gap-2 uppercase tracking-wider">
                    <Plus className="w-5 h-5" />
                    REGISTER CERTIFICATION
                  </h4>

                  <form onSubmit={handleCreateCertificate} className="space-y-4">
                    <div>
                      <label className="font-mono text-[10px] text-outline block mb-1">CERTIFICATE TITLE</label>
                      <input 
                        type="text" 
                        required 
                        value={newCertificate.title} 
                        onChange={(e) => setNewCertificate(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full bg-background border border-outline-variant p-3 text-on-surface font-sans text-xs focus:outline-none focus:border-primary rounded"
                        placeholder="e.g. Siemens SIMATIC SCADA"
                      />
                    </div>

                    <div>
                      <label className="font-mono text-[10px] text-outline block mb-1">ISSUER / ORGANIZATION</label>
                      <input 
                        type="text" 
                        required 
                        value={newCertificate.issuer} 
                        onChange={(e) => setNewCertificate(prev => ({ ...prev, issuer: e.target.value }))}
                        className="w-full bg-background border border-outline-variant p-3 text-on-surface font-sans text-xs focus:outline-none focus:border-primary rounded"
                        placeholder="e.g. Siemens Germany"
                      />
                    </div>

                    <div>
                      <label className="font-mono text-[10px] text-outline block mb-1">ICON DESIGN</label>
                      <select 
                        value={newCertificate.iconName} 
                        onChange={(e) => setNewCertificate(prev => ({ ...prev, iconName: e.target.value }))}
                        className="w-full bg-background border border-outline-variant p-3 text-on-surface font-mono text-xs focus:outline-none focus:border-primary rounded"
                      >
                        <option value="award">AWARD_SHIELD_ICON</option>
                        <option value="minor_crash">LAYERS_CIRCUIT_ICON</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-mono text-[10px] text-outline block mb-1">CERTIFICATE SCOPE / DESCRIPTION</label>
                      <textarea 
                        rows={4} 
                        required 
                        value={newCertificate.description} 
                        onChange={(e) => setNewCertificate(prev => ({ ...prev, description: e.target.value }))}
                        className="w-full bg-background border border-outline-variant p-3 text-on-surface font-sans text-xs focus:outline-none focus:border-primary rounded"
                        placeholder="Summarize the credentials scope and validating hardware systems..."
                      />
                    </div>

                    <button 
                      type="submit"
                      className="w-full bg-primary text-on-primary font-mono text-xs font-bold uppercase tracking-wider py-4 rounded-lg flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      Register Credentials
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* EDIT CERTIFICATE MODAL */}
            {editingCertificate && (
              <div className="fixed inset-0 bg-background/80 backdrop-blur-md z-50 flex items-center justify-center p-6">
                <div className="bg-surface-container border border-outline-variant p-8 rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto relative shadow-2xl">
                  <button 
                    onClick={() => setEditingCertificate(null)}
                    className="absolute top-4 right-4 text-outline hover:text-primary cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <h4 className="font-display font-bold text-xl text-primary mb-6 flex items-center gap-2 uppercase tracking-wider">
                    <Edit className="w-5 h-5" />
                    EDIT CERTIFICATION SPEC
                  </h4>

                  <form onSubmit={handleSaveCertificateEdit} className="space-y-4">
                    <div>
                      <label className="font-mono text-[10px] text-outline block mb-1">CERTIFICATE TITLE</label>
                      <input 
                        type="text" 
                        required 
                        value={editingCertificate.title} 
                        onChange={(e) => setEditingCertificate(prev => prev ? ({ ...prev, title: e.target.value }) : null)}
                        className="w-full bg-background border border-outline-variant p-3 text-on-surface font-sans text-xs focus:outline-none focus:border-primary rounded"
                      />
                    </div>

                    <div>
                      <label className="font-mono text-[10px] text-outline block mb-1">ISSUER / ORGANIZATION</label>
                      <input 
                        type="text" 
                        required 
                        value={editingCertificate.issuer} 
                        onChange={(e) => setEditingCertificate(prev => prev ? ({ ...prev, issuer: e.target.value }) : null)}
                        className="w-full bg-background border border-outline-variant p-3 text-on-surface font-sans text-xs focus:outline-none focus:border-primary rounded"
                      />
                    </div>

                    <div>
                      <label className="font-mono text-[10px] text-outline block mb-1">ICON DESIGN</label>
                      <select 
                        value={editingCertificate.iconName} 
                        onChange={(e) => setEditingCertificate(prev => prev ? ({ ...prev, iconName: e.target.value }) : null)}
                        className="w-full bg-background border border-outline-variant p-3 text-on-surface font-mono text-xs focus:outline-none focus:border-primary rounded"
                      >
                        <option value="award">AWARD_SHIELD_ICON</option>
                        <option value="minor_crash">LAYERS_CIRCUIT_ICON</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-mono text-[10px] text-outline block mb-1">CERTIFICATE SCOPE / DESCRIPTION</label>
                      <textarea 
                        rows={4} 
                        required 
                        value={editingCertificate.description} 
                        onChange={(e) => setEditingCertificate(prev => prev ? ({ ...prev, description: e.target.value }) : null)}
                        className="w-full bg-background border border-outline-variant p-3 text-on-surface font-sans text-xs focus:outline-none focus:border-primary rounded"
                      />
                    </div>

                    <button 
                      type="submit"
                      className="w-full bg-primary text-on-primary font-mono text-xs font-bold uppercase tracking-wider py-4 rounded-lg flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      Save Credentials Spec
                    </button>
                  </form>
                </div>
              </div>
            )}

          </div>
        )}

        {/* TAB 4: SYSTEM LOGS */}
        {activeTab === 'logs' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center">
              <span className="font-mono text-xs text-primary uppercase tracking-widest">
                Raw serial hardware compiler diagnostic buffers
              </span>
              <button 
                onClick={() => setLiveLogs([])}
                className="font-mono text-xs text-outline hover:text-red-400 bg-surface-container px-3 py-1.5 border border-outline-variant/45 rounded transition-colors cursor-pointer"
              >
                Clear Terminal Buffer
              </button>
            </div>

            {/* Expansive shell terminal */}
            <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-lg font-mono text-xs h-[480px] overflow-y-auto flex flex-col justify-between shadow-2xl relative">
              <div className="scanline"></div>
              
              <div className="space-y-2.5 max-h-[410px] overflow-y-auto scroll-hide">
                <div className="text-outline border-b border-outline-variant/20 pb-2 flex justify-between uppercase">
                  <span>TIMESTAMP</span>
                  <span>BUS_NODE</span>
                  <span>TELEMETRY_MESSAGE_HEX_DECODE</span>
                </div>
                {liveLogs.length === 0 ? (
                  <div className="text-center text-outline-variant py-20 uppercase tracking-tighter">
                    --- Telemetry terminal buffer empty. System silent. ---
                  </div>
                ) : (
                  liveLogs.map((log) => (
                    <div key={log.id} className="flex gap-4 hover:bg-surface-container-high/20 p-1.5 rounded transition-colors">
                      <span className="text-outline-variant">{log.timestamp}</span>
                      <span className={`font-bold shrink-0 w-24 ${
                        log.type === 'SUCCESS' ? 'text-green-400' : log.type === 'WARN' ? 'text-yellow-400' : 'text-primary'
                      }`}>
                        [{log.source}]
                      </span>
                      <span className="text-on-surface-variant">{log.message}</span>
                    </div>
                  ))
                )}
              </div>

              {/* Status input mimic */}
              <div className="border-t border-outline-variant/30 pt-4 flex gap-4 items-center">
                <span className="text-primary font-bold">{`root@mohankrishna_eee:~#`}</span>
                <input 
                  type="text" 
                  placeholder="Insert custom command parameter logs manually... (Press Enter)"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      const inputEl = e.target as HTMLInputElement;
                      if (!inputEl.value) return;
                      const now = new Date();
                      const timestamp = now.toTimeString().split(' ')[0];
                      const manualLog: SystemLog = {
                        id: `manual-log-${Date.now()}`,
                        timestamp,
                        type: 'SUCCESS',
                        source: 'TERMINAL_CMD',
                        message: inputEl.value
                      };
                      setLiveLogs(prev => [manualLog, ...prev]);
                      inputEl.value = '';
                    }
                  }}
                  className="flex-1 bg-transparent focus:outline-none text-green-400 font-mono text-xs"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: SETTINGS */}
        {activeTab === 'settings' && (
          <div className="max-w-2xl bg-surface-container/60 border border-outline-variant p-8 rounded-xl relative overflow-hidden animate-fade-in">
            <h3 className="font-display font-bold text-xl text-primary mb-6 flex items-center gap-2">
              <SettingsIcon className="w-5 h-5" />
              Modify Portfolio Identity Parameters
            </h3>

            <form onSubmit={handleSaveProfile} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-mono text-[10px] text-outline block mb-1">ENGINEER FULL NAME</label>
                  <input 
                    type="text" 
                    required 
                    value={profileForm.name}
                    onChange={(e) => setProfileForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full bg-background border border-outline-variant p-3 text-on-surface font-sans text-xs focus:outline-none focus:border-primary rounded"
                  />
                </div>
                <div>
                  <label className="font-mono text-[10px] text-outline block mb-1">PROFESSIONAL TITLE</label>
                  <input 
                    type="text" 
                    required 
                    value={profileForm.title}
                    onChange={(e) => setProfileForm(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full bg-background border border-outline-variant p-3 text-on-surface font-sans text-xs focus:outline-none focus:border-primary rounded"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-mono text-[10px] text-outline block mb-1">EMAIL ADDRESS</label>
                  <input 
                    type="email" 
                    required 
                    value={profileForm.email}
                    onChange={(e) => setProfileForm(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full bg-background border border-outline-variant p-3 text-on-surface font-sans text-xs focus:outline-none focus:border-primary rounded"
                  />
                </div>
                <div>
                  <label className="font-mono text-[10px] text-outline block mb-1">PHONE NUMBER</label>
                  <input 
                    type="text" 
                    required 
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full bg-background border border-outline-variant p-3 text-on-surface font-mono text-xs focus:outline-none focus:border-primary rounded"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-mono text-[10px] text-outline block mb-1">LOCATION (CITY, STATE)</label>
                  <input 
                    type="text" 
                    required 
                    value={profileForm.location}
                    onChange={(e) => setProfileForm(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full bg-background border border-outline-variant p-3 text-on-surface font-sans text-xs focus:outline-none focus:border-primary rounded"
                  />
                </div>
                <div>
                  <label className="font-mono text-[10px] text-outline block mb-1">CORE TOOLS IN MENU</label>
                  <input 
                    type="text" 
                    required 
                    value={profileForm.coreTools}
                    onChange={(e) => setProfileForm(prev => ({ ...prev, coreTools: e.target.value }))}
                    className="w-full bg-background border border-outline-variant p-3 text-on-surface font-sans text-xs focus:outline-none focus:border-primary rounded"
                  />
                </div>
              </div>

              <div>
                <label className="font-mono text-[10px] text-outline block mb-1">PORTRAIT IMAGE URL</label>
                <input 
                  type="text" 
                  required 
                  value={profileForm.imageUrl}
                  onChange={(e) => setProfileForm(prev => ({ ...prev, imageUrl: e.target.value }))}
                  className="w-full bg-background border border-outline-variant p-3 text-on-surface font-sans text-xs focus:outline-none focus:border-primary rounded"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-mono text-[10px] text-outline block mb-1">LINKEDIN URL</label>
                  <input 
                    type="text" 
                    required 
                    value={profileForm.linkedin}
                    onChange={(e) => setProfileForm(prev => ({ ...prev, linkedin: e.target.value }))}
                    className="w-full bg-background border border-outline-variant p-3 text-on-surface font-sans text-xs focus:outline-none focus:border-primary rounded"
                  />
                </div>
                <div>
                  <label className="font-mono text-[10px] text-outline block mb-1">GITHUB URL</label>
                  <input 
                    type="text" 
                    required 
                    value={profileForm.github}
                    onChange={(e) => setProfileForm(prev => ({ ...prev, github: e.target.value }))}
                    className="w-full bg-background border border-outline-variant p-3 text-on-surface font-sans text-xs focus:outline-none focus:border-primary rounded"
                  />
                </div>
              </div>

              <div>
                <label className="font-mono text-[10px] text-outline block mb-1">SYSTEM OBJECTIVE BIOGRAPHY</label>
                <textarea 
                  rows={4} 
                  required 
                  value={profileForm.objective}
                  onChange={(e) => setProfileForm(prev => ({ ...prev, objective: e.target.value }))}
                  className="w-full bg-background border border-outline-variant p-3 text-on-surface font-sans text-xs focus:outline-none focus:border-primary rounded"
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-primary text-on-primary font-mono text-xs font-bold uppercase tracking-wider py-4 rounded-lg flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all cursor-pointer"
              >
                <Save className="w-4 h-4" />
                Commit Parameters to Database
              </button>
            </form>
          </div>
        )}

      </main>
    </div>
  );
}
