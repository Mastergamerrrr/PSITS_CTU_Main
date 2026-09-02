import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  MapPin,
  Users,
} from 'lucide-react';
import Badge from '../ui/Badge';

function getDateParts(dateStr) {
  const date = new Date(`${dateStr}T00:00:00`);
  return {
    day: date.toLocaleDateString('en-PH', { day: '2-digit' }),
    month: date.toLocaleDateString('en-PH', { month: 'short' }),
    full: date.toLocaleDateString('en-PH', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }),
  };
}

function formatRange(events) {
  const first = new Date(`${events[0].date}T00:00:00`);
  const last = new Date(`${events[events.length - 1].date}T00:00:00`);
  const firstLabel = first.toLocaleDateString('en-PH', { month: 'short', day: 'numeric' });
  const lastLabel = last.toLocaleDateString('en-PH', { month: 'short', day: 'numeric' });
  return `${firstLabel} - ${lastLabel}`;
}

function FeaturedEvent({ event }) {
  const date = getDateParts(event.date);

  return (
    <li className="campus-pulse-item" style={{ '--pulse-index': 0 }}>
      <Link
        to={`/events/${event.id}`}
        className="group grid min-w-0 overflow-hidden rounded-[1.5rem] bg-bg-dark text-white sm:grid-cols-[0.92fr_1.08fr]"
      >
        <div className="relative min-h-56 overflow-hidden sm:min-h-full">
          <img
            src={event.image || '/events/hackathon-campus.jpg'}
            alt={`Students attending ${event.title}`}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/65 via-transparent to-transparent sm:bg-gradient-to-r sm:from-transparent sm:to-bg-dark/25" aria-hidden="true" />
        </div>

        <div className="flex min-w-0 flex-col p-6 sm:p-7">
          <div className="flex flex-wrap items-center gap-2">
            <Badge category={event.category} />
            <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white">Next up</span>
          </div>

          <div className="mt-6 flex items-center gap-3 text-sm font-semibold text-blue-100">
            <CalendarDays size={17} aria-hidden="true" />
            <time dateTime={event.date}>{date.full}</time>
          </div>

          <h3 className="mt-3 text-2xl leading-tight text-white sm:text-3xl">{event.title}</h3>

          <div className="mt-5 grid gap-2 text-sm text-blue-100">
            <span className="flex items-center gap-2">
              <Clock3 size={16} className="shrink-0" aria-hidden="true" />
              {event.time}
            </span>
            <span className="flex items-center gap-2">
              <MapPin size={16} className="shrink-0" aria-hidden="true" />
              <span className="truncate">{event.venue}</span>
            </span>
          </div>

          <span className="mt-auto inline-flex min-h-11 items-end gap-2 pt-6 font-semibold text-white">
            View event
            <ArrowRight size={17} className="mb-0.5 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
          </span>
        </div>
      </Link>
    </li>
  );
}

function EventRow({ event, index }) {
  const date = getDateParts(event.date);

  return (
    <li className="campus-pulse-item" style={{ '--pulse-index': index }}>
      <Link
        to={`/events/${event.id}`}
        className="group grid min-w-0 grid-cols-[4rem_minmax(0,1fr)] items-center gap-4 rounded-[1.5rem] border border-primary-neutral/70 bg-bg-light p-4 transition-colors hover:border-primary sm:grid-cols-[5rem_minmax(0,1fr)_3rem] sm:gap-5 sm:p-5"
      >
        <time dateTime={event.date} aria-label={date.full} className="border-r border-primary-neutral/70 pr-4 text-center sm:pr-5">
          <span className="block text-[0.68rem] font-bold uppercase tracking-[0.12em] text-primary">{date.month}</span>
          <span className="mt-1 block font-display text-3xl font-extrabold leading-none tracking-tight text-text-primary">{date.day}</span>
        </time>

        <div className="min-w-0">
          <Badge category={event.category} />
          <h3 className="mt-2 line-clamp-2 text-lg leading-tight text-text-primary transition-colors group-hover:text-primary sm:text-xl">
            {event.title}
          </h3>
          <div className="mt-3 flex flex-col gap-1.5 text-xs text-text-muted sm:flex-row sm:gap-5">
            <span className="flex min-w-0 items-center gap-1.5">
              <MapPin size={14} className="shrink-0" aria-hidden="true" />
              <span className="truncate">{event.venue}</span>
            </span>
            <span className="hidden items-center gap-1.5 sm:flex">
              <Users size={14} aria-hidden="true" />
              {event.maxParticipants} capacity
            </span>
          </div>
        </div>

        <span className="hidden h-11 w-11 place-items-center rounded-full bg-white text-primary transition-colors group-hover:bg-primary group-hover:text-white sm:grid">
          <ArrowRight size={17} className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
          <span className="sr-only">View {event.title}</span>
        </span>
      </Link>
    </li>
  );
}

export default function CampusPulse({ events }) {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotion.matches) {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setVisible(true);
      observer.disconnect();
    }, { threshold: 0.16, rootMargin: '0px 0px -8% 0px' });

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  if (!events.length) return null;

  return (
    <section
      id="campus-pulse"
      ref={sectionRef}
      className={['campus-pulse page-wash py-20 sm:py-24 lg:py-28', visible ? 'campus-pulse-visible' : ''].join(' ')}
      aria-labelledby="campus-pulse-title"
    >
      <div className="content-shell grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:pt-3">
          <p className="text-sm font-semibold tracking-[0.08em] text-primary">Campus pulse</p>
          <h2 id="campus-pulse-title" className="mt-5 max-w-[11ch] text-4xl sm:text-5xl lg:text-6xl">
            Your next reason to <span className="text-primary">show up.</span>
          </h2>
          <p className="mt-6 max-w-md leading-7 text-text-body">
            Workshops, competitions, and conversations. Follow what is coming up and find your place in the program.
          </p>

          <dl className="mt-8 grid max-w-md grid-cols-2 border-y border-primary-neutral/70 py-5">
            <div className="pr-5">
              <dd className="font-display text-3xl font-extrabold tracking-tight text-text-primary">{String(events.length).padStart(2, '0')}</dd>
              <dt className="mt-1 text-xs font-semibold text-text-muted">Upcoming events</dt>
            </div>
            <div className="border-l border-primary-neutral/70 pl-5">
              <dd className="font-display text-lg font-extrabold tracking-tight text-text-primary">{formatRange(events)}</dd>
              <dt className="mt-2 text-xs font-semibold text-text-muted">Current calendar</dt>
            </div>
          </dl>

          <Link to="/events" className="interactive-lift mt-8 inline-flex min-h-12 items-center gap-2 rounded-[1.5rem] bg-primary px-6 font-semibold text-white hover:bg-primary-hover">
            View all events
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>

        <div className="min-w-0 rounded-[1.5rem] bg-white p-4 sm:p-6 lg:p-7">
          <div className="flex items-center justify-between gap-4 px-1 pb-5">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-bg-light text-primary">
                <CalendarDays size={20} aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-lg text-text-primary">Coming up at PSITS</h3>
                <p className="mt-1 text-xs font-semibold text-text-muted">Next three dates</p>
              </div>
            </div>
            <Link to="/events" className="hidden min-h-11 items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-hover sm:inline-flex">
              Full calendar <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>

          <ol className="grid gap-4" aria-label="Upcoming PSITS events">
            <FeaturedEvent event={events[0]} />
            {events.slice(1).map((event, index) => (
              <EventRow key={event.id} event={event} index={index + 1} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
