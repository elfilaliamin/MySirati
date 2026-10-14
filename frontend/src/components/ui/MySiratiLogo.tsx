import type { FC } from 'react';

interface MySiratiLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  textClassName?: string;
}

export const MySiratiIcon: FC<{ size?: number; className?: string }> = ({
  size = 36,
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`shrink-0 transition-transform duration-200 ${className}`}
  >
    <defs>
      <linearGradient id="siratiGrad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#2563EB" />
        <stop offset="60%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#60A5FA" />
      </linearGradient>
      <linearGradient id="sparkGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#E0F2FE" />
      </linearGradient>
      <filter id="logoShadow" x="-10%" y="-10%" width="125%" height="125%">
        <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#1E40AF" floodOpacity="0.25" />
      </filter>
    </defs>

    {/* Rounded squircle brand container */}
    <rect width="40" height="40" rx="10" fill="url(#siratiGrad)" filter="url(#logoShadow)" />

    {/* Subtle highlight inner border */}
    <rect x="0.5" y="0.5" width="39" height="39" rx="9.5" stroke="white" strokeOpacity="0.2" fill="none" />

    {/* Stylized 'S' Career Trajectory Path */}
    <path
      d="M26 13.5C25 11.2 22.8 10 20 10C16.2 10 13.5 12.2 13.5 15.2C13.5 21 26.5 19 26.5 25C26.5 28.2 23.5 30 19.8 30C16.2 30 13.8 28.2 13 25.5"
      stroke="url(#sparkGrad)"
      strokeWidth="3.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* AI Career Node / Sparkle Top-Right */}
    <path
      d="M28 8.5C28 10.5 29 11.5 31 11.5C29 11.5 28 12.5 28 14.5C28 12.5 27 11.5 25 11.5C27 11.5 28 10.5 28 8.5Z"
      fill="#FDE047"
    />

    {/* Secondary micro AI spark bottom-left */}
    <circle cx="11.5" cy="27" r="1.5" fill="#93C5FD" fillOpacity="0.9" />
  </svg>
);

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
