/**
 * AdminLogin UI stub
 * Firebase Auth will be wired in Phase 2.
 * Displays a fully styled login form on the dark admin canvas.
 */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Lock, Mail, Eye, EyeOff, Shield } from 'lucide-react';
import Button from '../../components/ui/Button';

export default function AdminLogin() {
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [showPw,   setShowPw]   = useState(false);
  const [error,    setError]    = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    // Firebase signInWithEmailAndPassword() will go here in Phase 2
    setError('Authentication is not yet configured. This is a UI stub.');
  }

  return (
    <div className="page-wash min-h-[100dvh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">

        {/* Brand */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3">
            <img src="/psits.jpg" alt="PSITS logo" className="h-12 w-12 rounded-full object-cover" />
            <div className="text-left">
              <p className="font-display text-xl font-extrabold text-text-primary">PSITS-CTU Main</p>
              <p className="text-xs font-semibold tracking-[0.1em] text-primary">Officer portal</p>
            </div>
          </Link>
        </div>

        {/* Card */}
        <div className="rounded-[1.5rem] bg-white p-8">
          <div className="flex items-center gap-2 mb-6">
            <Shield size={20} className="text-primary" />
            <h1 className="text-3xl">Officer sign in</h1>
          </div>

          {/* Error banner */}
          {error && (
            <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Email */}
            <div className="flex flex-col gap-2">
              <label htmlFor="admin-email" className="text-sm font-semibold text-text-primary">
                Email
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  id="admin-email" type="email" required
                  autoComplete="username"
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="officer@ctu.edu.ph"
                  className="min-h-12 w-full rounded-xl border border-primary-neutral bg-white py-3 pl-10 pr-4 text-sm text-text-primary placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <label htmlFor="admin-password" className="text-sm font-semibold text-text-primary">
                Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  id="admin-password"
                  type={showPw ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password} onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="min-h-12 w-full rounded-xl border border-primary-neutral bg-white py-3 pl-10 pr-10 text-sm text-text-primary placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 grid h-9 w-9 place-items-center text-text-muted hover:text-primary"
                  onClick={() => setShowPw((v) => !v)}
                  aria-label={showPw ? 'Hide password' : 'Show password'}
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <Button type="submit" variant="primary" size="lg" className="w-full mt-1">
              Sign In
            </Button>
          </form>

          <div className="mt-6 pt-5 border-t border-border-light text-center">
            <Link to="/" className="text-sm text-text-muted hover:text-primary transition-colors">
              ← Back to website
            </Link>
          </div>
        </div>

        <p className="text-center text-xs text-text-muted mt-6">
          Officer accounts are managed by the PSITS Technical Director.
        </p>
      </div>
    </div>
  );
}
