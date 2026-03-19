interface AirtableIconProps {
  className?: string;
  size?: number;
}

export function AirtableIcon({ className, size = 24 }: AirtableIconProps) {
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
        d="M11.522 1.652l-8.63 3.192c-.487.18-.483.862.006 1.036l8.684 3.105a1.61 1.61 0 0 0 1.084-.003l8.523-3.104c.487-.177.487-.853.003-1.034l-8.58-3.193a1.61 1.61 0 0 0-1.09.001z"
        fill="#FCB400"
      />
      <path
        d="M12.7 10.643v8.63c0 .399.42.667.788.503l9.18-3.947a.536.536 0 0 0 .312-.487V6.803c0-.399-.42-.667-.788-.503l-9.18 3.842a.543.543 0 0 0-.312.5z"
        fill="#18BFFF"
      />
      <path
        d="M11.053 10.79L7.7 9.133l-5.968-2.54a.534.534 0 0 0-.772.477v8.444c0 .21.123.401.314.49l6.84 3.143c.245.113.533-.067.533-.34V12.56l2.458 1.27c.2.102.442-.04.442-.266v-2.488a.536.536 0 0 0-.493-.287z"
        fill="#F82B60"
      />
      <path
        d="M11.053 10.79L7.7 9.134v3.425l2.907 1.506c.2.102.442-.04.442-.266v-2.722a.536.536 0 0 0 .004-.287z"
        fill="#BA1E45"
        opacity="0.25"
      />
    </svg>
  );
}
