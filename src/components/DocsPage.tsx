import { useDeferredValue, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

import { getVersionBySlug, libraryVersions } from "../data/libraryDocs";
import { DocSidebar } from "./DocSidebar";
import { NotFoundPage } from "./NotFoundPage";
import { SectionBlock } from "./SectionBlock";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

export function DocsPage() {
  const { version } = useParams<{ version: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search.trim().toLowerCase());
  const selectedVersion = getVersionBySlug(version);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const [activeSection, setActiveSection] = useState("overview");
  const activeSectionRef = useRef(activeSection);

  useEffect(() => {
    activeSectionRef.current = activeSection;
  }, [activeSection]);

  if (!selectedVersion) {
    return <NotFoundPage />;
  }

  const visibleSections = selectedVersion.sections.filter((section) => {
    if (!deferredSearch) {
      return true;
    }

    const haystack = [
      section.eyebrow,
      section.title,
      section.description,
      ...(section.bullets ?? []),
      ...(section.codeSamples?.map((sample) => `${sample.label} ${sample.language} ${sample.code}`) ?? []),
      ...(section.api?.map((entry) => `${entry.name} ${entry.signature} ${entry.description}`) ?? []),
      section.callout?.title ?? "",
      section.callout?.body ?? "",
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(deferredSearch);
  });

  useEffect(() => {
    setActiveSection(selectedVersion.sections[0]?.id ?? "overview");
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [selectedVersion.slug]);

  useEffect(() => {
    if (!visibleSections.length) {
      return;
    }

    const syncActiveSection = () => {
      const positions = visibleSections
        .map((section) => ({
          id: section.id,
          top: sectionRefs.current[section.id]?.getBoundingClientRect().top ?? Number.POSITIVE_INFINITY,
        }))
        .filter((entry) => Number.isFinite(entry.top));

      if (!positions.length) {
        return;
      }

      const passed = positions
        .filter((entry) => entry.top <= 180)
        .sort((left, right) => right.top - left.top)[0];

      const next = passed?.id ?? positions.find((entry) => entry.top > 0)?.id ?? positions[0]?.id;

      if (next && next !== activeSectionRef.current) {
        activeSectionRef.current = next;
        setActiveSection(next);
      }
    };

    syncActiveSection();
    window.addEventListener("scroll", syncActiveSection, { passive: true });
    window.addEventListener("resize", syncActiveSection);

    return () => {
      window.removeEventListener("scroll", syncActiveSection);
      window.removeEventListener("resize", syncActiveSection);
    };
  }, [selectedVersion.slug, deferredSearch]);

  useEffect(() => {
    const hashId = location.hash.replace("#", "");
    if (!hashId) {
      return;
    }

    const target = sectionRefs.current[hashId];
    if (!target) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [location.hash, selectedVersion.slug, deferredSearch]);

  function handleVersionSelect(nextSlug: string) {
    navigate(`/docs/${nextSlug}`);
  }

  function handleNavigate(sectionId: string) {
    const target = sectionRefs.current[sectionId];
    if (!target) {
      return;
    }

    setActiveSection(sectionId);
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `${location.pathname}#${sectionId}`);
  }

  return (
    <div className="site-shell docs-shell">
      <SiteHeader compact />

      <div className="docs-toolbar">
        <div className="docs-toolbar-inner">
          <p className="docs-crumb">
            <Link to="/">onithrasML</Link>
            <span>/</span>
            <strong>{selectedVersion.label} documentation</strong>
          </p>
          <div className="docs-toolbar-controls">
            <label className="visually-hidden" htmlFor="version-select">
              Choose version
            </label>
            <select
              id="version-select"
              className="version-select"
              onChange={(event) => handleVersionSelect(event.target.value)}
              value={selectedVersion.slug}
            >
              {libraryVersions.map((release) => (
                <option key={release.slug} value={release.slug}>
                  {release.label}
                  {release.badge === "Latest" ? " (stable)" : ""}
                </option>
              ))}
            </select>
            <input
              aria-label="Search this version"
              className="search-input"
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search docs..."
              type="search"
              value={search}
            />
          </div>
        </div>
      </div>

      <div className="docs-layout">
        <aside className="sidebar-column desktop-only">
          <DocSidebar
            activeSection={activeSection}
            onNavigate={handleNavigate}
            sections={visibleSections}
          />
        </aside>

        <main className="docs-main">
          <div className="mobile-only">
            <DocSidebar
              activeSection={activeSection}
              compact
              onNavigate={handleNavigate}
              sections={visibleSections}
            />
          </div>

          <header className="docs-intro">
            <p className="section-kicker">{selectedVersion.heroTag}</p>
            <h1>{selectedVersion.heroTitle}</h1>
            <p>{selectedVersion.heroBody}</p>
            <div className="docs-meta-row">
              {selectedVersion.stats.map((item) => (
                <article key={item.label}>
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </article>
              ))}
            </div>
          </header>

          <section className="feature-grid">
            {selectedVersion.featureCards.map((feature) => (
              <article className="feature-card" key={feature.title}>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </article>
            ))}
          </section>

          {visibleSections.length ? (
            <div className="section-stack">
              {visibleSections.map((section) => (
                <SectionBlock
                  key={section.id}
                  section={section}
                  sectionRef={(node) => {
                    sectionRefs.current[section.id] = node;
                  }}
                />
              ))}
            </div>
          ) : (
            <section className="empty-state">
              <p className="section-kicker">No match found</p>
              <h3>No results in {selectedVersion.label}</h3>
              <p>Try a broader keyword like install, fit, backend, or version.</p>
            </section>
          )}

          <section className="changelog-panel" id="changelog">
            <p className="section-kicker">What changed</p>
            <h2>Release notes for {selectedVersion.label}</h2>
            <div className="release-note-grid">
              {selectedVersion.changelog.map((entry) => (
                <article className="release-note-card" key={entry.title}>
                  <h3>{entry.title}</h3>
                  <p>{entry.detail}</p>
                </article>
              ))}
            </div>
          </section>
        </main>
      </div>

      <SiteFooter />
    </div>
  );
}
