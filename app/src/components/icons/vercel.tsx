interface VercelIconProps {
  className?: string;
  size?: number;
}

export function VercelIcon({ className, size = 24 }: VercelIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M12 1L24 22H0L12 1z" />
    </svg>
  );
}
