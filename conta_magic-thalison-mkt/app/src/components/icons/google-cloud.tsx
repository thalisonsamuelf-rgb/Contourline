interface GoogleCloudIconProps {
  className?: string;
  size?: number;
}

export function GoogleCloudIcon({ className, size = 24 }: GoogleCloudIconProps) {
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
        d="M12.19 5.88h.35a6.04 6.04 0 0 1 4.77 2.33l1.78-1.78A8.49 8.49 0 0 0 12.54 3.5h-.35a8.51 8.51 0 0 0-7.63 4.74l2.07 1.6a5.99 5.99 0 0 1 5.56-3.96z"
        fill="#EA4335"
      />
      <path
        d="M17.09 8.43l-1.78 1.78a3.98 3.98 0 0 1 1.47 3.08v.5a2.49 2.49 0 0 1 0 4.98h-4.97l-.5.5v3l.5.5h4.97a5.49 5.49 0 0 0 .31-10.97z"
        fill="#4285F4"
      />
      <path
        d="M6.63 22.77h4.97v-3.5H6.63a2.45 2.45 0 0 1-1.03-.23l-.71.22-1.79 1.78-.18.69a5.44 5.44 0 0 0 3.71 1.04z"
        fill="#34A853"
      />
      <path
        d="M6.63 11.77A5.49 5.49 0 0 0 2.92 21.73l2.68-2.68a2.49 2.49 0 1 1 3.29-3.76l2.07-1.6a5.49 5.49 0 0 0-4.33-1.92z"
        fill="#FBBC05"
      />
    </svg>
  );
}
