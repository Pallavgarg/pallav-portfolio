import { certifications } from "../data/certifications";

export function Certifications() {
  return (
    <section id="certifications" className="container-page py-14">
      <p className="section-kicker">Credentials</p>
      <h2 className="section-title">Certifications</h2>
      <ul className="mt-6 grid gap-3 md:grid-cols-2">
        {certifications.map((cert) => (
          <li key={cert} className="card text-sm text-muted">
            {cert}
          </li>
        ))}
      </ul>
    </section>
  );
}
