interface CommandRIconProps {
  className?: string;
  size?: number;
}

export function CommandRIcon({ className, size = 24 }: CommandRIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      {/* Cohere Command R - stylized "C" mark */}
      <path
        d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z"
        fill="#39594D"
      />
      <path
        d="M15.5 7H9.25A3.25 3.25 0 0 0 6 10.25v3.5A3.25 3.25 0 0 0 9.25 17h1.25v-2.5H9.25a.75.75 0 0 1-.75-.75v-3.5a.75.75 0 0 1 .75-.75H15.5V7z"
        fill="#D18EE2"
      />
      <path
        d="M15.5 9.5H12V12h2.25a.75.75 0 0 1 .75.75V17h2.5v-4.25A3.25 3.25 0 0 0 14.25 9.5H15.5z"
        fill="#D18EE2"
        opacity="0.7"
      />
    </svg>
  );
}
