import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CalendarDays,
  Check,
  Copy,
  Megaphone,
  Pin,
  Search,
} from 'lucide-react';
import { announcements } from '../data/mockData';
import Badge from '../components/ui/Badge';
import ContentHero from '../components/content/ContentHero';
import EmptyState from '../components/content/EmptyState';
import FilterChip from '../components/content/FilterChip';

const CATEGORIES = ['all', 'events', 'achievement', 'results', 'membership'];

function formatDate(dateStr, options = {}) {
  return new Date(`${dateStr}T00:00:00`).toLocaleDateString('en-PH', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    ...options,
  });
}

function actionFor(announcement) {
  if (announcement.category === 'events') return { to: '/events', label: 'View events' };
  if (announcement.category === 'membership') return { to: '/membership', label: 'Join PSITS' };
  return null;
}

function LeadAnnouncement({ announcement }) {
  const action = actionFor(announcement);

  return (
    <article className="overflow-hidden rounded-[1.5rem] bg-bg-dark text-white">
      <div className="relative aspect-[2/1] overflow-hidden">
        <img
          src="/events/hackathon-campus.jpg"
          alt="Computing students collaborating during a campus event"
          className="h-full w-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/15 to-transparent" />
      </div>
      <div className="p-6 sm:p-7">
        <div className="flex flex-wrap items-center gap-2 text-sm text-blue-100">
          <span className="inline-flex items-center gap-1.5 font-semibold text-white"><Pin size={14} /> Pinned update</span>
          <span aria-hidden="true">/</span>
          <time dateTime={announcement.date}>{formatDate(announcement.date)}</time>
        </div>
        <h2 className="mt-4 text-3xl leading-tight text-white">{announcement.title}</h2>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-blue-100">{announcement.content}</p>
        {action && (
          <Link to={action.to} className="mt-5 inline-flex min-h-11 items-center gap-2 font-semibold text-white hover:text-blue-100">
            {action.label} <ArrowRight size={16} />
          </Link>
        )}
      </div>
    </article>
  );
}

