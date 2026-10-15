import type { FC } from 'react';
import { useId } from 'react';

interface MySiratiLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  textClassName?: string;
}

export const MySiratiIcon: FC<{ size?: number; className?: string }> = ({
  size = 36,
  className = '',
}) => {
  const rawId = useId();
  const gradId = `siratiGrad-${rawId.replace(/[^a-zA-Z0-9-_]/g, '')}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 transition-transform duration-200 drop-shadow-sm ${className}`}
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="50%" stopColor="#1D4ED8" />
          <stop offset="100%" stopColor="#0284C7" />
        </linearGradient>
      </defs>

      {/* Rounded squircle container */}
      <rect width="40" height="40" rx="11" fill={`url(#${gradId})`} />

    {/* Subtle highlight inner border */}
    <rect x="0.5" y="0.5" width="39" height="39" rx="10.5" stroke="white" strokeOpacity="0.2" fill="none" />

    {/* Central Sparkle Star outline */}
    <path
      d="M 18.7 11.8 A 1.3 1.3 0 0 1 21.3 11.8 L 21.3 16.2 Q 21.3 18.7 23.8 18.7 L 28.2 18.7 A 1.3 1.3 0 0 1 28.2 21.3 L 23.8 21.3 Q 21.3 21.3 21.3 23.8 L 21.3 28.2 A 1.3 1.3 0 0 1 18.7 28.2 L 18.7 23.8 Q 18.7 21.3 16.2 21.3 L 11.8 21.3 A 1.3 1.3 0 0 1 11.8 18.7 L 16.2 18.7 Q 18.7 18.7 18.7 16.2 Z"
      fill="none"
      stroke="white"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Top-Right Sparkle */}
    <path
      d="M 26.8 11.1 V 14.5 M 25.1 12.8 H 28.5"
      stroke="white"
      strokeWidth="1.6"
      strokeLinecap="round"
    />

    {/* Bottom-Left Ring */}
    <circle cx="13.8" cy="26.5" r="2.0" stroke="white" strokeWidth="1.5" fill="none" />
  </svg>
  );
};

export const MySiratiLogo: FC<MySiratiLogoProps> = ({
  className = '',
  size = 36,
  showText = true,
  textClassName = '',
}) => (
  <div className={`flex items-center gap-2.5 font-bold ${className}`}>
    <MySiratiIcon size={size} />
    {showText && (
      <div className="flex flex-col">
        <span className={`text-base font-extrabold tracking-tight text-text leading-none ${textClassName}`}>
          MySirati
        </span>
      </div>
    )}
  </div>
);
