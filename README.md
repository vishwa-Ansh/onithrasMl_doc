# onithrasML Docs

Premium documentation website for `onithrasML`, built with React, TypeScript, Vite, and React Router.

## Run locally

```bash
npm install
npm run dev
```

## Deployment note

Because version pages use routes like `/docs/v1.2.0`, configure your host with SPA fallback to `index.html` so refreshes and deep links keep working.

## What is included

- Responsive premium landing page for the docs
- Version switcher with dedicated routes like `/docs/v1.2.0`
- Search across sections and API notes
- API reference cards for `SimpeleImputer`
- Release timeline and per-version changelog
- Data-driven content structure for future releases

## Add a new version

Open [src/data/libraryDocs.ts](/Users/vishwaansh/onithresAi/src/data/libraryDocs.ts) and add another `buildVersion(...)` entry to `libraryVersions`.

The new version will automatically:

- appear in the version switcher
- get its own route
- show up in the release timeline
- render its own install commands, sections, and changelog
# onithrasMl_doc
