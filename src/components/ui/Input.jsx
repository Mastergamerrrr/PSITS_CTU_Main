/**
 * Input & Textarea form components
 * Always includes an associated <label> for accessibility.
 * Shows error messages with role="alert" for screen readers.
 * See design.md §8, Accessibility Notes
 */

export function Input({
  id,
  label,
  error,
  hint,
  className = '',
  required = false,
  type = 'text',
  ...props
}) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={id} className="text-sm font-semibold text-text-primary">
          {label}
          {required && (
            <span className="text-red-500 ml-1" aria-hidden="true">*</span>
          )}
        </label>
      )}
      <input
        id={id}
        type={type}
        required={required}
        aria-describedby={
          error ? `${id}-error` : hint ? `${id}-hint` : undefined
        }
        aria-invalid={!!error}
        className={[
          'w-full min-h-12 px-4 py-3 rounded-xl border bg-white text-text-primary text-sm',
          'transition-colors duration-200 placeholder:text-text-muted',
          error
            ? 'border-red-500 focus:ring-red-500'
            : 'border-primary-neutral focus:border-primary focus:ring-primary',
          'focus:outline-none focus:ring-2 focus:ring-offset-1',
          className,
        ].join(' ')}
        {...props}
      />
      {hint && !error && (
        <p id={`${id}-hint`} className="text-xs text-text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

export function Textarea({
  id,
  label,
  error,
  hint,
  className = '',
  required = false,
  rows = 4,
  ...props
}) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={id} className="text-sm font-semibold text-text-primary">
          {label}
          {required && (
            <span className="text-red-500 ml-1" aria-hidden="true">*</span>
          )}
        </label>
      )}
      <textarea
        id={id}
        rows={rows}
        required={required}
        aria-describedby={
          error ? `${id}-error` : hint ? `${id}-hint` : undefined
        }
        aria-invalid={!!error}
        className={[
          'w-full px-4 py-3 rounded-xl border bg-white text-text-primary text-sm resize-y',
          'transition-colors duration-200 placeholder:text-text-muted',
          error
            ? 'border-red-500 focus:ring-red-500'
            : 'border-primary-neutral focus:border-primary focus:ring-primary',
          'focus:outline-none focus:ring-2 focus:ring-offset-1',
          className,
        ].join(' ')}
        {...props}
      />
      {hint && !error && (
        <p id={`${id}-hint`} className="text-xs text-text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
