import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  CalendarDays,
  CalendarPlus,
  ChevronRight,
  Clock3,
  MapPin,
  Search,
  SlidersHorizontal,
  Users,
} from 'lucide-react';
import { events } from '../data/mockData';
import Badge from '../components/ui/Badge';
import ContentHero from '../components/content/ContentHero';
import EmptyState from '../components/content/EmptyState';
import FilterChip from '../components/content/FilterChip';
import ScrollReveal from '../components/ui/ScrollReveal';

const CATEGORIES = ['all', 'hackathon', 'bootcamp', 'seminar', 'social', 'quiz', 'design'];
const STATUS_TABS = ['upcoming', 'past', 'all'];

function toDate(dateStr) {
  return new Date(`${dateStr}T00:00:00`);
}

function formatDate(dateStr, options = {}) {
  if (!dateStr) return '';
  return toDate(dateStr).toLocaleDateString('en-PH', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    ...options,
  });
}

function getDateParts(dateStr) {
  const date = toDate(dateStr);
  return {
    month: date.toLocaleDateString('en-PH', { month: 'short' }),
    day: date.toLocaleDateString('en-PH', { day: '2-digit' }),
  };
}

function compactCalendarDate(dateStr) {
  return dateStr.replaceAll('-', '');
}

function addOneDay(dateStr) {
  const date = toDate(dateStr);
  date.setDate(date.getDate() + 1);
  return date.toISOString().slice(0, 10);
}

