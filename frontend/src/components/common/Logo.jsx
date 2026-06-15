/**
 * Official Bundela Fin Corp Logo component.
 * Uses the real logo image from bundelafinance.com.
 * Pass variant="onDark" for dark backgrounds (white brand text + icon crop).
 */
function Logo({
  className = 'h-12 w-auto',
  showText = false,
  textColor = 'text-gray-900',
  variant = 'default',
}) {
  if (variant === 'onDark') {
    return (
      <div className="flex items-center gap-2.5">
        <div className="relative h-9 w-9 shrink-0 overflow-hidden">
          <img
            src="/bundela-logo.png"
            alt=""
            aria-hidden="true"
            className="absolute right-0 top-1/2 h-9 w-auto max-w-none -translate-y-1/2"
          />
        </div>
        {showText && (
          <span className={`text-[15px] font-bold tracking-wide ${textColor}`}>
            Bundela Fin Corp
          </span>
        )}
      </div>
    );
  }

  return (
    <img
      src="/bundela-logo.png"
      alt="Bundela Fin Corp"
      className={className}
      style={{ objectFit: 'contain' }}
    />
  );
}

export default Logo;
