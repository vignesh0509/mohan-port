import React, { useState } from 'react';
import { Project, SkillGroup, Certificate, TimelineEvent, ProfileInfo } from '../types';
import { Cpu, Wrench, Network, Award, Mail, Phone, MapPin, ExternalLink, Calendar, Layers, Terminal, ArrowRight, Eye, LayoutDashboard, X, Edit, Trash2, Plus, CheckCircle2, Save } from 'lucide-react';

interface PublicPortfolioProps {
  profile: ProfileInfo;
  projects: Project[];
  skills: SkillGroup;
  certificates: Certificate[];
  timeline: TimelineEvent[];
  onNavigateToLogin: () => void;
  onNavigateToAdmin: () => void;
  isLoggedIn: boolean;
  onUpdateTimeline?: (t: TimelineEvent[]) => void;
  onUpdateCertificates?: (c: Certificate[]) => void;
}

export default function PublicPortfolio({
  profile,
  projects,
  skills,
  certificates,
  timeline,
  onNavigateToLogin,
  onNavigateToAdmin,
  isLoggedIn,
  onUpdateTimeline,
  onUpdateCertificates,
}: PublicPortfolioProps) {

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Timeline CRUD state (inline editing if logged in)
  const [editingTimeline, setEditingTimeline] = useState<TimelineEvent | null>(null);
  const [isAddTimelineOpen, setIsAddTimelineOpen] = useState(false);
  const [newTimeline, setNewTimeline] = useState<Partial<TimelineEvent>>({
    company: '',
    role: '',
    location: '',
    date: '',
    description: '',
    isProjected: false
  });

  // Certificate CRUD state (inline editing if logged in)
  const [editingCertificate, setEditingCertificate] = useState<Certificate | null>(null);
  const [isAddCertificateOpen, setIsAddCertificateOpen] = useState(false);
  const [newCertificate, setNewCertificate] = useState<Partial<Certificate>>({
    title: '',
    issuer: '',
    description: '',
    iconName: 'award'
  });

  const handleCreateTimeline = (e: React.FormEvent) => {
    e.preventDefault();
    if (!onUpdateTimeline) return;
    const created: TimelineEvent = {
      id: `time-${Date.now()}`,
      company: newTimeline.company || 'New Company',
      role: newTimeline.role || 'New Role',
      location: newTimeline.location || 'New Location',
      date: newTimeline.date || 'Jan 2026 - Present',
      description: newTimeline.description || 'System description parameters.',
      isProjected: !!newTimeline.isProjected
    };
    onUpdateTimeline([created, ...timeline]);
    setIsAddTimelineOpen(false);
    setNewTimeline({
      company: '',
      role: '',
      location: '',
      date: '',
      description: '',
      isProjected: false
    });
  };

  const handleSaveTimelineEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!onUpdateTimeline || !editingTimeline) return;
    const updated = timeline.map(t => t.id === editingTimeline.id ? editingTimeline : t);
    onUpdateTimeline(updated);
    setEditingTimeline(null);
  };

  const handleDeleteTimeline = (id: string) => {
    if (!onUpdateTimeline) return;
    if (confirm('Are you sure you want to delete this trajectory entry?')) {
      onUpdateTimeline(timeline.filter(t => t.id !== id));
    }
  };

  const handleCreateCertificate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!onUpdateCertificates) return;
    const created: Certificate = {
      id: `cert-${Date.now()}`,
      title: newCertificate.title || 'New Certification',
      issuer: newCertificate.issuer || 'New Issuer',
      description: newCertificate.description || 'Certification description',
      iconName: newCertificate.iconName || 'award'
    };
    onUpdateCertificates([...certificates, created]);
    setIsAddCertificateOpen(false);
    setNewCertificate({
      title: '',
      issuer: '',
      description: '',
      iconName: 'award'
    });
  };

  const handleSaveCertificateEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!onUpdateCertificates || !editingCertificate) return;
    const updated = certificates.map(c => c.id === editingCertificate.id ? editingCertificate : c);
    onUpdateCertificates(updated);
    setEditingCertificate(null);
  };

  const handleDeleteCertificate = (id: string) => {
    if (!onUpdateCertificates) return;
    if (confirm('Are you sure you want to delete this certification?')) {
      onUpdateCertificates(certificates.filter(c => c.id !== id));
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background text-on-background relative overflow-x-hidden select-none">
      
      {/* Hairline grid overlay */}
      <div className="fixed inset-0 technical-grid opacity-30 pointer-events-none z-0"></div>
      
      {/* Sticky Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-outline-variant">
        <div className="max-w-[1200px] mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Cpu className="text-primary w-5 h-5 animate-pulse" />
            <span className="font-mono text-xs font-bold tracking-tighter text-on-background uppercase">
              {profile.name} // PORTFOLIO
            </span>
          </div>
          
          <div className="hidden md:flex gap-8 items-center">
            <button 
              onClick={() => scrollToSection('about')} 
              className="font-mono text-xs text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
            >
              ABOUT
            </button>
            <button 
              onClick={() => scrollToSection('projects')} 
              className="font-mono text-xs text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
            >
              PROJECTS
            </button>
            <button 
              onClick={() => scrollToSection('skills')} 
              className="font-mono text-xs text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
            >
              SKILLS
            </button>
            <button 
              onClick={() => scrollToSection('experience')} 
              className="font-mono text-xs text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
            >
              EXPERIENCE
            </button>
            <button 
              onClick={() => scrollToSection('certifications')} 
              className="font-mono text-xs text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
            >
              CERTIFICATIONS
            </button>
          </div>
          
          <div className="flex gap-4">
            {isLoggedIn ? (
              <button 
                onClick={onNavigateToAdmin}
                className="flex items-center gap-2 bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 px-4 py-2 rounded-lg font-mono text-xs transition-all active:scale-95"
              >
                <LayoutDashboard className="w-3 h-3" />
                CONSOLE
              </button>
            ) : (
              <button 
                onClick={onNavigateToLogin}
                className="font-mono text-xs text-on-surface-variant hover:text-primary transition-colors px-4 py-2 border border-transparent hover:border-outline-variant rounded"
              >
                ADMIN ACCESS
              </button>
            )}
            
            <button 
              onClick={() => scrollToSection('contact')} 
              className="bg-primary text-on-primary px-5 py-2 rounded-lg font-mono text-xs font-bold hover:scale-95 active:scale-90 transition-transform"
            >
              CONTACT
            </button>
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-[1200px] mx-auto px-6">
        
        {/* HERO / ABOUT SECTION */}
        <section id="about" className="pt-24 pb-28 min-h-[calc(100vh-80px)] flex items-center">
          {/* Centered Spacious Hero Content */}
          <div className="max-w-4xl mx-auto flex flex-col gap-10">
            <div className="space-y-4">
              <span className="font-mono text-xs text-primary tracking-widest uppercase flex items-center gap-2">
                <span className="w-8 h-px bg-primary"></span> 
                Available for Full-Time Opportunities
              </span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tighter text-on-background">
                Designing the <span className="text-primary">Architectures</span> of Tomorrow.
              </h1>
            </div>

            <div className="technical-border p-6 md:p-8 bg-surface-container-low/70 backdrop-blur-md border border-outline-variant/30 relative">
              <div className="scanline"></div>
              <span className="font-mono text-[10px] text-primary block mb-2">// SYSTEM_OBJECTIVE</span>
              <p className="font-sans text-base md:text-lg text-on-surface-variant leading-relaxed">
                {profile.objective}
              </p>
            </div>

            {/* Live Metrics Grid */}
            <div className="grid grid-cols-3 gap-6 border-t border-outline-variant/30 pt-8">
              <div className="flex flex-col">
                <span className="font-mono text-[10px] text-outline">LOCATION</span>
                <span className="font-sans text-sm font-bold text-on-surface flex items-center gap-1 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-primary" />
                  {profile.location}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-[10px] text-outline">CORE TOOLS</span>
                <span className="font-sans text-sm font-bold text-on-surface flex items-center gap-1 mt-1">
                  <Cpu className="w-3.5 h-3.5 text-primary" />
                  {profile.coreTools.split(',')[0]} & {profile.coreTools.split(',')[1] || 'PLC'}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-[10px] text-outline">STATUS</span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  <span className="font-sans text-sm font-bold text-on-surface">Stable v{profile.systemVersion.split(' ')[0]}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <button 
                onClick={() => scrollToSection('projects')}
                className="flex items-center gap-2 bg-primary text-on-primary px-6 py-4 rounded-lg font-mono text-xs font-bold hover:shadow-[0_0_20px_rgba(173,198,255,0.4)] transition-all cursor-pointer"
              >
                <Layers className="w-4 h-4" />
                VIEW PROJECTS
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="flex items-center gap-2 border border-outline text-on-surface px-6 py-4 rounded-lg font-mono text-xs font-bold hover:bg-surface-variant transition-all cursor-pointer"
              >
                HIRE MOHAN
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* ACTIVE PROJECTS SECTION */}
        <section id="projects" className="py-24 border-t border-outline-variant/30">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="font-mono text-xs text-primary block mb-2">// DETAILED_SCHEMATICS</span>
              <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-on-background">Active Projects</h2>
            </div>
            <span className="font-mono text-xs text-outline bg-surface-container px-3 py-1 rounded border border-outline-variant/30">
              COUNT: {projects.length.toString().padStart(2, '0')}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((proj, idx) => (
              <div 
                key={proj.id} 
                onClick={() => setSelectedProject(proj)}
                className="group cursor-pointer bg-surface-container/60 border border-outline-variant hover:border-primary transition-all rounded-lg overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="w-full aspect-video relative overflow-hidden bg-surface-container-lowest border-b border-outline-variant/30">
                    <img 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      src={proj.imageUrl} 
                      alt={proj.title}
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 right-3 p-1.5 font-mono text-[9px] text-primary flex items-center gap-1.5 bg-background/80 backdrop-blur-sm border border-primary/20 rounded">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                      {proj.status}
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <span className="font-mono text-[9px] text-primary uppercase block mb-1">
                      {proj.refCode || `SYS-SPEC-0${idx + 1}`}
                    </span>
                    <h3 className="font-display text-lg font-bold text-on-background mb-1 group-hover:text-primary transition-colors">
                      {proj.title}
                    </h3>
                    <p className="font-mono text-[10px] text-outline mb-3">{proj.date}</p>
                    <p className="font-sans text-xs text-on-surface-variant line-clamp-3 leading-relaxed">
                      {proj.subtitle}
                    </p>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-2 flex flex-wrap gap-1.5">
                  {proj.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="bg-surface-container-highest px-2 py-0.5 rounded font-mono text-[8px] text-on-surface border border-outline-variant/30">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TECHNICAL SKILL MATRIX */}
        <section id="skills" className="py-24 border-t border-outline-variant/30 bg-surface-container-low/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 bg-surface-container-low/50 border border-outline-variant p-8 relative overflow-hidden rounded-lg technical-grid">
              <div className="absolute top-0 right-0 w-24 h-24 border-r border-t border-primary/20 m-4 pointer-events-none"></div>
              
              <div className="relative z-10">
                <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-on-background mb-8 flex items-center gap-3">
                  <Terminal className="text-primary w-6 h-6" />
                  Skill Matrix
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <h5 className="font-mono text-xs text-primary mb-4 border-b border-primary/30 pb-2 flex items-center gap-2">
                      <Cpu className="w-3 h-3 text-primary" />
                      LANGUAGES
                    </h5>
                    <ul className="space-y-3">
                      {skills.languages.map((lang, index) => (
                        <li key={index} className="circuit-node font-mono text-xs ml-6 text-on-surface-variant">
                          {lang.toUpperCase().replace(/\s+/g, '_')}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-mono text-xs text-primary mb-4 border-b border-primary/30 pb-2 flex items-center gap-2">
                      <Wrench className="w-3 h-3 text-primary" />
                      TOOLS_AND_TECH
                    </h5>
                    <ul className="space-y-3">
                      {skills.toolsAndTech.map((tool, index) => (
                        <li key={index} className="circuit-node font-mono text-xs ml-6 text-on-surface-variant">
                          {tool.toUpperCase().replace(/\s+/g, '_')}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-primary text-on-primary p-8 rounded-lg flex flex-col justify-between shadow-xl relative overflow-hidden">
              <div className="absolute -right-12 -top-12 w-40 h-40 bg-white/5 rounded-full pointer-events-none"></div>
              <div>
                <h3 className="font-display text-xl font-bold uppercase tracking-tight mb-6 flex items-center gap-2">
                  <Network className="w-5 h-5" />
                  Soft Attributes
                </h3>
                <ul className="space-y-6">
                  {skills.softSkills.map((soft, index) => (
                    <li key={index} className="border-b border-on-primary/15 pb-4 last:border-0 last:pb-0">
                      <span className="font-mono text-[9px] block mb-1 opacity-75">ATTRIBUTE_0{index + 1}</span>
                      <span className="font-sans text-sm font-bold uppercase leading-snug">{soft}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-8 flex justify-end opacity-20">
                <Cpu className="w-14 h-14" />
              </div>
            </div>
          </div>
        </section>

        {/* EXPERIENCE TIMELINE & CERTIFICATIONS */}
        <section id="experience" className="py-24 border-t border-outline-variant/30 grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* Work Experience */}
          <div className="md:col-span-7 flex flex-col">
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-on-background border-l-4 border-primary pl-4">
                Professional Trajectory
              </h3>
              {isLoggedIn && onUpdateTimeline && (
                <button 
                  onClick={() => setIsAddTimelineOpen(true)}
                  className="flex items-center gap-1.5 bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 px-3 py-1.5 rounded text-xs font-mono font-bold transition-all cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  ADD_EXP
                </button>
              )}
            </div>
            
            <div className="space-y-10 relative before:absolute before:left-3 before:top-0 before:bottom-0 before:w-px before:bg-outline-variant/50">
              {timeline.map((item) => (
                <div key={item.id} className="relative pl-10 group/item">
                  {/* Indicator node */}
                  <div className={`absolute left-1.5 top-1.5 -translate-x-1/2 w-3.5 h-3.5 rounded-full z-10 border-4 border-background ${item.isProjected ? 'bg-outline-variant border-outline-variant/40' : 'bg-primary border-background shadow-[0_0_10px_rgba(173,198,255,0.5)]'}`}></div>
                  
                  <div className="flex flex-col mb-2">
                    <div className="flex justify-between items-start flex-wrap gap-2">
                      <span className={`font-mono text-[10px] w-fit px-2.5 py-0.5 rounded ${item.isProjected ? 'bg-outline-variant/20 text-outline' : 'bg-primary/10 text-primary'}`}>
                        {item.date}
                      </span>
                      {isLoggedIn && onUpdateTimeline && (
                        <div className="flex gap-2 opacity-0 group-hover/item:opacity-100 transition-opacity">
                          <button 
                            onClick={() => setEditingTimeline(item)}
                            className="p-1 hover:text-primary rounded text-outline border border-outline-variant/30 bg-surface-container cursor-pointer"
                            title="Edit Trajectory"
                          >
                            <Edit className="w-3 h-3" />
                          </button>
                          <button 
                            onClick={() => handleDeleteTimeline(item.id)}
                            className="p-1 hover:text-red-400 rounded text-outline border border-outline-variant/30 bg-surface-container cursor-pointer"
                            title="Delete Trajectory"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                    <h4 className="font-display text-lg font-bold text-on-background mt-2">
                      {item.company}
                    </h4>
                    <p className="font-sans text-xs text-outline">{item.role} | {item.location}</p>
                  </div>
                  
                  <div className="glass-card p-4 rounded-lg mt-3 border border-outline-variant/20 bg-surface-container-low/40">
                    <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications Sidebar */}
          <div id="certifications" className="md:col-span-5 flex flex-col">
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-on-background border-l-4 border-primary pl-4">
                Certifications
              </h3>
              {isLoggedIn && onUpdateCertificates && (
                <button 
                  onClick={() => setIsAddCertificateOpen(true)}
                  className="flex items-center gap-1.5 bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 px-3 py-1.5 rounded text-xs font-mono font-bold transition-all cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  ADD_CERT
                </button>
              )}
            </div>
            
            <div className="space-y-4">
              {certificates.map((cert) => (
                <div key={cert.id} className="p-4 border border-outline-variant/50 hover:border-primary bg-surface-container-high/40 rounded-lg transition-colors flex gap-4 group/cert">
                  <div className="w-10 h-10 bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 rounded text-primary">
                    {cert.iconName === 'minor_crash' ? <Layers className="w-5 h-5" /> : <Award className="w-5 h-5" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <h6 className="font-mono text-xs font-bold text-on-surface leading-tight truncate">{cert.title}</h6>
                      {isLoggedIn && onUpdateCertificates && (
                        <div className="flex gap-1.5 opacity-0 group-hover/cert:opacity-100 transition-opacity shrink-0">
                          <button 
                            onClick={() => setEditingCertificate(cert)}
                            className="p-1 hover:text-primary rounded text-outline border border-outline-variant/30 bg-surface-container text-[10px] cursor-pointer"
                            title="Edit Certification"
                          >
                            <Edit className="w-3 h-3" />
                          </button>
                          <button 
                            onClick={() => handleDeleteCertificate(cert.id)}
                            className="p-1 hover:text-red-400 rounded text-outline border border-outline-variant/30 bg-surface-container text-[10px] cursor-pointer"
                            title="Delete Certification"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                    <p className="font-sans text-[11px] text-outline mt-1">{cert.issuer}</p>
                    <p className="font-sans text-xs text-on-surface-variant mt-2 leading-relaxed">
                      {cert.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-24 border-t border-outline-variant/30">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-surface-container-low/40 border border-outline-variant p-8 md:p-12 rounded-xl">
            <div>
              <span className="font-mono text-xs text-primary block mb-2">// DIRECT_SIGNAL</span>
              <h3 className="font-display text-3xl font-bold uppercase tracking-tight text-on-background mb-6">Let's Connect</h3>
              <p className="font-sans text-sm text-on-surface-variant leading-relaxed mb-8 max-w-md">
                Interested in high-reliability electrical systems, STM32 microcontrollers, or embedded control design? Send me a message or connect through my official channels.
              </p>
              
              <div className="space-y-4 font-mono text-xs text-outline">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-primary" />
                  <a href={`mailto:${profile.email}`} className="hover:text-primary transition-colors">{profile.email}</a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-primary" />
                  <span>{profile.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>{profile.location}</span>
                </div>
              </div>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              alert('Message transmission simulation successful! In a real system, this would trigger an SMTP API.');
            }} className="space-y-4">
              <div>
                <label className="font-mono text-[10px] text-outline uppercase block mb-1">sender_name</label>
                <input 
                  type="text" 
                  required 
                  placeholder="ENTER NAME" 
                  className="w-full bg-background border border-outline-variant py-3 px-4 text-on-surface font-mono text-xs focus:outline-none focus:border-primary rounded"
                />
              </div>
              <div>
                <label className="font-mono text-[10px] text-outline uppercase block mb-1">sender_email</label>
                <input 
                  type="email" 
                  required 
                  placeholder="ENTER EMAIL" 
                  className="w-full bg-background border border-outline-variant py-3 px-4 text-on-surface font-mono text-xs focus:outline-none focus:border-primary rounded"
                />
              </div>
              <div>
                <label className="font-mono text-[10px] text-outline uppercase block mb-1">transmission_payload</label>
                <textarea 
                  rows={4} 
                  required 
                  placeholder="WRITE SYSTEM COMMANDS OR COMMENTS HERE" 
                  className="w-full bg-background border border-outline-variant py-3 px-4 text-on-surface font-mono text-xs focus:outline-none focus:border-primary rounded"
                ></textarea>
              </div>
              <button 
                type="submit"
                className="w-full bg-primary text-on-primary py-3 rounded-lg font-mono text-xs font-bold uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all cursor-pointer"
              >
                Transmit Message
              </button>
            </form>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-surface-container-lowest border-t border-outline-variant/60 py-12">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs font-bold text-primary tracking-widest uppercase">{profile.name} // EEE SYSTEM</span>
            <p className="font-mono text-[10px] text-outline">© 2026 {profile.name}. LICENSED UNDER MIT SPECIFICATION.</p>
          </div>
          
          <div className="flex gap-8 font-mono text-xs text-outline">
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors flex items-center gap-1">
              LinkedIn <ExternalLink className="w-3 h-3" />
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors flex items-center gap-1">
              GitHub <ExternalLink className="w-3 h-3" />
            </a>
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-primary transition-colors cursor-pointer">
              BACK_TO_TOP
            </button>
          </div>
        </div>
      </footer>

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-background/90 backdrop-blur-md z-[100] flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-surface-container border border-outline-variant max-w-2xl w-full rounded-xl overflow-hidden relative shadow-2xl my-8">
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-primary pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-primary pointer-events-none"></div>
            
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-10 bg-background/80 backdrop-blur-md p-2 rounded-full text-outline hover:text-primary border border-outline-variant hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-full aspect-video relative overflow-hidden bg-surface-container-lowest border-b border-outline-variant/30">
              <img 
                className="w-full h-full object-cover" 
                src={selectedProject.imageUrl} 
                alt={selectedProject.title}
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-4 left-4 p-2 font-mono text-xs text-primary flex items-center gap-2 bg-background/80 backdrop-blur-md border border-primary/20 rounded">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                {selectedProject.status}
              </div>
            </div>

            <div className="p-6 md:p-8 space-y-6">
              <div>
                <span className="font-mono text-xs text-primary uppercase block mb-1">
                  {selectedProject.refCode || 'SYS-SPEC-001'}
                </span>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-on-background mb-2">
                  {selectedProject.title}
                </h3>
                <p className="font-mono text-xs text-outline">{selectedProject.date}</p>
              </div>

              <div className="border-t border-b border-outline-variant/30 py-4">
                <p className="font-sans text-sm text-on-surface-variant font-medium leading-relaxed mb-4">
                  {selectedProject.subtitle}
                </p>
                <p className="font-sans text-sm text-on-surface-variant leading-relaxed whitespace-pre-line">
                  {selectedProject.description}
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-mono text-[10px] text-primary tracking-wider uppercase">// REGISTERED_SYSTEM_TAGS</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag) => (
                    <span key={tag} className="bg-surface-container-highest px-3 py-1 rounded font-mono text-xs text-on-surface border border-outline-variant/50">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Timeline Modal */}
      {isAddTimelineOpen && (
        <div className="fixed inset-0 bg-background/85 backdrop-blur-md z-[100] flex items-center justify-center p-6">
          <div className="bg-surface-container border border-outline-variant p-8 rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto relative shadow-2xl">
            <button 
              onClick={() => setIsAddTimelineOpen(false)}
              className="absolute top-4 right-4 text-outline hover:text-primary cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h4 className="font-display font-bold text-xl text-primary mb-6 flex items-center gap-2 uppercase tracking-wide">
              <Plus className="w-5 h-5" />
              ADD_PROFESSIONAL_RECORD
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
                  id="newIsProjected" 
                  checked={newTimeline.isProjected} 
                  onChange={(e) => setNewTimeline(prev => ({ ...prev, isProjected: e.target.checked }))}
                  className="w-4 h-4 accent-primary"
                />
                <label htmlFor="newIsProjected" className="font-mono text-[10px] text-outline cursor-pointer uppercase select-none">Mark as projected/future milestones</label>
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

      {/* Edit Timeline Modal */}
      {editingTimeline && (
        <div className="fixed inset-0 bg-background/85 backdrop-blur-md z-[100] flex items-center justify-center p-6">
          <div className="bg-surface-container border border-outline-variant p-8 rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto relative shadow-2xl">
            <button 
              onClick={() => setEditingTimeline(null)}
              className="absolute top-4 right-4 text-outline hover:text-primary cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h4 className="font-display font-bold text-xl text-primary mb-6 flex items-center gap-2 uppercase tracking-wide">
              <Edit className="w-5 h-5" />
              EDIT_PROFESSIONAL_RECORD
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
                Save Configurations
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Add Certificate Modal */}
      {isAddCertificateOpen && (
        <div className="fixed inset-0 bg-background/85 backdrop-blur-md z-[100] flex items-center justify-center p-6">
          <div className="bg-surface-container border border-outline-variant p-8 rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto relative shadow-2xl">
            <button 
              onClick={() => setIsAddCertificateOpen(false)}
              className="absolute top-4 right-4 text-outline hover:text-primary cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h4 className="font-display font-bold text-xl text-primary mb-6 flex items-center gap-2 uppercase tracking-wide">
              <Plus className="w-5 h-5" />
              ADD_CERTIFICATION
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
                  placeholder="e.g. SIEMENS SIMATIC SCADA"
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

      {/* Edit Certificate Modal */}
      {editingCertificate && (
        <div className="fixed inset-0 bg-background/85 backdrop-blur-md z-[100] flex items-center justify-center p-6">
          <div className="bg-surface-container border border-outline-variant p-8 rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto relative shadow-2xl">
            <button 
              onClick={() => setEditingCertificate(null)}
              className="absolute top-4 right-4 text-outline hover:text-primary cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h4 className="font-display font-bold text-xl text-primary mb-6 flex items-center gap-2 uppercase tracking-wide">
              <Edit className="w-5 h-5" />
              EDIT_CERTIFICATION
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
                Save Credentials
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
