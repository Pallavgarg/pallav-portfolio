import { experience } from "../data/experience";

export function Experience() {
  return (
    <section id="experience" className="container-page py-14">
      <p className="section-kicker">Experience</p>
      <h2 className="section-title">Work Journey</h2>
      <div className="mt-6 space-y-4">
        {experience.map((job) => (
          <article key={job.company} className="card">
            <h3 className="font-display text-lg font-semibold">
              {job.role} - {job.company}
            </h3>
            <p className="mt-1 text-sm text-accent">{job.duration}</p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted">
              {job.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
