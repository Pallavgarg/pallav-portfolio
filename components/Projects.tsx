import { projects } from "../data/projects";

export function Projects() {
  return (
    <section id="projects" className="container-page py-14">
      <p className="section-kicker">Projects</p>
      <h2 className="section-title">Featured Delivery</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {projects.map((project) => (
          <article key={project.title} className="card md:col-span-2">
            <p className="text-xs uppercase tracking-widest text-accent">
              {project.company} | {project.duration} | {project.domain}
            </p>
            <h3 className="mt-2 font-display text-xl font-semibold">{project.title}</h3>
            <p className="mt-3 text-sm text-muted">{project.summary}</p>

            <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted">
              {project.tools.map((tool) => (
                <span key={tool} className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1">
                  {tool}
                </span>
              ))}
            </div>

            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted">
              {project.outcomes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <div className="mt-5">
              <p className="text-xs uppercase tracking-[0.2em] text-primary">High-Level Flow</p>
              <div className="mt-3 grid gap-2 md:grid-cols-5">
                {project.flow.map((step, index) => (
                  <div key={step} className="flow-step">
                    <span className="mb-1 inline-block text-[10px] text-accent">Step {index + 1}</span>
                    <div>{step}</div>
                  </div>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
