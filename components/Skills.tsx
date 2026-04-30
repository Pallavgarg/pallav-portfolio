import { skills } from "../data/skills";

export function Skills() {
  return (
    <section id="skills" className="container-page py-14">
      <p className="section-kicker">Skills</p>
      <h2 className="section-title">Tools I Build With</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {skills.map((group) => (
          <article key={group.category} className="card">
            <div className="flex items-center gap-3">
              <img src={group.icon} alt={group.category} className="h-7 w-7 rounded" />
              <h3 className="font-display text-lg font-semibold">{group.category}</h3>
            </div>
            <ul className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li key={item.name} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-muted">
                  <img src={item.icon} alt="" className="h-3.5 w-3.5" aria-hidden="true" />
                  {item.name}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
