import { DocSection } from "../data/libraryDocs";

type DocSidebarProps = {
  activeSection: string;
  compact?: boolean;
  onNavigate: (id: string) => void;
  sections: DocSection[];
};

export function DocSidebar({
  activeSection,
  compact = false,
  onNavigate,
  sections,
}: DocSidebarProps) {
  if (compact) {
    return (
      <div aria-label="Section navigation" className="sidebar-compact" role="tablist">
        {sections.map((section) => {
          const active = activeSection === section.id;

          return (
            <button
              aria-pressed={active}
              key={section.id}
              className={`sidebar-pill${active ? " is-active" : ""}`}
              onClick={() => onNavigate(section.id)}
              type="button"
            >
              {section.title}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <nav aria-label="On this page" className="sidebar-card">
      <p className="sidebar-eyebrow">On this page</p>
      <div className="sidebar-list">
        {sections.map((section) => {
          const active = activeSection === section.id;

          return (
            <button
              aria-pressed={active}
              key={section.id}
              className={`sidebar-item${active ? " is-active" : ""}`}
              onClick={() => onNavigate(section.id)}
              type="button"
            >
              {section.title}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
