/**
 * Button component
 * Variants: primary | secondary | accent | ghost | danger
 * Sizes: sm | md | lg
 * See design.md §4, Buttons
 */
import { forwardRef } from 'react';

const variantClasses = {
  primary:
    'bg-primary text-white hover:bg-primary-hover focus-visible:ring-primary',
  secondary:
    'border border-primary-neutral bg-bg-light text-primary hover:border-primary hover:bg-white focus-visible:ring-primary',
  accent:
    'bg-yellow-100 text-text-primary border border-secondary hover:bg-yellow-200 focus-visible:ring-secondary font-semibold',
  ghost:
    'bg-transparent text-text-primary hover:bg-bg-light focus-visible:ring-primary',
  danger:
    'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600',
};

const sizeClasses = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-7 py-3.5 text-base',
};

const Button = forwardRef(function Button(
  {
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    disabled = false,
    type = 'button',
    ...props
  },
  ref
) {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled}
      className={[
        'inline-flex min-h-11 items-center justify-center gap-2 rounded-[1.5rem] font-semibold',
        'whitespace-nowrap transition-all duration-200 hover:-translate-y-0.5 active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        variantClasses[variant] ?? variantClasses.primary,
        sizeClasses[size] ?? sizeClasses.md,
        disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </button>
  );
});

export default Button;
