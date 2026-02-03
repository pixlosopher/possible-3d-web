import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  linkToHome?: boolean;
}

const sizes = {
  sm: { width: 32, height: 27 },
  md: { width: 40, height: 34 },
  lg: { width: 60, height: 50 },
  xl: { width: 100, height: 84 },
};

export default function Logo({ size = "md", showText = true, linkToHome = true }: LogoProps) {
  const { width, height } = sizes[size];

  const logoContent = (
    <div className="flex items-center gap-2">
      <Image
        src="/images/possible-logo.png"
        alt="POSSIBLE Logo"
        width={width}
        height={height}
        className="object-contain"
        priority
      />
      {showText && (
        <span className={`font-bold ${size === "sm" ? "text-lg" : size === "md" ? "text-xl" : size === "lg" ? "text-2xl" : "text-3xl"}`}>
          POSSIBLE
        </span>
      )}
    </div>
  );

  if (linkToHome) {
    return (
      <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
        {logoContent}
      </Link>
    );
  }

  return logoContent;
}
