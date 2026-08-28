import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/events', label: 'Events' },
  { to: '/announcements', label: 'Announcements' },
  { to: '/resources', label: 'Resources' },
  { to: '/contact', label: 'Contact' },
];

function navLinkClass({ isActive }) {
  return [
    'flex min-h-11 items-center rounded-full px-3.5 text-sm font-semibold transition-colors',
    isActive
      ? 'bg-bg-light text-primary'
      : 'text-text-muted hover:bg-bg-light hover:text-text-primary',
  ].join(' ');
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl">
      <div className="content-shell">
        <nav className="flex h-20 items-center justify-between" aria-label="Main navigation">
          <Link to="/" className="group flex items-center gap-3" aria-label="PSITS-CTU Main home">
            <img src="/psits.jpg" alt="" className="h-10 w-10 rounded-full object-cover" />
            <div className="leading-tight">
              <span className="block font-display text-lg font-extrabold tracking-[-0.04em] text-text-primary group-hover:text-primary">PSITS-CTU</span>
              <span className="block text-[0.65rem] font-semibold tracking-[0.12em] text-primary">Main Campus</span>
            </div>
          </Link>

          <ul className="hidden items-center gap-0.5 lg:flex" role="list">
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <NavLink to={to} end={to === '/'} className={navLinkClass}>
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Link
              to="/membership"
              className="interactive-lift hidden min-h-11 items-center gap-2 rounded-[1.5rem] bg-primary px-5 text-sm font-semibold text-white hover:bg-primary-hover sm:inline-flex"
            >
              Join PSITS <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-primary-neutral text-text-primary transition-colors hover:border-primary hover:bg-bg-light lg:hidden"
              onClick={() => setMobileOpen((open) => !open)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              {mobileOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
            </button>
          </div>
        </nav>
      </div>

      {mobileOpen && (
        <div id="mobile-menu" className="border-t border-primary-neutral/60 bg-white lg:hidden">
          <div className="content-shell py-4">
            <ul className="grid gap-1 sm:grid-cols-2" role="list">
              {navLinks.map(({ to, label }) => (
                <li key={to}>
                  <NavLink to={to} end={to === '/'} className={navLinkClass}>
                    {label}
                  </NavLink>
                </li>
              ))}
              <li className="mt-2 sm:hidden">
                <Link to="/membership" className="flex min-h-11 items-center justify-center rounded-[1.5rem] bg-primary px-4 text-sm font-semibold text-white">
                  Join PSITS
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}
