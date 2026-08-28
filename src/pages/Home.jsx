import { Link } from 'react-router-dom';
import {
  ArrowRight, CalendarDays, ChevronRight, MapPin, Megaphone,
} from 'lucide-react';
import { announcements, events, orgStats } from '../data/mockData';
import Badge from '../components/ui/Badge';
import HeroNetwork from '../components/home/HeroNetwork';
import GetInvolved from '../components/home/GetInvolved';

function formatDate(dateStr) {
  if (!dateStr) return '';
  return new Date(`${dateStr}T00:00:00`).toLocaleDateString('en-PH', {
    month: 'short', day: 'numeric', year: 'numeric',
  });
}

function EventFeature({ event, featured = false }) {
  return (
    <article className={[
      'group relative flex flex-col overflow-hidden rounded-[1.5rem] p-6 transition-transform duration-300 hover:-translate-y-0.5 sm:p-7',
      featured ? 'bg-bg-dark text-white lg:row-span-2' : 'bg-white text-text-primary',
    ].join(' ')}>
      <div className="flex flex-wrap items-center gap-2">
        <Badge category={event.category} />
        {event.registrationOpen && (
          <span className={[
            'rounded-full px-3 py-1 text-xs font-semibold',
            featured ? 'bg-white/15 text-white' : 'bg-bg-light text-primary',
          ].join(' ')}>Registration open</span>
        )}
      </div>
      <h3 className={[
        'mt-8 font-display font-extrabold tracking-[-0.04em]',
        featured ? 'max-w-md text-3xl text-white sm:text-4xl' : 'text-2xl text-text-primary',
      ].join(' ')}>{event.title}</h3>
      {featured && <p className="mt-5 max-w-lg text-sm leading-7 text-blue-100">{event.description}</p>}
      <dl className={[
        'mt-auto grid gap-3 pt-8 text-sm sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2',
        featured ? 'text-blue-100' : 'text-text-muted',
      ].join(' ')}>
        <div className="flex items-center gap-2">
          <CalendarDays size={17} aria-hidden="true" />
          <dt className="sr-only">Date</dt><dd>{formatDate(event.date)}</dd>
        </div>
        <div className="flex items-center gap-2">
          <MapPin size={17} aria-hidden="true" />
          <dt className="sr-only">Venue</dt><dd>{event.venue}</dd>
        </div>
      </dl>
      <Link to={`/events/${event.id}`} className={[
        'mt-7 inline-flex min-h-11 w-fit items-center gap-2 font-semibold',
        featured ? 'text-white hover:text-blue-100' : 'text-primary hover:text-primary-hover',
      ].join(' ')}>
        View event <ChevronRight size={17} className="transition-transform group-hover:translate-x-1" />
      </Link>
    </article>
  );
}

export default function Home() {
  const upcomingEvents = events.filter((event) => event.status === 'upcoming').slice(0, 3);
  const pinnedAnnouncement = announcements.find((announcement) => announcement.pinned);

  return (
    <div className="bg-white">
      <section className="page-wash hero-home relative overflow-hidden">
        <HeroNetwork />
        <div className="content-shell relative z-[2] flex min-h-[calc(100dvh-5rem)] items-center py-12 sm:py-16 lg:py-20">
          <div className="hero-copy min-w-0 max-w-4xl">
            <p className="section-kicker mb-4 md:mb-6">CCICT student community</p>
            <h1 className="display-title text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
              Learn together.<br /><span className="hero-title-accent">Build what matters.</span>
            </h1>
            <p className="hero-description mt-6 max-w-xl text-base leading-7 sm:text-lg md:mt-8 md:leading-8">
              PSITS connects CTU Main computing students through technical learning, competition, and community.
            </p>
            <div className="mt-7 flex flex-row flex-wrap gap-3 md:mt-9">
              <Link to="/membership" className="interactive-lift inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-[1.5rem] bg-primary px-5 text-sm font-semibold text-white hover:bg-primary-hover sm:px-7 sm:text-base">
                Join PSITS <ArrowRight size={18} />
              </Link>
              <Link to="/events" className="inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-[1.5rem] border border-primary-neutral bg-white px-5 text-sm font-semibold text-primary hover:border-primary sm:px-7 sm:text-base">
                Explore events
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Organization impact" className="bg-white">
        <div className="content-shell">
          <dl className="grid grid-cols-2 border-b border-primary-neutral/60 lg:grid-cols-4">
            {orgStats.map(({ label, value }, index) => (
              <div key={label} className={[
                'py-8 sm:py-10',
                index % 2 === 0 ? 'pr-5' : 'border-l border-primary-neutral/60 pl-5',
                index > 1 ? 'border-t border-primary-neutral/60 lg:border-t-0' : '',
                index > 0 ? 'lg:border-l lg:pl-8' : '',
              ].join(' ')}>
                <dd className="font-mono text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">{value}</dd>
                <dt className="mt-2 text-sm text-text-muted">{label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-bg-light py-20 sm:py-24">
        <div className="content-shell">
          <div className="max-w-3xl">
            <p className="section-kicker">Upcoming at PSITS</p>
            <h2 className="mt-4 text-4xl sm:text-5xl">Show up curious. Leave with something new.</h2>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-[1.35fr_0.85fr] lg:grid-rows-2">
            {upcomingEvents.map((event, index) => <EventFeature key={event.id} event={event} featured={index === 0} />)}
          </div>
          <Link to="/events" className="mt-8 inline-flex min-h-11 items-center gap-2 font-semibold text-primary hover:text-primary-hover">
            Explore events <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      <GetInvolved />

      {pinnedAnnouncement && (
        <section className="bg-bg-light py-16 sm:py-20">
          <div className="content-shell">
            <article className="grid overflow-hidden rounded-[1.5rem] bg-white lg:grid-cols-[0.24fr_1fr]">
              <div className="grid min-h-40 place-items-center bg-primary text-white">
                <Megaphone size={42} strokeWidth={1.5} aria-hidden="true" />
              </div>
              <div className="p-7 sm:p-10">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge category={pinnedAnnouncement.category} />
                  <time className="text-sm text-text-muted">{formatDate(pinnedAnnouncement.date)}</time>
                </div>
                <h2 className="mt-5 text-2xl sm:text-3xl">{pinnedAnnouncement.title}</h2>
                <p className="mt-4 max-w-3xl leading-7 text-text-body">{pinnedAnnouncement.content}</p>
                <Link to="/announcements" className="mt-6 inline-flex min-h-11 items-center gap-2 font-semibold text-primary hover:text-primary-hover">
                  Read announcements <ArrowRight size={17} />
                </Link>
              </div>
            </article>
          </div>
        </section>
      )}

      <section className="bg-white py-20 sm:py-24">
        <div className="content-shell">
          <div className="relative overflow-hidden rounded-[1.5rem] bg-bg-dark px-6 py-14 text-center sm:px-12 sm:py-16">
            <span className="absolute left-8 top-8 h-3 w-3 rounded-full bg-secondary" aria-hidden="true" />
            <h2 className="mx-auto max-w-4xl text-4xl text-white sm:text-6xl">Your next project starts with people.</h2>
            <p className="mx-auto mt-5 max-w-2xl text-blue-100">Join the community shaping tech life at CTU Main.</p>
            <Link to="/membership" className="interactive-lift mt-8 inline-flex min-h-12 items-center gap-2 rounded-[1.5rem] bg-white px-7 font-semibold text-bg-dark hover:bg-bg-light">
              Join PSITS <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
