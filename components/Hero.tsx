import { useEffect, useState } from "react";
import { profile } from "../data/profile.public";

export function Hero() {
  const stats = [
    { value: "6+", label: "Years Experience", sub: "Enterprise Data Engineering" },
    { value: "3", label: "Core Domains", sub: "Finance | Healthcare | Enterprise" },
    { value: "4", label: "Certifications", sub: "Azure + Databricks + SAFe" },
    { value: "50+", label: "Daily Feeds", sub: "API Pipelines at Scale" }
  ];

  const [keywordIndex, setKeywordIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setKeywordIndex((prev) => (prev + 1) % profile.keywords.length);
    }, 2200);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="container-page py-20 sm:py-24">
      <span className="badge">Open to Data Engineering Opportunities</span>
      <p className="mt-6 text-sm uppercase tracking-[0.3em] text-accent">{profile.role}</p>
      <h1 className="mt-3 max-w-4xl font-display text-4xl font-bold leading-tight sm:text-6xl">
        Designing high-scale data systems <span className="gradient-text">that stay fast and reliable</span>
      </h1>
      <p className="mt-6 max-w-3xl text-base text-muted sm:text-lg">{profile.headline}</p>

      <div className="mt-5 h-7 overflow-hidden text-sm text-primary sm:text-base">
        <span key={keywordIndex} className="keyword-fade inline-block font-semibold">
          {profile.keywords[keywordIndex]}
        </span>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <a href="#projects" className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-[#07111f] transition hover:opacity-90">
          View Projects
        </a>
        <a href="#contact" className="rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold transition hover:border-accent hover:text-text">
          Contact
        </a>
      </div>
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <article key={stat.label} className="card">
            <div className="font-display text-3xl font-bold text-primary">{stat.value}</div>
            <div className="mt-1 text-sm font-semibold">{stat.label}</div>
            <div className="mt-1 text-xs text-muted">{stat.sub}</div>
          </article>
        ))}
      </div>
    </section>
  );
}

