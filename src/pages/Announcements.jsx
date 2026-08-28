import { useState } from 'react';
import { Calendar, Pin, Tag } from 'lucide-react';
import { announcements } from '../data/mockData';
import Badge from '../components/ui/Badge';
import PageHeader from '../components/layout/PageHeader';

const CATEGORIES = ['all', 'events', 'achievement', 'results', 'membership'];

function formatDate(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-PH', {
    month: 'long', day: 'numeric', year: 'numeric',
  });
}

export default function Announcements() {
  const [filter, setFilter] = useState('all');

  // Pinned first, then sorted by date descending
  const sorted = [...announcements].sort(
    (a, b) =>
      (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0) ||
      new Date(b.date) - new Date(a.date)
  );

  const filtered = sorted.filter(
    (a) => filter === 'all' || a.category === filter
  );

  return (
    <div className="bg-bg-light">

      <PageHeader
        eyebrow="Announcements"
        title={<>Campus updates, <span className="text-primary">all in one feed.</span></>}
        description="Read the latest PSITS news, competition results, membership notices, and event updates."
      />

      {/* Category filter */}
      <section className="border-b border-primary-neutral/60 bg-white">
        <div className="content-shell flex flex-wrap items-center gap-2 py-3">
          <Tag size={14} className="text-text-muted" />
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={[
                'min-h-10 rounded-full border px-4 py-1 text-xs font-medium capitalize transition-colors',
                filter === c
                  ? 'bg-primary text-white border-primary'
                  : 'border-primary-neutral text-text-muted hover:border-primary hover:text-primary',
              ].join(' ')}
            >
              {c === 'all' ? 'All' : c}
            </button>
          ))}
        </div>
      </section>

      {/* Feed */}
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {filtered.length === 0 ? (
          <p className="text-center text-text-muted py-12">
            No announcements in this category.
          </p>
        ) : (
          <div className="flex flex-col gap-5">
            {filtered.map((ann) => (
              <article
                key={ann.id}
                className={[
                  'flex flex-col gap-3 rounded-[1.5rem] bg-white p-6 sm:p-7',
                  ann.pinned
                    ? 'border border-secondary'
                    : '',
                ].join(' ')}
              >
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-2 flex-wrap">
                    {ann.pinned && (
                      <span className="inline-flex items-center gap-1 rounded-full border border-secondary bg-secondary/15 px-3 py-1 text-xs font-semibold text-text-primary">
                        <Pin size={10} /> Pinned
                      </span>
                    )}
                    <Badge category={ann.category} />
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-text-muted">
                    <Calendar size={12} />
                    <span>{formatDate(ann.date)}</span>
                  </div>
                </div>
                <h2 className="text-2xl leading-snug">
                  {ann.title}
                </h2>
                <p className="leading-7 text-text-body">{ann.content}</p>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
