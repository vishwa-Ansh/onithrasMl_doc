export type CodeSample = {
  label: string;
  language: string;
  code: string;
};

export type ApiItem = {
  name: string;
  signature: string;
  description: string;
  returns: string;
  notes?: string[];
};

export type DocSection = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  bullets?: string[];
  metrics?: Array<{
    label: string;
    value: string;
  }>;
  codeSamples?: CodeSample[];
  api?: ApiItem[];
  callout?: {
    title: string;
    body: string;
  };
};

export type LibraryVersion = {
  slug: string;
  label: string;
  badge: string;
  releasedAt: string;
  summary: string;
  heroTag: string;
  heroTitle: string;
  heroBody: string;
  install: {
    pip: string;
    source: string;
    nightly?: string;
  };
  featureCards: Array<{
    title: string;
    description: string;
  }>;
  stats: Array<{
    label: string;
    value: string;
  }>;
  changelog: Array<{
    title: string;
    detail: string;
  }>;
  sections: DocSection[];
};

const quickstartSnippet = `import numpy as np
from onithrasml.preprocessing import SimpeleImputer

X = np.array([
    [20, 30000],
    [25, 40000],
    [np.nan, 50000],
    [35, np.nan]
], dtype=object)

imputer = SimpeleImputer(strategy="mean")
imputer.fit(X)
X_clean = imputer.transform(X)

print("Learned statistics:", imputer.statistics_)
print(X_clean)`;

const apiReference: ApiItem[] = [
  {
    name: "__init__",
    signature: 'SimpeleImputer(strategy="mean", fill_value=None)',
    description:
      "Configures how missing values are replaced for numeric or categorical columns.",
    returns: "Initialized imputer instance.",
    notes: [
      'Supported strategies: "mean", "median", "most_frequent", "constant".',
      'Use fill_value when strategy is set to "constant".',
    ],
  },
  {
    name: "fit",
    signature: "fit(X)",
    description:
      "Scans each column, ignores missing values, and stores the learned statistic in statistics_.",
    returns: "self",
    notes: [
      "Reshapes 1D input into a single-column matrix.",
      "Raises TypeError when mean or median is used with non-numeric data.",
    ],
  },
  {
    name: "transform",
    signature: "transform(X)",
    description:
      "Replaces missing values using statistics learned during fit without recomputing anything.",
    returns: "numpy.ndarray",
    notes: [
      "Validates that fit has already completed.",
      "Keeps training and inference logic separated to avoid leakage.",
    ],
  },
];

type VersionSeed = {
  slug: string;
  label: string;
  badge: string;
  releasedAt: string;
  summary: string;
  heroTag: string;
  heroTitle: string;
  heroBody: string;
  focus: string;
  changelog: Array<{
    title: string;
    detail: string;
  }>;
};