function calendarHref(event) {
  const end = addOneDay(event.endDate || event.date);
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    dates: `${compactCalendarDate(event.date)}/${compactCalendarDate(end)}`,
    details: event.description,
    location: event.venue,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function FeaturedEvent({ event }) {
  const date = getDateParts(event.date);

  return (
    <article className="overflow-hidden rounded-[1.5rem] bg-white">
      <div className="relative aspect-[16/9] overflow-hidden sm:aspect-[2/1] lg:aspect-[16/9]">
        <img
          src={event.image}
          alt="Students collaborating during a campus technology event"
          className="h-full w-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg-dark/90 via-bg-dark/45 to-transparent p-5 pt-16 text-white sm:p-6">
          <div className="flex items-end justify-between gap-5">
            <div>
              <p className="text-sm font-semibold text-blue-100">Featured event</p>
              <h2 className="mt-1 max-w-xl text-2xl text-white sm:text-3xl">{event.title}</h2>
            </div>
            <div className="hidden min-w-16 rounded-2xl bg-white px-3 py-2 text-center sm:block">
              <span className="block text-xs font-bold uppercase tracking-wide text-primary">{date.month}</span>
              <span className="block font-display text-2xl font-extrabold text-text-primary">{date.day}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-5 p-5 sm:grid-cols-[1fr_auto] sm:items-end sm:p-6">
        <div className="grid gap-2 text-sm text-text-body sm:grid-cols-2">
          <span className="flex items-center gap-2"><Clock3 size={16} className="text-primary" />{event.time}</span>
          <span className="flex items-center gap-2"><MapPin size={16} className="text-primary" />{event.venue}</span>
          <span className="flex items-center gap-2"><Users size={16} className="text-primary" />Up to {event.maxParticipants} participants</span>
          <span className="flex items-center gap-2"><CalendarDays size={16} className="text-primary" />Register by {formatDate(event.registrationDeadline)}</span>
        </div>
        <Link
          to={`/events/${event.id}`}
          className="interactive-lift inline-flex min-h-11 items-center justify-center gap-2 rounded-[1.5rem] bg-primary px-5 text-sm font-semibold text-white hover:bg-primary-hover"
        >
          View event <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

function EventCard({ event }) {
  const date = getDateParts(event.date);
  const isOpen = event.status === 'upcoming' && event.registrationOpen;

  return (
    <article className="group grid gap-5 rounded-[1.5rem] bg-white p-5 transition-transform duration-300 hover:-translate-y-0.5 sm:grid-cols-[5rem_1fr] sm:p-6">
      <div className="flex h-fit items-center gap-3 rounded-2xl bg-bg-light px-4 py-3 sm:block sm:px-2 sm:text-center">
        <span className="block text-xs font-bold uppercase tracking-wide text-primary">{date.month}</span>
        <span className="block font-display text-2xl font-extrabold text-text-primary sm:mt-0.5 sm:text-3xl">{date.day}</span>
      </div>

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <Badge category={event.category} />
          <span className={[
            'rounded-full px-3 py-1 text-xs font-semibold',
            isOpen ? 'bg-green-50 text-green-800' : 'bg-bg-light text-text-muted',
          ].join(' ')}>
            {isOpen ? 'Registration open' : event.status === 'past' ? 'Event concluded' : 'Registration pending'}
          </span>
        </div>

        <h2 className="mt-4 text-2xl leading-tight transition-colors group-hover:text-primary">{event.title}</h2>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-text-body">{event.description}</p>

        <div className="mt-4 flex flex-col gap-2 text-sm text-text-muted sm:flex-row sm:flex-wrap sm:gap-x-5">
          <span className="flex items-center gap-2"><Clock3 size={15} className="text-primary" />{event.time}</span>
          <span className="flex items-center gap-2"><MapPin size={15} className="text-primary" />{event.venue}</span>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <Link
            to={`/events/${event.id}`}
            className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-hover"
          >
            {event.status === 'past' ? 'View event' : 'View details'} <ChevronRight size={15} aria-hidden="true" />
          </Link>
          {event.status === 'upcoming' && (
            <a
              href={calendarHref(event)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-full px-2 text-sm font-semibold text-text-body hover:text-primary"
              aria-label={`Add ${event.title} to Google Calendar`}
            >
              <CalendarPlus size={16} aria-hidden="true" /> Add to calendar
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Events() {
  const featuredEvent = events.find((event) => event.featured) || events.find((event) => event.status === 'upcoming');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [status, setStatus] = useState('upcoming');

  const filtered = useMemo(() => events.filter((event) => {
    if (event.id === featuredEvent?.id) return false;
    const query = search.trim().toLowerCase();
    const matchesSearch = !query || [event.title, event.description, event.venue, ...(event.tags || [])]
      .some((value) => value.toLowerCase().includes(query));
    const matchesCategory = category === 'all' || event.category === category;
    const matchesStatus = status === 'all' || event.status === status;
    return matchesSearch && matchesCategory && matchesStatus;
  }), [category, featuredEvent?.id, search, status]);

  function clearFilters() {
    setSearch('');
    setCategory('all');
    setStatus('upcoming');
  }

  return (
    <div className="bg-bg-light">
      <ContentHero
        eyebrow="Events and activities"
        title={<>Your next <span className="text-primary">challenge.</span></>}
        description="Discover hands-on workshops, competitions, and community events built for CTU Main computing students."
        actions={(
          <>
            <a href="#browse-events" className="interactive-lift inline-flex min-h-11 items-center rounded-[1.5rem] bg-primary px-5 text-sm font-semibold text-white hover:bg-primary-hover">
              Browse events
            </a>
            <Link to="/contact" className="inline-flex min-h-11 items-center rounded-[1.5rem] border border-primary-neutral bg-white px-5 text-sm font-semibold text-text-primary hover:border-primary hover:text-primary">
              Propose an activity
            </Link>
          </>
        )}
        visual={<FeaturedEvent event={featuredEvent} />}
      />

      <section id="browse-events" className="scroll-mt-24 border-y border-primary-neutral/60 bg-white">
        <div className="content-shell py-5">
          <div className="grid gap-4 lg:grid-cols-[minmax(16rem,1fr)_auto] lg:items-center">
            <label className="relative block">
              <span className="sr-only">Search events</span>
              <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" aria-hidden="true" />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by event, topic, or venue"
                className="min-h-12 w-full rounded-[1.5rem] border border-primary-neutral bg-bg-light py-3 pl-11 pr-4 text-sm text-text-primary placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </label>

            <div className="scrollbar-none flex gap-2 overflow-x-auto pb-1 lg:justify-end lg:overflow-visible lg:pb-0" aria-label="Filter events by status">
              {STATUS_TABS.map((tab) => (
                <FilterChip key={tab} active={status === tab} onClick={() => setStatus(tab)}>
                  {tab === 'all' ? 'All events' : tab[0].toUpperCase() + tab.slice(1)}
                </FilterChip>
              ))}
            </div>
          </div>

          <details className="mt-4 lg:hidden">
            <summary className="flex min-h-11 cursor-pointer list-none items-center gap-2 text-sm font-semibold text-text-primary">
              <SlidersHorizontal size={17} className="text-primary" aria-hidden="true" /> Filter by event type
            </summary>
            <div className="scrollbar-none mt-2 flex gap-2 overflow-x-auto pb-2">
              {CATEGORIES.map((item) => (
                <FilterChip key={item} active={category === item} onClick={() => setCategory(item)}>
                  {item === 'all' ? 'All types' : item[0].toUpperCase() + item.slice(1)}
                </FilterChip>
              ))}
            </div>
          </details>

          <div className="mt-4 hidden flex-wrap gap-2 lg:flex" aria-label="Filter events by type">
            {CATEGORIES.map((item) => (
              <FilterChip key={item} active={category === item} onClick={() => setCategory(item)}>
                {item === 'all' ? 'All types' : item[0].toUpperCase() + item.slice(1)}
              </FilterChip>
            ))}
          </div>
        </div>
      </section>

      <section className="content-shell py-12 sm:py-16">
        <div className="mb-7 flex items-end justify-between gap-5">
          <div>
            <h2 className="text-3xl sm:text-4xl">Explore the schedule</h2>
            <p className="mt-2 text-sm text-text-muted" aria-live="polite">
              {filtered.length} {filtered.length === 1 ? 'event' : 'events'} match your current view.
            </p>
          </div>
          {(search || category !== 'all' || status !== 'upcoming') && (
            <button type="button" onClick={clearFilters} className="min-h-11 text-sm font-semibold text-primary hover:text-primary-hover">
              Reset filters
            </button>
          )}
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            title="No matching events yet"
            description="Try another keyword or reset the filters to see more PSITS activities."
            actionLabel="Reset filters"
            onAction={clearFilters}
          />
        ) : (
          <div className="grid gap-5 lg:grid-cols-2">
            {filtered.map((event, index) => (
              <ScrollReveal key={event.id} delay={index % 2}>
                <EventCard event={event} />
              </ScrollReveal>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
