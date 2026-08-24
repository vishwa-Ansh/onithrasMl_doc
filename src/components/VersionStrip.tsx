import { LibraryVersion, latestVersion } from "../data/libraryDocs";

type VersionStripProps = {
  currentSlug: string;
  onSelect: (slug: string) => void;
  versions: LibraryVersion[];
};

export function VersionStrip({
  currentSlug,
  onSelect,
  versions,
}: VersionStripProps) {
  return (
    <div className="version-strip">
      {versions.map((version) => {
        const active = version.slug === currentSlug;
        const isLatest = version.slug === latestVersion.slug;

        return (
          <button
            aria-pressed={active}
            key={version.slug}
            className={`version-pill${active ? " is-active" : ""}`}
            onClick={() => onSelect(version.slug)}
            type="button"
          >
            <div className="version-pill-header">
              <strong>{version.label}</strong>
              {isLatest ? <span className="version-latest-badge">Latest</span> : null}
            </div>
            <span className="version-pill-date">{version.releasedAt}</span>
          </button>
        );
      })}
    </div>
  );
}
