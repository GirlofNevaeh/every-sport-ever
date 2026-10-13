import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { directHit } from "@/data/find";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/sports", label: "Sports" },
  { to: "/stars", label: "Stars" },
  { to: "/games", label: "Games" },
  { to: "/facts", label: "Facts" },
  { to: "/quiz", label: "Quiz" },
  { to: "/work", label: "Work" },
  { to: "/about", label: "About" },
] as const;

export function SearchForm({ id, big = false }: { id: string; big?: boolean }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    const text = query.trim();
    if (!text) return;
    const hit = directHit(text);
    if (hit?.kind === "sport") {
      void navigate({ to: "/sports/$slug", params: { slug: hit.slug } });
      return;
    }
    if (hit?.kind === "star") {
      void navigate({ to: "/stars/$slug", params: { slug: hit.slug } });
      return;
    }
    void navigate({ to: "/search", search: { q: text } });
  }

  return (
    <form onSubmit={onSubmit} className={`flex min-w-0 gap-2 ${big ? "mt-3" : ""}`} role="search">
      <label className="sr-only" htmlFor={id}>
        Search for a sport or a person
      </label>
      <input
        id={id}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Sport or name"
        suppressHydrationWarning
        className={`min-w-0 flex-1 rounded-full border-2 border-ink bg-vest px-3 text-ink outline-none placeholder:text-muted ${big ? "h-12 text-lg" : "h-10"}`}
      />
      <button
        type="submit"
        className={`shrink-0 rounded-full bg-gold font-bold text-ink ${big ? "h-12 px-4 text-base" : "h-10 px-3 text-sm"}`}
      >
        SEARCH
      </button>
    </form>
  );
}

export function InstallDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-ink/60 p-3 sm:items-center"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-title"
        className="w-full max-w-md rounded-3xl border-4 border-pitch bg-vest p-5 text-ink shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id="add-title" className="font-display text-3xl text-pitch">
          Add to iPhone or iPad
        </h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-lg">
          <li>Use Safari.</li>
          <li>Tap Share.</li>
          <li>Tap Add to Home Screen.</li>
        </ol>
        <button
          type="button"
          onClick={onClose}
          className="mt-4 h-12 w-full rounded-full bg-gold font-bold text-ink"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export function SiteHeader() {
  const path = useRouterState({ select: (state) => state.location.pathname });
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b-4 border-pitch bg-vest/95 backdrop-blur">
      <div className="mx-auto w-full max-w-5xl px-3 pb-1">
        <div className="flex h-9 items-center justify-between gap-2">
          <Link to="/" className="truncate font-display text-lg leading-none text-pitch">
            Every Sport Ever
          </Link>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="h-8 shrink-0 rounded-full bg-gold px-3 text-sm font-bold text-ink"
            aria-label="Add to iPhone or iPad"
          >
            Add
          </button>
        </div>
        <SearchForm id="header-search" />
        <nav className="mt-1 grid grid-cols-4 gap-1" aria-label="Main">
          {NAV.map((item) => {
            const active = item.to === "/" ? path === "/" : path === item.to || path.startsWith(`${item.to}/`);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex h-8 items-center justify-center rounded-full px-1 text-center text-sm font-bold leading-none ${active ? "bg-pitch text-vest" : "bg-ink/5 text-ink"}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
      <InstallDialog open={open} onClose={() => setOpen(false)} />
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-10 border-t-4 border-pitch bg-pitch px-4 py-6 text-vest">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xl text-base">
          A sport has rules, a way to score, and a way to win.
        </p>
        <Link to="/about" className="inline-flex h-11 items-center justify-center rounded-full bg-gold px-4 font-bold text-ink">
          About
        </Link>
      </div>
    </footer>
  );
}
