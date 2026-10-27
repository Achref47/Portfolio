import type { CSSProperties } from "react";
import { ScrollScene } from "./effects";

/**
 * A paragraph whose words light up in reading order as it scrolls through
 * the screen. The text is always complete in the HTML (and fully visible
 * without JavaScript, in print and with reduced motion).
 */
export function ScrollWords({ text, className = "" }: { text: string; className?: string }) {
  const words = text.split(/\s+/);
  return (
    <ScrollScene as="p" start={0.88} end={0.5} className={`scroll-words ${className}`} style={{ ["--n" as string]: words.length } as CSSProperties}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} data-w="" style={{ ["--i" as string]: i } as CSSProperties}>
          {word}{" "}
        </span>
      ))}
    </ScrollScene>
  );
}
