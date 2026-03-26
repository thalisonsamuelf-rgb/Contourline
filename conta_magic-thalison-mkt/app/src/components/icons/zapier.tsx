interface ZapierIconProps {
  className?: string;
  size?: number;
}

export function ZapierIcon({ className, size = 24 }: ZapierIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        d="M15.535 8.465h4.039a8.332 8.332 0 0 1 0 7.07h-4.039l2.856 2.856a8.36 8.36 0 0 1-5.001 5.001l-2.856-2.856v4.039a8.332 8.332 0 0 1-7.07 0v-4.039l-2.856 2.856a8.36 8.36 0 0 1-5.001-5.001l2.856-2.856H-1.575a8.332 8.332 0 0 1 0-7.07h4.039L-.392 5.608A8.36 8.36 0 0 1 4.61.608l2.856 2.856V-.575a8.332 8.332 0 0 1 7.07 0v4.039l2.856-2.856a8.36 8.36 0 0 1 5.001 5.001l-2.856 2.856zM12 15.07a3.07 3.07 0 1 0 0-6.14 3.07 3.07 0 0 0 0 6.14z"
        fill="#FF4A00"
        transform="translate(0.5 0.5) scale(0.96)"
      />
    </svg>
  );
}
