interface FeLogoProps {
  size?: number;
  className?: string;
}

export default function FeLogo({ size = 32, className = "" }: FeLogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      <rect width="100" height="100" fill="#2F3E36" />
      <rect x="6" y="6" width="88" height="88" fill="none" stroke="#C8A97E" strokeWidth="0.8" opacity="0.7" />
      <text
        x="51"
        y="67"
        fontFamily="var(--font-cormorant), Georgia, serif"
        fontSize="44"
        fontWeight="300"
        fill="#C8A97E"
        textAnchor="middle"
        letterSpacing="5"
      >
        FE
      </text>
    </svg>
  );
}
