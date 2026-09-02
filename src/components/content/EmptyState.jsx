import { SearchX } from 'lucide-react';

export default function EmptyState({ title, description, actionLabel, onAction }) {
  return (
    <div className="rounded-[1.5rem] bg-white px-6 py-14 text-center sm:px-10">
      <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-bg-light text-primary">
        <SearchX size={24} aria-hidden="true" />
      </span>
      <h2 className="mt-5 text-2xl">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-text-muted">{description}</p>
      {onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-6 min-h-11 rounded-[1.5rem] bg-primary px-5 py-2 text-sm font-semibold text-white hover:bg-primary-hover"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
