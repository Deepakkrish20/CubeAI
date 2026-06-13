function LoadingSpinner({ fullScreen = false, size = 'md' }) {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-10 w-10',
    lg: 'h-14 w-14',
  };

  const spinner = (
    <div
      className={`animate-spin rounded-full border-4 border-primary-200 border-t-secondary ${sizeClasses[size]}`}
      role="status"
      aria-label="Loading"
    />
  );

  if (fullScreen) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">{spinner}</div>
    );
  }

  return <div className="flex items-center justify-center p-8">{spinner}</div>;
}

export default LoadingSpinner;
