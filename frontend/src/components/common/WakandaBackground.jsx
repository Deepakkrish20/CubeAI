import { useApp } from '@/context/AppContext';

function WakandaBackground() {
  const { isDarkMode } = useApp();

  if (!isDarkMode) return null;

  // Generate 70 twinkling stars for a real, deep space starfield
  const stars = Array.from({ length: 70 }).map((_, i) => {
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    const size = Math.random() > 0.88 ? 2 : 1; 
    const delay = Math.random() * 8;
    const duration = 2.5 + Math.random() * 4.5;
    const isCyanStar = i % 3 === 0;
    const starBg = isCyanStar ? 'bg-cyan-200/90 shadow-[0_0_2px_rgba(34,211,238,0.5)]' : 'bg-purple-300/80 shadow-[0_0_2px_rgba(168,85,247,0.4)]';

    return (
      <div
        key={`star-${i}`}
        className={`absolute rounded-full animate-twinkle ${starBg}`}
        style={{
          left: `${left}%`,
          top: `${top}%`,
          width: `${size}px`,
          height: `${size}px`,
          animationDelay: `${delay}s`,
          animationDuration: `${duration}s`,
        }}
      />
    );
  });

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-[#030207] transition-colors duration-500">
      {/* Real pitch dark space base */}
      <div className="absolute inset-0 bg-[#030207]" />
      
      {/* High-tech celestial coordinate rings (Wakandan Portal core) - thin, real, rich styling */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] max-w-full aspect-square rounded-full border border-dashed border-cyan-500/5 animate-spin-slow opacity-40" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] max-w-full aspect-square rounded-full border border-dashed border-purple-500/5 animate-spin-slow opacity-40 [animation-direction:reverse] [animation-duration:15s]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] max-w-full aspect-square rounded-full border border-dashed border-cyan-500/3 animate-spin-slow opacity-25 [animation-duration:45s]" />
      
      {/* Concentric solid orbital hairline rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] max-w-full aspect-square rounded-full border border-purple-500/3" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100px] h-[100px] max-w-full aspect-square rounded-full border border-cyan-500/3" />

      {/* Stars Layer */}
      <div className="absolute inset-0">
        {stars}
      </div>
      
      {/* Ambient shadow vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_45%,_#030207_100%)]" />
    </div>
  );
}

export default WakandaBackground;
