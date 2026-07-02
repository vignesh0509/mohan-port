import React, { useState } from 'react';
import { Lock, Mail, Key, Eye, EyeOff, ShieldAlert, RefreshCw, ArrowRight, CheckCircle2 } from 'lucide-react';

interface SecureAccessProps {
  onLoginSuccess: () => void;
  onBackToPortfolio: () => void;
  systemVersion: string;
}

export default function SecureAccess({ onLoginSuccess, onBackToPortfolio, systemVersion }: SecureAccessProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [accessGranted, setAccessGranted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setIsAuthenticating(true);

    // High-tech artificial delay for security feeling
    setTimeout(() => {
      setIsAuthenticating(false);
      setAccessGranted(true);

      setTimeout(() => {
        onLoginSuccess();
      }, 1000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background text-on-background relative flex items-center justify-center p-6 select-none overflow-hidden">
      {/* Background Technical Atmosphere Grid */}
      <div className="absolute inset-0 technical-grid pointer-events-none opacity-40"></div>

      {/* Main Content Form Card */}
      <div className="w-full max-w-[440px] relative z-10">
        
        {/* L-Shaped Corner Ornaments */}
        <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-primary opacity-60"></div>
        <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-primary opacity-60"></div>

        <div className="glass-effect border border-outline-variant/50 p-8 md:p-10 shadow-2xl relative overflow-hidden rounded-lg">
          
          {/* Header Area */}
          <div className="mb-10 text-center flex flex-col items-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-surface-container-highest border border-outline-variant/50 mb-6 relative rounded">
              <Lock className="text-primary w-8 h-8" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary"></div>
            </div>
            
            <h1 className="font-display text-2xl font-bold uppercase tracking-[0.15em] text-on-surface mb-2">
              SECURE ACCESS
            </h1>
            <p className="font-mono text-xs text-outline tracking-wider uppercase">
              EEE PORTFOLIO ADMIN CONSOLE
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="font-mono text-[10px] text-on-surface-variant block uppercase tracking-tighter" htmlFor="email">
                SYSTEM_ID / EMAIL
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-outline">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="MK1594722@GMAIL.COM"
                  className="w-full bg-surface-container-low border border-outline-variant py-3 pl-10 pr-4 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all font-mono text-xs placeholder:text-outline-variant rounded"
                />
              </div>
            </div>

            {/* Encryption Key Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="font-mono text-[10px] text-on-surface-variant block uppercase tracking-tighter" htmlFor="password">
                  ENCRYPTION_KEY
                </label>
                <button
                  type="button"
                  onClick={() => alert('Access restored. Default development key: developer_access')}
                  className="font-mono text-[10px] text-primary hover:underline uppercase tracking-tighter opacity-80 hover:opacity-100 cursor-pointer"
                >
                  Reset
                </button>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-outline">
                  <Key className="w-4 h-4" />
                </span>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-surface-container-low border border-outline-variant py-3 pl-10 pr-12 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all font-mono text-xs placeholder:text-outline-variant rounded"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Persistent Connection Checkbox */}
            <div className="flex items-center gap-3 py-1">
              <input
                id="remember"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded bg-surface-container-low border-outline-variant text-primary focus:ring-primary focus:ring-offset-background cursor-pointer"
              />
              <label
                htmlFor="remember"
                className="font-mono text-[10px] text-outline uppercase tracking-tighter cursor-pointer select-none"
              >
                Maintain Session Persistence
              </label>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                type="submit"
                disabled={isAuthenticating || accessGranted}
                className={`w-full py-4 font-mono text-xs uppercase font-bold tracking-[0.2em] flex items-center justify-center gap-3 group active:scale-95 transition-all rounded cursor-pointer ${
                  accessGranted
                    ? 'bg-green-600 text-white'
                    : isAuthenticating
                    ? 'bg-secondary-container text-on-secondary-container'
                    : 'bg-primary text-on-primary hover:shadow-[0_0_15px_rgba(173,198,255,0.3)]'
                }`}
              >
                {accessGranted ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 animate-bounce" />
                    <span>ACCESS GRANTED</span>
                  </>
                ) : isAuthenticating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>AUTHENTICATING...</span>
                  </>
                ) : (
                  <>
                    <span>INITIATE LOGIN</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={onBackToPortfolio}
                className="w-full py-2.5 font-mono text-[10px] uppercase text-outline hover:text-primary text-center transition-colors hover:underline cursor-pointer"
              >
                CANCEL & RETURN TO PUBLIC SITE
              </button>
            </div>
          </form>

          {/* Status Footing */}
          <div className="mt-8 pt-6 border-t border-outline-variant/30 flex justify-between items-center text-[9px] font-mono text-outline">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
              <span>SYSTEM STATUS: READY</span>
            </div>
            <span>VER: {systemVersion}</span>
          </div>
        </div>

        {/* Footnote */}
        <p className="mt-6 text-center font-mono text-[10px] text-outline-variant/80 tracking-tighter uppercase">
          AUTHORIZED PERSONNEL ONLY. ALL ACTIONS ARE LOGGED TO SYSTEM TERMINAL.
        </p>
      </div>

      {/* Decorative Technical Blueprints */}
      <div className="hidden lg:block absolute top-10 right-10 w-48 h-48 border border-outline-variant/20 pointer-events-none rounded">
        <div className="absolute inset-2 border-t border-l border-outline-variant/20"></div>
        <div className="absolute bottom-2 right-2 font-mono text-[9px] text-outline/40 uppercase">FIG_01: AUTH_GATEWAY</div>
      </div>
      <div className="hidden lg:block absolute bottom-10 left-10 w-64 h-32 border border-outline-variant/20 pointer-events-none rounded">
        <div className="absolute inset-x-0 top-1/2 h-px bg-outline-variant/20"></div>
        <div className="absolute top-2 left-2 font-mono text-[9px] text-outline/40 uppercase">X-AXIS_CALIBRATION</div>
      </div>
    </div>
  );
}
