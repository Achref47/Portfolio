import Link from "next/link";
import { Container, Kicker } from "@/components/ui";

export default function NotFound() {
  return (
    <Container className="py-28">
      <Kicker>404</Kicker>
      <h1 className="mt-4 font-display text-5xl tracking-tight text-ink">This page does not exist.</h1>
      <p className="mt-4 max-w-xl text-ink-2">The link may be outdated, or the project may have moved.</p>
      <div className="mt-8 flex gap-3">
        <Link href="/projects" className="rounded-lg bg-ink px-4 py-2.5 text-sm font-medium text-bg hover:opacity-90">
          Browse all projects
        </Link>
        <Link href="/" className="rounded-lg border border-line bg-surface px-4 py-2.5 text-sm font-medium text-ink hover:bg-surface-2">
          Home
        </Link>
      </div>
    </Container>
  );
}
