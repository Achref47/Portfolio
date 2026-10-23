"use client";

import { useState } from "react";
import { Check, Copy } from "./icons";

const styles = {
  default: "border-line bg-surface text-ink hover:border-line-strong hover:bg-surface-2",
  /** For dark panels such as the contact block. */
  inverse: "border-bg/25 bg-transparent text-bg hover:bg-bg/10",
};

export function CopyEmailButton({
  email,
  variant = "default",
  className = "",
}: {
  email: string;
  variant?: keyof typeof styles;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked; the mailto link next to this button still works.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className={`inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors ${styles[variant]} ${className}`}
    >
      {copied ? <Check className="h-4 w-4 text-accent" /> : <Copy className="h-4 w-4" />}
      <span aria-live="polite">{copied ? "Copied" : "Copy email"}</span>
    </button>
  );
}
