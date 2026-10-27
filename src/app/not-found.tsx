import Link from "next/link";
import { ArrowLabel, button, Container, Kicker } from "@/components/ui";

export default function NotFound() {
  return (
    <Container className="py-28">
      <Kicker>Error 404</Kicker>
      <h1 className="mt-4 font-display text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[0.98] text-ink">
        This page does not exist<span className="text-accent">.</span>
      </h1>
      <p className="mt-5 max-w-xl text-[1.0625rem] text-ink-2">The link may be outdated, or the project may have moved.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/projects" className={button("primary")}>
          <ArrowLabel>Browse all projects</ArrowLabel>
        </Link>
        <Link href="/" className={button("secondary")}>
          Home
        </Link>
      </div>
    </Container>
  );
}
