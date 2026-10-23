import Image from "next/image";
import { profile } from "@/content/profile";

/**
 * Round profile photo from profile.photo. Kept small on purpose (the source
 * is modest in resolution). Renders nothing if no photo is configured.
 */
export function Avatar({
  size,
  status = false,
  className = "",
  preload = false,
}: {
  /** Displayed size in CSS pixels. */
  size: number;
  /** Adds the green "available" dot. */
  status?: boolean;
  className?: string;
  preload?: boolean;
}) {
  const photo = profile.photo;
  if (!photo) return null;
  return (
    <span className={`relative inline-block shrink-0 ${className}`} style={{ width: size, height: size }}>
      <span className="absolute -inset-1 rounded-full bg-gradient-to-br from-accent/50 via-line-strong to-transparent" aria-hidden="true" />
      <Image
        src={photo.src}
        alt={photo.alt}
        width={size}
        height={size}
        sizes={`${size}px`}
        preload={preload}
        className="relative h-full w-full rounded-full bg-surface-2 object-cover ring-2 ring-bg"
      />
      {status && (
        <span className="absolute bottom-[6%] right-[6%] flex h-[22%] w-[22%] max-h-4 max-w-4" aria-hidden="true">
          <span className="status-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-60" />
          <span className="relative inline-flex h-full w-full rounded-full border-2 border-bg bg-accent" />
        </span>
      )}
    </span>
  );
}
