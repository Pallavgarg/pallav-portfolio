import { useEffect, useState } from "react";

function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const saved = localStorage.getItem("theme");
    const darkPreferred = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldDark = saved ? saved === "dark" : darkPreferred;

    root.classList.toggle("dark", shouldDark);
    setIsDark(shouldDark);
    setMounted(true);
  }, []);

  function toggleTheme() {
    const root = document.documentElement;
    const next = !isDark;
    root.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    setIsDark(next);
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      role="switch"
      aria-checked={isDark}
      aria-label="Toggle theme"
      className="inline-flex items-center"
      disabled={!mounted}
    >
      <span
        className={`relative h-6 w-12 rounded-full border transition-colors ${
          isDark ? "border-primary/50 bg-primary/35" : "border-accent/45 bg-accent/25"
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full shadow transition-all ${
            isDark ? "left-6 bg-primary" : "left-0.5 bg-accent"
          }`}
        />
      </span>
    </button>
  );
}

function FontSizeControls() {
  const [size, setSize] = useState(100);

  useEffect(() => {
    const saved = localStorage.getItem("fontScale");
    const start = saved ? Number(saved) : 100;
    const clamped = Math.min(120, Math.max(90, Number.isFinite(start) ? start : 100));
    document.documentElement.style.fontSize = `${clamped}%`;
    setSize(clamped);
  }, []);

  function update(next: number) {
    const clamped = Math.min(120, Math.max(90, next));
    document.documentElement.style.fontSize = `${clamped}%`;
    localStorage.setItem("fontScale", String(clamped));
    setSize(clamped);
  }

  return (
    <div className="inline-flex items-center gap-1 rounded-xl border border-text/15 bg-surface/40 p-1">
      <button
        type="button"
        onClick={() => update(size - 5)}
        className="rounded-md px-2 py-1 text-xs text-muted transition hover:bg-surface hover:text-text"
        aria-label="Decrease font size"
      >
        A-
      </button>
      <button
        type="button"
        onClick={() => update(size + 5)}
        className="rounded-md px-2 py-1 text-xs text-muted transition hover:bg-surface hover:text-text"
        aria-label="Increase font size"
      >
        A+
      </button>
    </div>
  );
}

const links = [
  ["About", "about"],
  ["Skills", "skills"],
  ["Experience", "experience"],
  ["Projects", "projects"],
  ["Certifications", "certifications"],
  ["Contact", "contact"]
] as const;

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-text/10 bg-bg/80 backdrop-blur-xl">
      <nav className="container-page flex h-16 items-center justify-between">
        <a href="#" className="font-display text-sm font-bold tracking-[0.24em] text-primary">
          PG
        </a>
        <div className="flex items-center gap-10">
          <ul className="hidden items-center gap-6 text-sm text-muted md:flex">
            {links.map(([label, id]) => (
              <li key={id}>
                <a className="transition hover:text-text" href={`#${id}`}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-4 pl-6 md:pl-10 border-l border-text/15">
            <FontSizeControls />
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </header>
  );
}
