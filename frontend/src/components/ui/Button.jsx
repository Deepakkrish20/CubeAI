/**
 * Reusable button component with variant support.
 */
function Button({
  children,
  variant = 'primary',
  type = 'button',
  className = '',
  disabled = false,
  ...props
}) {
  const variants = {
    primary: 'btn-primary',
    outline: 'btn-outline',
    accent:
      'inline-flex items-center justify-center rounded-lg bg-accent px-6 py-3 font-medium text-white transition-all duration-300 hover:bg-accent-600',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      className={`${variants[variant]} disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