function AnnouncementRow({ announcement, copiedId, onCopy }) {
  const action = actionFor(announcement);
  const date = new Date(`${announcement.date}T00:00:00`);

  return (
    <article id={announcement.id} className="scroll-mt-32 border-b border-primary-neutral/70 py-7 first:pt-0 last:border-0 last:pb-0">
      <div className="grid gap-5 sm:grid-cols-[6rem_1fr]">
        <time dateTime={announcement.date} className="text-sm text-text-muted">
          <span className="block font-semibold text-text-primary">{date.toLocaleDateString('en-PH', { month: 'short', day: 'numeric' })}</span>
          <span>{date.getFullYear()}</span>
        </time>

        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge category={announcement.category} />
            {announcement.pinned && (
              <span className="inline-flex items-center gap-1 rounded-full bg-yellow-50 px-3 py-1 text-xs font-semibold text-yellow-900">
                <Pin size={11} aria-hidden="true" /> Pinned
              </span>
            )}
          </div>
          <h2 className="mt-4 text-2xl leading-tight">{announcement.title}</h2>
          <p className="mt-3 max-w-3xl leading-7 text-text-body">{announcement.content}</p>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            {action && (
              <Link to={action.to} className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-hover">
                {action.label} <ArrowRight size={15} aria-hidden="true" />
              </Link>
            )}
            <button
              type="button"
              onClick={() => onCopy(announcement.id)}
              className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-text-muted hover:text-primary"
              aria-label={`Copy link to ${announcement.title}`}
            >
              {copiedId === announcement.id ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}
              {copiedId === announcement.id ? 'Link copied' : 'Copy link'}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Announcements() {
  const sorted = useMemo(() => [...announcements].sort(
    (a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0) || new Date(b.date) - new Date(a.date)
  ), []);
  const featured = sorted[0];
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  const filtered = sorted.filter((announcement) => {
    if (announcement.id === featured.id) return false;
    const query = search.trim().toLowerCase();
    const matchesSearch = !query || `${announcement.title} ${announcement.content}`.toLowerCase().includes(query);
    const matchesCategory = filter === 'all' || announcement.category === filter;
    return matchesSearch && matchesCategory;
  });

  function resetFilters() {
    setFilter('all');
    setSearch('');
  }

  async function copyAnnouncementLink(id) {
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(id);
      window.setTimeout(() => setCopiedId(null), 1800);
    } catch {
      window.location.hash = id;
    }
  }

  return (
    <div className="bg-bg-light">
      <ContentHero
        eyebrow="Announcements"
        title={<>Know what is <span className="text-primary">happening.</span></>}
        description="Important PSITS updates, results, deadlines, and opportunities in one clear campus feed."
        actions={(
          <>
            <a href="#latest-updates" className="interactive-lift inline-flex min-h-11 items-center rounded-[1.5rem] bg-primary px-5 text-sm font-semibold text-white hover:bg-primary-hover">
              Read latest updates
            </a>
            <Link to="/events" className="inline-flex min-h-11 items-center rounded-[1.5rem] border border-primary-neutral bg-white px-5 text-sm font-semibold text-text-primary hover:border-primary hover:text-primary">
              Explore events
            </Link>
          </>
        )}
        visual={<LeadAnnouncement announcement={featured} />}
      />

      <section id="latest-updates" className="scroll-mt-24 border-y border-primary-neutral/60 bg-white">
        <div className="content-shell py-5">
          <div className="grid gap-4 lg:grid-cols-[minmax(16rem,1fr)_auto] lg:items-center">
            <label className="relative block">
              <span className="sr-only">Search announcements</span>
              <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" aria-hidden="true" />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search updates and notices"
                className="min-h-12 w-full rounded-[1.5rem] border border-primary-neutral bg-bg-light py-3 pl-11 pr-4 text-sm text-text-primary placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </label>
            <div className="scrollbar-none flex gap-2 overflow-x-auto pb-1 lg:justify-end lg:overflow-visible lg:pb-0" aria-label="Filter announcements by category">
              {CATEGORIES.map((category) => (
                <FilterChip key={category} active={filter === category} onClick={() => setFilter(category)}>
                  {category === 'all' ? 'All updates' : category[0].toUpperCase() + category.slice(1)}
                </FilterChip>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="content-shell py-12 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-[1fr_18rem] lg:gap-12">
          <div>
            <div className="mb-8 flex items-end justify-between gap-5">
              <div>
                <h2 className="text-3xl sm:text-4xl">Latest from PSITS</h2>
                <p className="mt-2 text-sm text-text-muted" aria-live="polite">
                  {filtered.length} {filtered.length === 1 ? 'update' : 'updates'} in this view.
                </p>
              </div>
              {(search || filter !== 'all') && (
                <button type="button" onClick={resetFilters} className="min-h-11 text-sm font-semibold text-primary hover:text-primary-hover">
                  Reset filters
                </button>
              )}
            </div>

            {filtered.length === 0 ? (
              <EmptyState
                title="No updates found"
                description="Try a broader search or return to the complete announcement feed."
                actionLabel="Show all updates"
                onAction={resetFilters}
              />
            ) : (
              <div className="rounded-[1.5rem] bg-white p-6 sm:p-8">
                {filtered.map((announcement) => (
                  <AnnouncementRow key={announcement.id} announcement={announcement} copiedId={copiedId} onCopy={copyAnnouncementLink} />
                ))}
              </div>
            )}
          </div>

          <aside className="h-fit rounded-[1.5rem] bg-primary p-6 text-white lg:sticky lg:top-28">
            <Megaphone size={25} aria-hidden="true" />
            <h2 className="mt-5 text-2xl text-white">Never miss a deadline</h2>
            <p className="mt-3 text-sm leading-6 text-blue-100">
              Check the Events page for registration status, schedules, and venue details.
            </p>
            <Link to="/events" className="mt-5 inline-flex min-h-11 items-center gap-2 font-semibold text-white hover:text-blue-100">
              View the schedule <CalendarDays size={16} aria-hidden="true" />
            </Link>
          </aside>
        </div>
      </section>
    </div>
  );
}
