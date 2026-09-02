import { Link } from 'react-router-dom';
import {
  ArrowRight, Megaphone,
} from 'lucide-react';
import { announcements, events, orgStats } from '../data/mockData';
import Badge from '../components/ui/Badge';
import ScrollReveal from '../components/ui/ScrollReveal';
import HeroNetwork from '../components/home/HeroNetwork';
import GetInvolved from '../components/home/GetInvolved';
import CampusPulse from '../components/home/CampusPulse';

function formatDate(dateStr) {
  if (!dateStr) return '';
  return new Date(`${dateStr}T00:00:00`).toLocaleDateString('en-PH', {
    month: 'short', day: 'numeric', year: 'numeric',
  });
}

export default function Home() {
  const upcomingEvents = events
    .filter((event) => event.status === 'upcoming')
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 3);
  const pinnedAnnouncement = announcements.find((announcement) => announcement.pinned);

  return (
    <div className="bg-white">
      <section id="home-hero" className="page-wash hero-home relative overflow-hidden">
        <HeroNetwork />
        <div className="content-shell relative z-[2] flex min-h-[calc(100dvh-5rem)] items-start pb-12 pt-24 sm:items-center sm:py-16 lg:py-20">
          <div className="hero-copy w-full min-w-0 max-w-4xl">
            <p className="section-kicker mb-4 md:mb-6">CCICT student community</p>
            <h1 className="display-title text-[clamp(2rem,10vw,3rem)] sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
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
          <ScrollReveal>
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
          </ScrollReveal>
        </div>
      </section>

      <CampusPulse events={upcomingEvents} />

      <GetInvolved />

      {pinnedAnnouncement && (
        <section className="bg-bg-light py-16 sm:py-20">
          <div className="content-shell">
            <ScrollReveal>
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
            </ScrollReveal>
          </div>
        </section>
      )}

      <section className="bg-white py-20 sm:py-24">
        <div className="content-shell">
          <ScrollReveal>
            <div className="relative overflow-hidden rounded-[1.5rem] bg-bg-dark px-6 py-14 text-center sm:px-12 sm:py-16">
              <span className="absolute left-8 top-8 h-3 w-3 rounded-full bg-secondary" aria-hidden="true" />
              <h2 className="mx-auto max-w-4xl text-4xl text-white sm:text-6xl">Your next project starts with people.</h2>
              <p className="mx-auto mt-5 max-w-2xl text-blue-100">Join the community shaping tech life at CTU Main.</p>
              <Link to="/membership" className="interactive-lift mt-8 inline-flex min-h-12 items-center gap-2 rounded-[1.5rem] bg-white px-7 font-semibold text-bg-dark hover:bg-bg-light">
                Join PSITS <ArrowRight size={18} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
