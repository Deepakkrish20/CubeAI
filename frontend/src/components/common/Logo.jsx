/**
 * Official Bundela Fin Corp Logo component.
 * Uses the real logo image from bundelafinance.com — no separate text label.
 */
function Logo({ className = 'h-12 w-auto', showText = false, textColor = 'text-gray-900' }) {
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
