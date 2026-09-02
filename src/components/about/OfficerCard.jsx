import { useState } from 'react';
import { ArrowLeft, UserRound } from 'lucide-react';

export default function OfficerCard({ officer, groupLabel, number }) {
  const [flipped, setFlipped] = useState(false);
  const officerName = officer.name ?? 'Officer name to be added';

  return (
    <article className="min-w-0">
      <button
        type="button"
        className="officer-card-stage block aspect-[3/4] w-full rounded-[1.5rem] text-left transition-transform duration-200 hover:-translate-y-0.5"
        aria-pressed={flipped}
        onClick={() => setFlipped((current) => !current)}
      >
        <span className="sr-only">
          {flipped
            ? `${officer.position}. ${officer.summary} ${officerName}. ${officer.year ?? 'Year and program details to be added'}. Press to return to the portrait side.`
            : `${officer.position}. ${officerName}. Press to show profile details.`}
        </span>
        <span className={['officer-flip-card relative block h-full w-full', flipped ? 'officer-flip-card-flipped' : ''].join(' ')}>
          <span className="officer-card-face officer-card-front absolute inset-0 flex flex-col overflow-hidden rounded-[1.5rem] border border-primary-neutral/70 bg-white p-4 sm:p-5" aria-hidden="true">
            <span
              className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden rounded-[1.1rem] bg-bg-light"
              role="img"
              aria-label={`Portrait placeholder for ${officer.position}`}
            >
              {officer.avatar ? (
                <img src={officer.avatar} alt={officerName} loading="lazy" decoding="async" className="h-full w-full object-cover" />
              ) : (
                <>
                  <span className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(0,102,255,0.14),transparent_42%)]" aria-hidden="true" />
                  <span className="grid h-24 w-24 place-items-center rounded-full border border-primary-neutral bg-white text-primary sm:h-28 sm:w-28" aria-hidden="true">
                    <UserRound size={46} strokeWidth={1.25} />
                  </span>
                  <span className="absolute bottom-4 rounded-full border border-primary-neutral bg-white px-3 py-1 text-xs font-semibold text-text-muted">
                    Photo coming soon
                  </span>
                </>
              )}
            </span>

            <span className="block pt-5">
              <span className="min-w-0">
                <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.13em] text-primary">
                  {groupLabel} · {String(number).padStart(2, '0')}
                </span>
                <span className="mt-2 block font-display text-xl font-extrabold leading-tight tracking-[-0.04em] text-text-primary">
                  {officer.position}
                </span>
                <span className="mt-2 block truncate text-sm text-text-muted">{officerName}</span>
              </span>
            </span>
          </span>

          <span className="officer-card-face officer-card-back absolute inset-0 flex flex-col overflow-hidden rounded-[1.5rem] bg-bg-dark p-5 text-white" aria-hidden="true">
            <span className="text-[0.65rem] font-semibold uppercase tracking-[0.13em] text-primary-neutral">
              {groupLabel} · {String(number).padStart(2, '0')}
            </span>

            <span className="mt-6 block">
              <span className="block font-display text-xl font-extrabold leading-tight tracking-[-0.04em] text-white sm:text-2xl">
                {officer.position}
              </span>
              <span className="mt-3 block text-sm leading-6 text-blue-100">{officer.summary}</span>
            </span>

            <span className="mt-auto grid grid-cols-2 gap-3 border-t border-white/20 pt-4">
              <span>
                <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-primary-neutral">Officer</span>
                <span className="mt-1 block text-sm font-semibold leading-5 text-white">{officerName}</span>
              </span>
              <span>
                <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-primary-neutral">Year &amp; program</span>
                <span className="mt-1 block text-sm leading-5 text-blue-100">{officer.year ?? 'Details to be added'}</span>
              </span>
            </span>

            <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white">
              <ArrowLeft size={17} aria-hidden="true" />
              Return to portrait
            </span>
          </span>
        </span>
      </button>
    </article>
  );
}
