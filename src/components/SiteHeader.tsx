import { Link, NavLink } from "react-router-dom";

import { latestVersion } from "../data/libraryDocs";

type SiteHeaderProps = {
  compact?: boolean;
};

export function SiteHeader({ compact = false }: SiteHeaderProps) {
  return (
    <header className={`site-header${compact ? " is-compact" : ""}`}>
      <div className="site-header-inner">
        <a className="logo-lockup" href="/">
          <span className="logo-mark" aria-hidden="true">
            <svg viewBox="0 0 40 40" role="img">
              <circle cx="20" cy="20" r="18" fill="#F7931E" />
              <path
                d="M11 25c3.2-8.4 7.1-12.6 11.8-12.6 3.2 0 5.4 2.1 5.4 5.1 0 6.4-8.7 8.1-8.7 12.3"
                fill="none"
                stroke="#fff"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
              <circle cx="25.4" cy="31.2" r="1.8" fill="#fff" />
            </svg>
          </span>
          <span className="logo-text">
            <strong>onithrasML</strong>
            <em>Machine learning in Python</em>
          </span>
        </a>

        <nav className="site-nav" aria-label="Primary">
          <a href="/">
            Home
          </a>
          {/* <h1>{latestVersion.slug}</h1> */}
          <a href={`/docs/${latestVersion.slug}#install`}>
  Install
</a>
          <a href='/docs/'>
            User guide
          </a>
          <a href={`/docs/${latestVersion.slug}#api`}>
            API
          </a>
          <a href="https://github.com" rel="noreferrer" target="_blank">
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}
