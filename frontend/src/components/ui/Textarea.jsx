/**
 * Reusable textarea component.
 */
function Textarea({ label, error, id, className = '', ...props }) {
  const inputId = id || props.name;

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium text-text">
          {label}
        </label>
      )}
      <textarea
        id={inputId}
        className={`w-full resize-none rounded-lg border border-primary-200 bg-white px-4 py-2.5 text-text transition-colors focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20 ${error ? 'border-red-500' : ''} ${className}`}
        rows={4}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}

export default Textarea;
