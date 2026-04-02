interface PixelArrowIconProps {
  className?: string;
  size?: number;
}

export function PixelArrowIcon({ className, size = 24 }: PixelArrowIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      {/* Pixelated right arrow built from 2x2 blocks */}
      <rect x="4" y="11" width="2" height="2" />
      <rect x="6" y="11" width="2" height="2" />
      <rect x="8" y="11" width="2" height="2" />
      <rect x="10" y="11" width="2" height="2" />
      <rect x="12" y="11" width="2" height="2" />
      <rect x="14" y="11" width="2" height="2" />
      <rect x="16" y="11" width="2" height="2" />
      <rect x="14" y="9" width="2" height="2" />
      <rect x="12" y="7" width="2" height="2" />
      <rect x="14" y="13" width="2" height="2" />
      <rect x="12" y="15" width="2" height="2" />
    </svg>
  );
}
