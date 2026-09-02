import { useEffect, useRef, useState } from 'react';
import {
  ArrowUpRight, BookOpen, CalendarDays, Megaphone, Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const opportunities = [
  {
    to: '/membership',
    number: '01',
    kicker: 'Belong',
    title: 'Join the chapter',
    description: 'Meet collaborators, mentors, and friends from across the CCICT community.',
    action: 'Become a member',
    icon: Users,
    cardClass: 'bg-primary text-white',
    mutedClass: 'text-blue-100',
    iconClass: 'text-white/20',
  },
  {
    to: '/events',
    number: '02',
    kicker: 'Participate',
    title: 'Learn by showing up',
    description: 'Take part in workshops, hackathons, competitions, and campus tech conversations.',
    action: 'Explore events',
    icon: CalendarDays,
    cardClass: 'bg-bg-dark text-white',
    mutedClass: 'text-blue-100',
    iconClass: 'text-primary-neutral/20',
  },
  {
    to: '/resources',
    number: '03',
    kicker: 'Build',
    title: 'Turn ideas into projects',
    description: 'Use workshop materials and community repositories to keep learning beyond an event.',
    action: 'Browse resources',
    icon: BookOpen,
    cardClass: 'border border-primary-neutral bg-white text-text-primary',
    mutedClass: 'text-text-body',
    iconClass: 'text-primary/10',
  },
  {
    to: '/announcements',
    number: '04',
    kicker: 'Stay connected',
    title: 'Know what happens next',
    description: 'Follow registration windows, organization news, results, and opportunities as they land.',
    action: 'Read announcements',
    icon: Megaphone,
    cardClass: 'bg-primary-neutral text-text-primary',
    mutedClass: 'text-text-body',
    iconClass: 'text-bg-dark/10',
  },
];

function OpportunityCard({ opportunity }) {
  const Icon = opportunity.icon;

  return (
    <Link
      to={opportunity.to}
      className={[
        'group relative flex min-h-[21rem] w-full flex-col overflow-hidden rounded-[1.5rem] p-6 transition-transform duration-300 hover:-translate-y-1 sm:min-h-[23rem] sm:p-8',
        opportunity.cardClass,
      ].join(' ')}
    >
      <div className="pointer-events-none absolute -right-12 top-1/2 -translate-y-1/2" aria-hidden="true">
        <span className="absolute inset-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full border border-current opacity-20 transition-transform duration-700 group-hover:scale-110" />
        <span className="absolute inset-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-current opacity-10 transition-transform duration-700 group-hover:scale-95" />
        <Icon className={['h-56 w-56 transition-transform duration-700 group-hover:rotate-[-4deg] group-hover:scale-105', opportunity.iconClass].join(' ')} strokeWidth={0.7} />
      </div>

      <div className="relative z-[1] flex items-center justify-between text-xs font-semibold tracking-[0.12em] uppercase">
        <span>{opportunity.kicker}</span>
        <span className="font-mono opacity-70">{opportunity.number}</span>
      </div>

      <div className="relative z-[1] mt-auto max-w-md">
        <h3 className="max-w-sm text-3xl text-current sm:text-4xl">{opportunity.title}</h3>
        <p className={['mt-4 max-w-sm leading-7', opportunity.mutedClass].join(' ')}>{opportunity.description}</p>
        <span className="mt-6 inline-flex min-h-11 items-center gap-2 font-semibold">
          {opportunity.action}
          <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}

export default function GetInvolved() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const progressRef = useRef(null);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const desktopQuery = window.matchMedia('(min-width: 1024px)');
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMode = () => setPinned(desktopQuery.matches && !reducedMotionQuery.matches);

    updateMode();
    desktopQuery.addEventListener('change', updateMode);
    reducedMotionQuery.addEventListener('change', updateMode);
    return () => {
      desktopQuery.removeEventListener('change', updateMode);
      reducedMotionQuery.removeEventListener('change', updateMode);
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const progress = progressRef.current;
    if (!section || !track || !progress) return undefined;

    if (!pinned) {
      section.style.removeProperty('height');
      track.style.removeProperty('transform');
      progress.style.removeProperty('transform');
      return undefined;
    }

    let travel = 0;
    let frame = 0;

    const updatePosition = () => {
      frame = 0;
      const topBelowNavbar = 80 - section.getBoundingClientRect().top;
      const offset = Math.min(Math.max(topBelowNavbar, 0), travel);
      const ratio = travel > 0 ? offset / travel : 0;

      track.style.transform = `translate3d(0, -${offset}px, 0)`;
      progress.style.transform = `scaleY(${ratio})`;
    };

    const requestPositionUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updatePosition);
    };

    const measure = () => {
      const availableTrackHeight = Math.max(window.innerHeight - 80 - 128, 400);
      travel = Math.max(track.scrollHeight - availableTrackHeight, 0);
      section.style.height = `calc(100svh - 5rem + ${travel}px)`;
      requestPositionUpdate();
    };

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(track);
    window.addEventListener('resize', measure);
    window.addEventListener('scroll', requestPositionUpdate, { passive: true });
    measure();

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', measure);
      window.removeEventListener('scroll', requestPositionUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [pinned]);

  return (
    <section id="get-involved" ref={sectionRef} className="relative bg-bg-light" aria-labelledby="get-involved-title">
      <div className={pinned ? 'sticky top-20 h-[calc(100svh-5rem)] overflow-hidden' : 'py-20 sm:py-24'}>
        <div className={['content-shell grid gap-12 lg:grid-cols-[1.28fr_0.72fr] lg:gap-16', pinned ? 'h-full py-16' : ''].join(' ')}>
          <div className="flex flex-col justify-center lg:order-2 lg:pl-4">
            <p className="section-kicker">Get involved</p>
            <h2 id="get-involved-title" className="mt-4 max-w-md text-4xl sm:text-5xl lg:text-6xl">
              There’s more than one way in.
            </h2>
            <p className="mt-5 max-w-md leading-7 text-text-body">
              Start where you are. Join, learn, build, or simply stay in the loop. Each path leads back to the same student community.
            </p>

            <div className="mt-8 flex items-center gap-4">
              <div className="flex -space-x-2" aria-hidden="true">
                {['AR', 'BS', 'CM', 'DG'].map((initials, index) => (
                  <span key={initials} className={[
                    'grid h-10 w-10 place-items-center rounded-full border-2 border-bg-light text-[0.65rem] font-bold',
                    index === 0 ? 'bg-primary text-white' : 'bg-white text-primary',
                  ].join(' ')}>{initials}</span>
                ))}
              </div>
              <p className="text-sm text-text-muted"><strong className="text-text-primary">320+</strong> active members</p>
            </div>

            {pinned && (
              <div className="mt-10 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.12em] text-text-muted" aria-hidden="true">
                <span className="relative h-16 w-px overflow-hidden bg-primary-neutral">
                  <span ref={progressRef} className="absolute inset-0 origin-top bg-primary" />
                </span>
                Four ways to participate
              </div>
            )}
          </div>

          <div className={['lg:order-1', pinned ? 'min-h-0 overflow-visible' : ''].join(' ')}>
            <div ref={trackRef} className="grid gap-5 will-change-transform sm:gap-6">
              {opportunities.map((opportunity) => (
                <OpportunityCard key={opportunity.to} opportunity={opportunity} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