function buildVersion(seed: VersionSeed): LibraryVersion {
  const versionNumber = seed.slug.replace(/^v/, "");

  return {
    ...seed,
    install: {
      pip: `pip install onithrasml==${versionNumber}`,
      source: `pip install onithrasml==${versionNumber} --no-binary onithrasml`,
      nightly: "pip install onithrasml-nightly",
    },
    featureCards: [
      {
        title: "Simple and efficient",
        description:
          "Estimator-style APIs for preprocessing and predictive workflows, documented the way scientific Python libraries are meant to be read.",
      },
      {
        title: "Built on NumPy and SciPy",
        description:
          "Array-first inputs, leak-safe fit/transform splits, and a C++ backend for the numerical work users should not have to think about.",
      },
      {
        title: "Open source and versioned",
        description:
          "Every release has its own docs URL, install pin, changelog, and API surface so research and production stay aligned.",
      },
    ],
    stats: [
      {
        label: "Stable release",
        value: seed.label,
      },
      {
        label: "Focused module",
        value: "SimpeleImputer",
      },
      {
        label: "Core stack",
        value: "NumPy / SciPy / C++",
      },
    ],
    sections: [
      {
        id: "overview",
        eyebrow: "Overview",
        title: "Machine learning primitives with numerical discipline",
        description:
          `${seed.focus} This release keeps the story simple: fast preprocessing, predictable validation, and documentation that is easy to extend.`,
        bullets: [
          "Array-first APIs that stay close to NumPy conventions.",
          "Statistical preprocessing designed for training and inference separation.",
          "A premium docs shell that can scale from one class to a full ML toolkit.",
        ],
        metrics: [
          {
            label: "Release date",
            value: seed.releasedAt,
          },
          {
            label: "Documentation channel",
            value: seed.badge,
          },
          {
            label: "Primary audience",
            value: "Researchers + product engineers",
          },
        ],
      },
      {
        id: "install",
        eyebrow: "Setup",
        title: `Install ${seed.label} the way your team ships`,
        description:
          "The docs page exposes ready-to-run install commands for pinned releases, local source builds, and nightly validation.",
        codeSamples: [
          {
            label: "Pinned PyPI install",
            language: "bash",
            code: `# production-ready release\n${`pip install onithrasml==${versionNumber}`}`,
          },
          {
            label: "Compile the C++ backend locally",
            language: "bash",
            code: `# forces a local build for native acceleration\n${`pip install onithrasml==${versionNumber} --no-binary onithrasml`}`,
          },
          {
            label: "Nightly channel",
            language: "bash",
            code: "pip install onithrasml-nightly",
          },
        ],
        callout: {
          title: "How versioning works",
          body:
            "Add one new release object in src/data/libraryDocs.ts and the version rail, release cards, and docs body all update automatically.",
        },
      },
      {
        id: "quickstart",
        eyebrow: "Quickstart",
        title: "Impute missing values without leaking test information",
        description:
          "The first walkthrough mirrors the class you pasted: fit on known data, reuse the learned statistics, and keep the data pipeline deterministic.",
        codeSamples: [
          {
            label: "Python example",
            language: "python",
            code: quickstartSnippet,
          },
        ],
        callout: {
          title: "Leak-safe preprocessing",
          body:
            "Use fit only on training data. Run transform on validation and test sets so your statistics stay honest.",
        },
      },
      {
        id: "api",
        eyebrow: "API Reference",
        title: "SimpeleImputer surface area",
        description:
          "This section turns your current class shape into a clean reference block that is readable on both desktop and mobile web.",
        api: apiReference,
        bullets: [
          "statistics_ stores one learned value per column.",
          "is_fitted helps guard against accidental transform calls before training.",
          "Completely missing columns fall back to fill_value for constant mode or NaN otherwise.",
        ],
      },
      {
        id: "backend",
        eyebrow: "Architecture",
        title: "NumPy semantics with a native-performance story",
        description:
          "The site frames the C++ backend as an implementation strength while keeping the API narrative grounded in the Python layer users actually touch.",
        bullets: [
          "Column scans and statistical reductions can be documented as native kernels under the hood.",
          "SciPy compatibility can be introduced release by release without redesigning the site navigation.",
          "The layout is ready for future pages like LinearRegression, StandardScaler, or optimizers.",
        ],
        metrics: [
          {
            label: "Frontend stack",
            value: "React + Vite + React Router",
          },
          {
            label: "Search scope",
            value: "Sections + API signatures",
          },
          {
            label: "Responsive mode",
            value: "Desktop / tablet / mobile",
          },
        ],
      },
      {
        id: "versioning",
        eyebrow: "Versioning",
        title: "Ship new releases without touching the UI code",
        description:
          "The content layer is intentionally data-driven so you can grow this from one landing page into a full documentation system.",
        bullets: [
          "Duplicate an existing version object and change slug, label, date, summary, and release notes.",
          "Each release automatically appears in the top switcher and the timeline panel.",
          "Sections, install commands, and changelog cards update per version from the same source.",
        ],
        codeSamples: [
          {
            label: "Add another release",
            language: "ts",
            code: `{
  slug: "v1.3.0",
  label: "v1.3.0",
  badge: "Preview",
  releasedAt: "October 10, 2026",
  summary: "Describe what changed in the release.",
  heroTag: "New docs milestone",
  heroTitle: "What this version introduces",
  heroBody: "Short premium summary for the hero section.",
  focus: "Mention the module or subsystem you expanded.",
  changelog: [
    {
      title: "Feature title",
      detail: "One line describing the update."
    }
  ]
}`,
          },
        ],
      },
    ],
  };
}

