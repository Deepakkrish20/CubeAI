import React from 'react';

/**
 * Premium Logo component for Bundela Fin Corp (BF).
 * 
 * DESIGN FEATURES - "THE GEOMETRIC LENDING LOOP" (Masterclass Design):
 * - Flat & Clean: 100% vector, zero gradients, zero shadows, zero filters.
 * - Perfect Symmetry: Uses clean mathematical bezier curves aligned to a grid.
 * - The Concept:
 *   - The solid Emerald Green (#047857) lines form a structural "F" (representing stability/lending).
 *   - The solid Gold (#D97706) lines form two organic financial loops that link the F bars,
 *     completing the profile of a "B" (representing returns/wealth).
 *   - They interlock at exact nodes, forming a single, continuous, visual flow.
 * - Frame: Enclosed in a precise structural hexagon outline representing security.
 */
function Logo({ className = 'h-10 w-10', showText = false, textColor = 'text-gray-900 dark:text-white' }) {
  return (
    <div className="flex items-center gap-3">
      {/* Flat High-End Corporate Vector Logo */}
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        {/* Outer Hexagonal Shield Boundary representing trust and security */}
        <path
          d="M 50 8 L 86 29 L 86 71 L 50 92 L 14 71 L 14 29 Z"
          stroke="#047857"
          strokeWidth="2.5"
          strokeLinejoin="round"
          className="opacity-40"
        />

        {/* --- Monogram BF Symbol --- */}

        {/* The "F" Component (Forest Green) */}
        {/* Spine/Vertical stem */}
        <path
          d="M 32 20 V 80"
          stroke="#047857"
          strokeWidth="9"
          strokeLinecap="round"
        />
        {/* F Top Bar */}
        <path
          d="M 32 20 H 60"
          stroke="#047857"
          strokeWidth="9"
          strokeLinecap="round"
        />
        {/* F Middle Bar */}
        <path
          d="M 32 50 H 52"
          stroke="#047857"
          strokeWidth="9"
          strokeLinecap="round"
        />

        {/* The "B" Curves (Financial Gold) */}
        {/* Top Loop: Curves smoothly from top F bar to middle F bar */}
        <path
          d="M 60 20 C 74 20 74 50 52 50"
          stroke="#D97706"
          strokeWidth="9"
          strokeLinecap="round"
        />
        {/* Bottom Loop: Curves smoothly from middle F bar to bottom of Spine */}
        <path
          d="M 52 50 C 76 50 76 80 32 80"
          stroke="#D97706"
          strokeWidth="9"
          strokeLinecap="round"
        />

        {/* Decorative central golden pivot point representing target/investment alignment */}
        <circle
          cx="52"
          cy="50"
          r="4.5"
          fill="#D97706"
        />
      </svg>

      {showText && (
        <div className="flex flex-col select-none">
          <span className={`font-sans font-black tracking-tight text-lg uppercase leading-none ${textColor}`}>
            Bundela
          </span>
          <span className="font-sans font-bold tracking-widest text-[9px] uppercase text-[#D97706] leading-none mt-1.5">
            Fin Corp
          </span>
        </div>
      )}
    </div>
  );
}

export default Logo;
