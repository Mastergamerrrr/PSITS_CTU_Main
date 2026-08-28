/**
 * Badge / Tag component
 * Maps event category strings to color-coded pill badges.
 * See design.md §4, Badges and Tags
 */

const categoryConfig = {
  hackathon:   { label: 'Hackathon',   classes: 'bg-blue-100 text-blue-800 border-blue-200' },
  bootcamp:    { label: 'Bootcamp',    classes: 'bg-blue-50 text-blue-800 border-blue-200' },
  seminar:     { label: 'Seminar',     classes: 'bg-sky-50 text-blue-800 border-sky-200' },
  social:      { label: 'Social',      classes: 'bg-indigo-50 text-blue-800 border-indigo-200' },
  quiz:        { label: 'Quiz Bowl',   classes: 'bg-blue-50 text-blue-900 border-blue-200' },
  design:      { label: 'Design',      classes: 'bg-cyan-50 text-blue-800 border-cyan-200' },
  achievement: { label: 'Achievement', classes: 'bg-yellow-100 text-yellow-800 border-yellow-400' },
  events:      { label: 'Events',      classes: 'bg-blue-100 text-blue-800 border-blue-300' },
  results:     { label: 'Results',     classes: 'bg-blue-50 text-blue-800 border-blue-200' },
  membership:  { label: 'Membership',  classes: 'bg-blue-50 text-blue-800 border-blue-200' },
};

export default function Badge({ category, label, className = '' }) {
  const config = categoryConfig[category] ?? {
    label: label ?? category ?? 'Tag',
    classes: 'bg-blue-50 text-blue-800 border-blue-200',
  };

  return (
    <span
      className={[
        'inline-flex items-center whitespace-nowrap rounded-full border px-3 py-1 text-xs font-semibold',
        config.classes,
        className,
      ].join(' ')}
    >
      {label ?? config.label}
    </span>
  );
}
