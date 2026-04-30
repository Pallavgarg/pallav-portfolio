import { profile } from "../data/profile.public";

export function About() {
  return (
    <section id="about" className="container-page py-14">
      <p className="section-kicker">About</p>
      <h2 className="section-title">Who I Am</h2>
      <p className="mt-4 max-w-4xl text-muted">{profile.summary}</p>
      <ul className="mt-6 grid gap-3 sm:grid-cols-3">
        {profile.highlights.map((item) => (
          <li key={item} className="card text-sm text-muted">
            {item}
          </li>
        ))}
      </ul>
      <p className="mt-6 text-sm text-muted">{profile.education}</p>
    </section>
  );
}

