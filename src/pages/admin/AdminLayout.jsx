import { NavLink, Outlet, Link } from 'react-router-dom';
import { LayoutDashboard, CalendarDays, Megaphone, Users, ChevronLeft } from 'lucide-react';

const NAV_ITEMS = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/events', label: 'Events', icon: CalendarDays },
  { to: '/admin/announcements', label: 'Announcements', icon: Megaphone },
  { to: '/admin/members', label: 'Members', icon: Users },
];

function AdminLink({ to, label, icon: Icon, end, compact = false }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) => [
        'flex min-h-11 items-center gap-3 rounded-[1.5rem] px-4 text-sm font-semibold transition-colors',
        compact ? 'whitespace-nowrap' : '',
        isActive ? 'bg-primary text-white' : 'text-text-muted hover:bg-bg-light hover:text-primary',
      ].join(' ')}
    >
      <Icon size={18} aria-hidden="true" /> {label}
    </NavLink>
  );
}

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-bg-light lg:grid lg:grid-cols-[17rem_1fr]">
      <aside className="hidden min-h-screen flex-col border-r border-primary-neutral/60 bg-white lg:flex">
        <div className="border-b border-primary-neutral/60 px-5 py-5">
          <Link to="/" className="flex items-center gap-3">
            <img src="/psits-logo.svg" alt="" className="h-10 w-10" />
            <div>
              <p className="font-display font-extrabold text-text-primary">PSITS Admin</p>
              <p className="text-xs font-semibold text-primary">Officer portal</p>
            </div>
          </Link>
        </div>
        <nav className="flex-1 px-3 py-5" aria-label="Admin navigation">
          <ul className="space-y-1" role="list">
            {NAV_ITEMS.map((item) => <li key={item.to}><AdminLink {...item} /></li>)}
          </ul>
        </nav>
        <div className="border-t border-primary-neutral/60 p-3">
          <Link to="/" className="flex min-h-11 items-center gap-3 rounded-[1.5rem] px-4 text-sm font-semibold text-text-muted hover:bg-bg-light hover:text-primary">
            <ChevronLeft size={18} /> Back to site
          </Link>
        </div>
      </aside>

      <div className="min-w-0">
        <header className="border-b border-primary-neutral/60 bg-white px-4 py-3 lg:hidden">
          <div className="flex items-center justify-between gap-4">
            <Link to="/" className="flex items-center gap-2 font-display font-extrabold text-text-primary">
              <img src="/psits-logo.svg" alt="" className="h-9 w-9" /> PSITS Admin
            </Link>
            <Link to="/" className="text-sm font-semibold text-primary">Back to site</Link>
          </div>
          <nav className="mt-3 overflow-x-auto pb-1" aria-label="Admin navigation">
            <ul className="flex gap-2" role="list">
              {NAV_ITEMS.map((item) => <li key={item.to}><AdminLink {...item} compact /></li>)}
            </ul>
          </nav>
        </header>
        <main className="min-w-0 overflow-x-hidden"><Outlet /></main>
      </div>
    </div>
  );
}