export const libraryVersions: LibraryVersion[] = [
  buildVersion({
    slug: "v1.2.0",
    label: "v1.2.0",
    badge: "Latest",
    releasedAt: "August 24, 2026",
    summary:
      "Premium documentation shell with responsive layouts, version switching, searchable sections, and a polished API presentation.",
    heroTag: "User guide",
    heroTitle: "Machine learning primitives with numerical discipline",
    heroBody:
      "Simple and efficient tools for predictive data analysis. This user guide covers installation, a leak-safe quickstart, and the current SimpeleImputer API.",
    focus:
      "This version emphasizes a cleaner docs experience, stronger version discoverability, and a launch-grade presentation for your library.",
    changelog: [
      {
        title: "Responsive release navigator",
        detail:
          "Version switching is now wired into the route so every release has a dedicated URL.",
      },
      {
        title: "Searchable documentation surface",
        detail:
          "Readers can filter sections instantly without leaving the current version.",
      },
      {
        title: "Premium visual refresh",
        detail:
          "Glass panels, layered gradients, and editorial typography push the site beyond a default docs template.",
      },
    ],
  }),
  buildVersion({
    slug: "v1.1.0",
    label: "v1.1.0",
    badge: "Stable",
    releasedAt: "July 12, 2026",
    summary:
      "Refined preprocessing explanations and a clearer walkthrough for column-wise statistics.",
    heroTag: "Preprocessing refresh",
    heroTitle: "A cleaner story for missing-value handling",
    heroBody:
      "Version 1.1.0 sharpens the SimpeleImputer narrative with better installation guidance and more explicit fit-versus-transform messaging.",
    focus:
      "This release focuses on documentation clarity around preprocessing behavior, data validation, and attribute semantics.",
    changelog: [
      {
        title: "Expanded preprocessing notes",
        detail:
          "Column-wise statistics and missing-value rules are explained with more operational detail.",
      },
      {
        title: "Improved install guidance",
        detail:
          "Pinned install commands and local native build instructions are easier to scan.",
      },
      {
        title: "Stronger API reference cards",
        detail:
          "Method signatures and return semantics are separated into dedicated panels.",
      },
    ],
  }),
  buildVersion({
    slug: "v1.0.0",
    label: "v1.0.0",
    badge: "Foundation",
    releasedAt: "June 3, 2026",
    summary:
      "First public release of the docs baseline for the library's preprocessing module.",
    heroTag: "Initial release",
    heroTitle: "The first documented step for onithrasML",
    heroBody:
      "Version 1.0.0 establishes the first public-facing story for your library with installation, quickstart, and API reference essentials.",
    focus:
      "This release captures the foundational class behavior so you can confidently iterate on both the library and the docs together.",
    changelog: [
      {
        title: "Initial docs foundation",
        detail:
          "The first release documented installation, quickstart usage, and the preprocessing API surface.",
      },
      {
        title: "Version-ready content structure",
        detail:
          "The content model was designed to support future releases from day one.",
      },
      {
        title: "Native backend positioning",
        detail:
          "The docs started framing NumPy, SciPy, and C++ as one cohesive performance story.",
      },
    ],
  }),
];

export const latestVersion = libraryVersions[0];

export function getVersionBySlug(slug?: string) {
  return libraryVersions.find((item) => item.slug === slug);
}
