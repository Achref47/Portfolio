import Image from "next/image";
import { profile } from "@/content/profile";

/**
 * Round profile photo from profile.photo. Kept small on purpose (the source
 * is modest in resolution). Renders nothing if no photo is configured.
 * `decorative` hides it from assistive technology where the name is already
 * next to it (e.g. inside the hero heading).
 */
export function Avatar({
  size,
  className = "",
  preload = false,
  decorative = false,
}: {
  /** Displayed size in CSS pixels, or a CSS length such as "1em". */
  size: number | string;
  className?: string;
  preload?: boolean;
  decorative?: boolean;
}) {
  const photo = profile.photo;
  if (!photo) return null;
  const px = typeof size === "number" ? size : 160;
  return (
    <span className={`relative inline-block shrink-0 overflow-hidden rounded-full bg-surface-2 ${className}`} style={{ width: size, height: size }}>
      <Image
        src={photo.src}
        alt={decorative ? "" : photo.alt}
        width={px}
        height={px}
        sizes={`${px}px`}
        preload={preload}
        className="h-full w-full object-cover"
      />
    </span>
  );
}
