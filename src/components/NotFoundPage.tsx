import { Link } from "react-router-dom";

import { latestVersion } from "../data/libraryDocs";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

export function NotFoundPage() {
  return (
    <div className="site-shell">
      <SiteHeader compact />
      <section className="not-found">
        <p className="section-kicker">404</p>
        <h1>This documentation page does not exist.</h1>
        <p>
          The route was not found. Open the latest onithrasML release or return to the homepage.
        </p>
        <div className="hero-actions">
          <Link className="btn btn-primary" to={`/docs/${latestVersion.slug}`}>
            Open latest release
          </Link>
          <Link className="btn btn-secondary" to="/">
            Back to home
          </Link>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
