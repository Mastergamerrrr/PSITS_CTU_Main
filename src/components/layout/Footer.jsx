import { Link } from 'react-router-dom';
import { ArrowUpRight, Facebook, Github, Mail } from 'lucide-react';

const links = [
  { label: 'About', to: '/about' },
  { label: 'Events', to: '/events' },
  { label: 'Announcements', to: '/announcements' },
  { label: 'Resources', to: '/resources' },
  { label: 'Contact', to: '/contact' },
  { label: 'Officer portal', to: '/admin/login' },
];

const socials = [
  { label: 'Facebook', href: 'https://facebook.com/psitsctu', icon: Facebook },
  { label: 'GitHub', href: 'https://github.com/psits-ctu-main', icon: Github },
  { label: 'Email', href: 'mailto:psits.ctu.main@gmail.com', icon: Mail },
];

export default function Footer() {
  return (
    <footer className="relative bg-bg-dark text-white">
      <div className="content-shell py-12 sm:py-14">
        <div className="grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-20">
          <div>
            <Link to="/" className="inline-flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-[1.25rem] bg-white">
                <img src="/psits.jpg" alt="" className="h-10 w-10 rounded-full object-cover" />
              </span>
              <div>
                <p className="font-display text-lg font-extrabold tracking-tight">PSITS-CTU Main</p>
                <p className="text-xs font-semibold tracking-wide text-blue-200">CCICT student community</p>
              </div>
            </Link>
            <p className="mt-6 max-w-lg text-sm leading-7 text-blue-100">
              Building technical skill, responsible leadership, and stronger connections for computing students at Cebu Technological University Main Campus.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <h2 className="text-sm font-bold text-white">Explore</h2>
              <ul className="mt-4 grid grid-cols-2 gap-x-5 gap-y-3" role="list">
                {links.map(({ label, to }) => (
                  <li key={to}><Link to={to} className="text-sm text-blue-100 hover:text-white">{label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">Connect</h2>
              <div className="mt-4 flex gap-2">
                {socials.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('mailto:') ? undefined : '_blank'}
                    rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                    aria-label={label}
                    className="grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/10 text-blue-100 hover:bg-white hover:text-bg-dark"
                  >
                    <Icon size={18} aria-hidden="true" />
                  </a>
                ))}
              </div>
              <a href="mailto:psits.ctu.main@gmail.com" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-white hover:text-blue-100">
                Email the team <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/15 pt-6 text-xs text-blue-200 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} PSITS-CTU Main. All rights reserved.</p>
          <div className="flex gap-5">
            <Link to="/contact" className="hover:text-white">Privacy</Link>
            <Link to="/contact" className="hover:text-white">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
