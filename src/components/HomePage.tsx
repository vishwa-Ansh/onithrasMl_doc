import { Link } from "react-router-dom";

import { latestVersion, libraryVersions } from "../data/libraryDocs";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

const capabilities = [
  {
    title: "Preprocessing",
    applications: "Missing values, scaling, feature cleanup.",
    algorithms: "SimpeleImputer, column-wise statistics, leak-safe transforms.",
  },
  {
    title: "Imputation",
    applications: "Repair incomplete tables before training.",
    algorithms: "Mean, median, most frequent, and constant fill strategies.",
  },
  {
    title: "Array-first APIs",
    applications: "Stay close to NumPy conventions.",
    algorithms: "fit / transform estimators that accept ndarray inputs.",
  },
  {
    title: "Native acceleration",
    applications: "Keep Python syntax with compiled speed.",
    algorithms: "C++ kernels under a SciPy-friendly Python layer.",
  },
  {
    title: "Model-ready pipelines",
    applications: "Prepare data without leaking test information.",
    algorithms: "Fit on train, transform on validation and test sets.",
  },
  {
    title: "Open source",
    applications: "Reusable in research and production.",
    algorithms: "BSD-style licensing, versioned docs, and a public API surface.",
  },
];

const principles = [
  {
    title: "Simple and efficient",
    body: "Predictive tools that stay small, readable, and fast enough for real workflows.",
  },
  {
    title: "Broadly applicable",
    body: "The same estimator pattern works for research notebooks and production jobs.",
  },
  {
    title: "Foundational",
    body: "Built on NumPy and SciPy, with a C++ backend for the heavy numerical work.",
  },
  {
    title: "Easy to use",
    body: "High-level Python APIs with documentation that looks like the scientific Python stack.",
  },
];

export function HomePage() {
  return (
    <div className="site-shell">
      <SiteHeader />

      <section className="home-hero">
        <div className="home-hero-inner">
          <p className="hero-kicker">onithrasML</p>
          <h1>Machine learning in Python</h1>
          <p className="hero-lead">
            Simple and efficient tools for predictive data analysis. Accessible to everybody,
            reusable in research and production, and built on NumPy, SciPy, and C++.
          </p>
          <ul className="hero-points">
            <li>Simple and efficient tools for predictive data analysis</li>
            <li>Accessible to everybody, and reusable in various contexts</li>
            <li>Built on NumPy, SciPy, and a native C++ backend</li>
            <li>Open source, commercially usable — BSD license</li>
          </ul>
          <div className="hero-actions">
            <Link className="btn btn-primary" to={`/docs/${latestVersion.slug}#quickstart`}>
              Getting started
            </Link>
            <Link className="btn btn-secondary" to={`/docs/${latestVersion.slug}`}>
              User guide
            </Link>
            <code className="install-chip">{latestVersion.install.pip}</code>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="section-heading">
          <p>What it does</p>
          <h2>Core capabilities</h2>
        </div>
        <div className="capability-grid">
          {capabilities.map((item) => (
            <article className="capability-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>
                <strong>Applications:</strong> {item.applications}
              </p>
              <p>
                <strong>Algorithms:</strong> {item.algorithms}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="home-section home-section-alt">
        <div className="section-heading">
          <p>Why onithrasML</p>
          <h2>Fundamental algorithms for scientific computing</h2>
        </div>
        <div className="principle-grid">
          {principles.map((item) => (
            <article className="principle-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="home-section">
        <div className="home-split">
          <div>
            <div className="section-heading">
              <p>News</p>
              <h2>Latest releases</h2>
            </div>
            <ul className="news-list">
              {libraryVersions.map((release) => (
                <li key={release.slug}>
                  <Link to={`/docs/${release.slug}`}>
                    <strong>
                      {release.releasedAt}. {release.label}
                    </strong>
                    <span>{release.summary}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <aside className="community-card">
            <p className="section-kicker">Community</p>
            <h2>Who uses onithrasML?</h2>
            <blockquote>
              “Array-first APIs that stay close to NumPy conventions, with documentation that
              feels like the rest of the scientific Python stack.”
            </blockquote>
            <p>
              onithrasML is made possible by researchers and engineers who want sklearn-style
              estimators with SciPy-grade numerical foundations.
            </p>
            <Link className="btn btn-primary" to={`/docs/${latestVersion.slug}#api`}>
              Browse the API
            </Link>
          </aside>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
