import { DocSection } from "../data/libraryDocs";
import { CodePanel } from "./CodePanel";

type SectionBlockProps = {
  section: DocSection;
  sectionRef?: (node: HTMLElement | null) => void;
};

export function SectionBlock({ section, sectionRef }: SectionBlockProps) {
  return (
    <section className="section-block" id={section.id} ref={sectionRef}>
      <p className="section-kicker">{section.eyebrow}</p>
      <h2>{section.title}</h2>
      <p className="section-description">{section.description}</p>

      {section.metrics?.length ? (
        <div className="metrics-grid">
          {section.metrics.map((metric) => (
            <article className="metric-card" key={metric.label}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </article>
          ))}
        </div>
      ) : null}

      {section.bullets?.length ? (
        <ul className="bullet-list">
          {section.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      ) : null}

      {section.api?.length ? (
        <div className="api-list">
          {section.api.map((entry) => (
            <article className="api-card" key={entry.signature}>
              <div className="api-header">
                <h3>{entry.name}</h3>
                <span>{entry.returns}</span>
              </div>
              <code className="api-signature">{entry.signature}</code>
              <p className="api-description">{entry.description}</p>
              {entry.notes?.length ? (
                <ul className="api-note-list">
                  {entry.notes.map((note) => (
                    <li key={note}>{note}</li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}
        </div>
      ) : null}

      {section.codeSamples?.length ? (
        <div className="code-sample-list">
          {section.codeSamples.map((sample) => (
            <CodePanel
              key={`${section.id}-${sample.label}`}
              code={sample.code}
              label={sample.label}
              language={sample.language}
            />
          ))}
        </div>
      ) : null}

      {section.callout ? (
        <aside className="callout-box">
          <p className="callout-title">{section.callout.title}</p>
          <p className="callout-body">{section.callout.body}</p>
        </aside>
      ) : null}
    </section>
  );
}
