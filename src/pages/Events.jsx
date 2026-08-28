import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, ChevronRight, Search, Filter } from 'lucide-react';
import { events } from '../data/mockData';
import Badge from '../components/ui/Badge';
import PageHeader from '../components/layout/PageHeader';

const CATEGORIES = ['all', 'hackathon', 'bootcamp', 'seminar', 'social', 'quiz', 'design'];
const STATUS_TABS = ['all', 'upcoming', 'past'];

function formatDate(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-PH', {
    month: 'long', day: 'numeric', year: 'numeric',
  });
}

function EventCard({ event, featured = false }) {
  return (
    <article className={[
      'card-hover flex flex-col overflow-hidden rounded-[1.5rem] bg-white',
      featured ? 'md:col-span-2 md:grid md:grid-cols-[0.62fr_1.38fr]' : '',
    ].join(' ')}>
      {featured && (
        <div className="hidden min-h-full place-items-center bg-primary p-8 text-white md:grid" aria-hidden="true">
          <Calendar size={56} strokeWidth={1.35} />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-4 p-6 sm:p-7">
        <div className="flex items-start justify-between gap-2 flex-wrap">
          <Badge category={event.category} />
          {event.status === 'upcoming' && event.registrationOpen && (
            <span className="rounded-full border border-secondary bg-secondary/15 px-3 py-1 text-xs font-semibold text-text-primary">
              Registration open
            </span>
          )}
          {event.status === 'past' && (
            <span className="rounded-full border border-primary-neutral px-3 py-1 text-xs font-medium text-text-muted">
              Past event
            </span>
          )}
        </div>
        <h3 className={featured ? 'text-3xl sm:text-4xl' : 'text-2xl'}>{event.title}</h3>
        <p className="line-clamp-2 text-sm leading-7 text-text-body">{event.description}</p>
        <div className="flex flex-col gap-1.5 text-xs text-text-muted">
          <div className="flex items-center gap-2">
            <Calendar size={13} className="text-primary flex-shrink-0" />
            <span>
              {formatDate(event.date)}
              {event.endDate && event.endDate !== event.date
                ? ` - ${formatDate(event.endDate)}`
                : ''}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={13} className="text-primary flex-shrink-0" />
            <span>{event.venue}</span>
          </div>
        </div>
        {event.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {event.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-bg-light px-3 py-1 text-xs text-text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <Link
          to={`/events/${event.id}`}
          className="mt-auto inline-flex min-h-11 w-fit items-center gap-1 text-sm font-semibold text-primary hover:text-primary-hover"
        >
          View Details <ChevronRight size={14} />
        </Link>
      </div>
    </article>
  );
}

export default function Events() {
  const [search,    setSearch]    = useState('');
  const [category,  setCategory]  = useState('all');
  const [statusTab, setStatusTab] = useState('all');

  const filtered = events.filter((e) => {
    const q = search.toLowerCase();
    const matchesSearch =
      e.title.toLowerCase().includes(q) ||
      e.description.toLowerCase().includes(q);
    const matchesCategory = category === 'all' || e.category === category;
    const matchesStatus   = statusTab === 'all' || e.status === statusTab;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  function clearFilters() {
    setSearch('');
    setCategory('all');
    setStatusTab('all');
  }

  return (
    <div className="bg-bg-light">

      <PageHeader
        eyebrow="Events and activities"
        title={<>Find your next <span className="text-primary">challenge.</span></>}
        description="Browse workshops, hackathons, quiz bowls, and community events organized for CTU Main computing students."
      />

      {/* Sticky filters */}
      <section className="relative z-40 border-b border-primary-neutral/60 bg-white/95 backdrop-blur-xl sm:sticky sm:top-20">
        <div className="content-shell flex flex-col items-center gap-3 py-3 sm:flex-row sm:flex-wrap">
          {/* Search */}
          <div className="relative w-full sm:max-w-xs">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type="search"
              placeholder="Search events…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search events"
              className="min-h-11 w-full rounded-[1.5rem] border border-primary-neutral py-2 pl-9 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Status tabs */}
          <div className="flex gap-0.5 rounded-[1.5rem] bg-bg-light p-0.5">
            {STATUS_TABS.map((s) => (
              <button
                key={s}
                onClick={() => setStatusTab(s)}
                className={[
                  'min-h-10 rounded-full px-4 py-1.5 text-sm font-medium capitalize transition-colors',
                  statusTab === s
                    ? 'bg-primary text-white'
                    : 'text-text-muted hover:text-text-primary',
                ].join(' ')}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Category pills */}
          <div className="flex w-full items-center gap-1.5 overflow-x-auto pb-1 sm:w-auto sm:flex-wrap sm:overflow-visible sm:pb-0">
            <Filter size={14} className="text-text-muted" />
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={[
                  'min-h-10 shrink-0 whitespace-nowrap rounded-full border px-3 py-1 text-xs font-medium capitalize transition-colors',
                  category === c
                    ? 'bg-primary text-white border-primary'
                    : 'border-primary-neutral text-text-muted hover:border-primary hover:text-primary',
                ].join(' ')}
              >
                {c === 'all' ? 'All Types' : c}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="content-shell py-12 sm:py-16">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-text-muted text-lg">No events match your filters.</p>
            <button
              onClick={clearFilters}
              className="mt-4 text-sm text-primary hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {filtered.map((e, index) => <EventCard key={e.id} event={e} featured={index === 0} />)}
          </div>
        )}
      </section>
    </div>
  );
}
