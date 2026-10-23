import type { ReactNode } from "react";

/**
 * Re-mounted on every navigation, so each page enters with a short rise.
 * Transform-led (see .animate-page-in) so content is never fully invisible.
 */
export default function Template({ children }: { children: ReactNode }) {
  return <div className="animate-page-in">{children}</div>;
}
