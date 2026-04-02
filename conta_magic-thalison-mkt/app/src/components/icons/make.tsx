interface MakeIconProps {
  className?: string;
  size?: number;
}

export function MakeIcon({ className, size = 24 }: MakeIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 256 256"
      fill="none"
      className={className}
    >
      <path
        d="M128 0C57.308 0 0 57.308 0 128s57.308 128 128 128 128-57.308 128-128S198.692 0 128 0z"
        fill="#6D00CC"
      />
      <path
        d="M128 44c-46.392 0-84 37.608-84 84s37.608 84 84 84 84-37.608 84-84-37.608-84-84-84zm0 140c-30.928 0-56-25.072-56-56s25.072-56 56-56 56 25.072 56 56-25.072 56-56 56z"
        fill="#fff"
      />
      <path
        d="M128 100c-15.464 0-28 12.536-28 28s12.536 28 28 28 28-12.536 28-28-12.536-28-28-28z"
        fill="#fff"
      />
    </svg>
  );
}
