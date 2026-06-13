/**
 * Reusable form input component.
 */
function Input({ label, error, id, className = '', ...props }) {
  const inputId = id || props.name;

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium text-text">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`w-full rounded-lg border border-primary-200 bg-white px-4 py-2.5 text-text transition-colors focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20 ${error ? 'border-red-500' : ''} ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}

export default Input;
