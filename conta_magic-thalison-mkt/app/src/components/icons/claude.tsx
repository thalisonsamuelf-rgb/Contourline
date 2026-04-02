interface ClaudeIconProps {
  className?: string;
  size?: number;
}

export function ClaudeIcon({ className, size = 24 }: ClaudeIconProps) {
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
        d="M15.728 8.396l-3.876 8.27a.565.565 0 01-1.064-.044L8.272 8.396a.565.565 0 00-.308-.32L1.792 5.47a.565.565 0 01.012-1.04l6.238-2.472a.565.565 0 00.3-.3L10.814.42a.565.565 0 011.04-.012l2.606 6.172c.06.142.17.254.308.32l6.172 2.606a.565.565 0 01.012 1.04l-6.238 2.472a.565.565 0 00-.3.3l-2.472 6.238a.565.565 0 01-1.04.012L8.396 15.728"
        fill="#D97757"
        transform="translate(0.5 2.5) scale(0.92)"
      />
      <path
        d="M15.728 8.396l-3.876 8.27a.565.565 0 01-1.064-.044L8.272 8.396a.565.565 0 00-.308-.32L1.792 5.47a.565.565 0 01.012-1.04l6.238-2.472a.565.565 0 00.3-.3L10.814.42a.565.565 0 011.04-.012l2.606 6.172c.06.142.17.254.308.32l6.172 2.606a.565.565 0 01.012 1.04l-6.238 2.472"
        fill="#D97757"
        transform="translate(1 3) scale(0.88)"
        opacity="0.6"
      />
    </svg>
  );
}
