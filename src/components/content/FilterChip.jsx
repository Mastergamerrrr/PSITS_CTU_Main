export default function FilterChip({ active = false, children, className = '', ...props }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={[
        'min-h-11 shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition-colors',
        active
          ? 'border-primary bg-primary text-white'
          : 'border-primary-neutral bg-white text-text-body hover:border-primary hover:text-primary',
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </button>
  );
}
