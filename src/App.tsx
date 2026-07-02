import { useState, useEffect } from 'react';
import { Project, SkillGroup, Certificate, TimelineEvent, ProfileInfo } from './types';
import { 
  initialProjects, 
  initialSkills, 
  initialCertificates, 
  initialTimeline, 
  initialProfileInfo, 
  initialSystemLogs 
} from './data';
import PublicPortfolio from './components/PublicPortfolio';
import SecureAccess from './components/SecureAccess';
import AdminConsole from './components/AdminConsole';
import ShaderBackground from './components/ShaderBackground';

export default function App() {
  const [currentView, setCurrentView] = useState<'portfolio' | 'login' | 'admin'>('portfolio');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Load and persist state in local storage
  const [profile, setProfile] = useState<ProfileInfo>(() => {
    const saved = localStorage.getItem('eee_profile');
    return saved ? JSON.parse(saved) : initialProfileInfo;
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('eee_projects');
    return saved ? JSON.parse(saved) : initialProjects;
  });

  const [skills, setSkills] = useState<SkillGroup>(() => {
    const saved = localStorage.getItem('eee_skills');
    return saved ? JSON.parse(saved) : initialSkills;
  });

  const [certificates, setCertificates] = useState<Certificate[]>(() => {
    const saved = localStorage.getItem('eee_certificates');
    return saved ? JSON.parse(saved) : initialCertificates;
  });

  const [timeline, setTimeline] = useState<TimelineEvent[]>(() => {
    const saved = localStorage.getItem('eee_timeline');
    return saved ? JSON.parse(saved) : initialTimeline;
  });

  // Log in status persistent check
  useEffect(() => {
    const logged = localStorage.getItem('eee_logged_in');
    if (logged === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  // Save changes helper functions
  const handleUpdateProfile = (updated: ProfileInfo) => {
    setProfile(updated);
    localStorage.setItem('eee_profile', JSON.stringify(updated));
  };

  const handleUpdateProjects = (updated: Project[]) => {
    setProjects(updated);
    localStorage.setItem('eee_projects', JSON.stringify(updated));
  };

  const handleUpdateSkills = (updated: SkillGroup) => {
    setSkills(updated);
    localStorage.setItem('eee_skills', JSON.stringify(updated));
  };

  const handleUpdateCertificates = (updated: Certificate[]) => {
    setCertificates(updated);
    localStorage.setItem('eee_certificates', JSON.stringify(updated));
  };

  const handleUpdateTimeline = (updated: TimelineEvent[]) => {
    setTimeline(updated);
    localStorage.setItem('eee_timeline', JSON.stringify(updated));
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    localStorage.setItem('eee_logged_in', 'true');
    setCurrentView('admin');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('eee_logged_in');
    setCurrentView('portfolio');
  };

  return (
    <div className="relative w-full min-h-screen bg-background text-on-background">
      
      {/* Dynamic Background */}
      {currentView === 'login' && (
        <div className="absolute inset-0 z-0">
          <ShaderBackground />
        </div>
      )}

      {/* Routed Screen Render */}
      <div className="relative z-10">
        {currentView === 'portfolio' && (
          <PublicPortfolio
            profile={profile}
            projects={projects}
            skills={skills}
            certificates={certificates}
            timeline={timeline}
            onNavigateToLogin={() => setCurrentView('login')}
            onNavigateToAdmin={() => setCurrentView('admin')}
            isLoggedIn={isLoggedIn}
          />
        )}

        {currentView === 'login' && (
          <SecureAccess
            onLoginSuccess={handleLoginSuccess}
            onBackToPortfolio={() => setCurrentView('portfolio')}
            systemVersion={profile.systemVersion}
          />
        )}

        {currentView === 'admin' && (
          <AdminConsole
            profile={profile}
            projects={projects}
            skills={skills}
            certificates={certificates}
            timeline={timeline}
            systemLogs={initialSystemLogs}
            onUpdateProfile={handleUpdateProfile}
            onUpdateProjects={handleUpdateProjects}
            onUpdateSkills={handleUpdateSkills}
            onUpdateCertificates={handleUpdateCertificates}
            onUpdateTimeline={handleUpdateTimeline}
            onLogout={handleLogout}
          />
        )}
      </div>
    </div>
  );
}
