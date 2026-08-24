import { Link } from "react-router-dom";

import { latestVersion } from "../data/libraryDocs";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div>
          <p className="footer-brand">onithrasML</p>
          <p>
            Simple and efficient tools for predictive data analysis. Built on NumPy, SciPy,
            and a native C++ backend.
          </p>
        </div>
        <div>
          <p className="footer-heading">Documentation</p>
          <Link to={`/docs/${latestVersion.slug}`}>User guide</Link>
          <Link to={`/docs/${latestVersion.slug}#api`}>API reference</Link>
          <Link to={`/docs/${latestVersion.slug}#install`}>Installation</Link>
        </div>
        <div>
          <p className="footer-heading">Community</p>
          <a href="https://github.com" rel="noreferrer" target="_blank">
            Source on GitHub
          </a>
          <a href="https://pypi.org/project/onithrasml/" rel="noreferrer" target="_blank">
            PyPI
          </a>
          <span>BSD-licensed, commercially usable</span>
        </div>
      </div>
      <p className="footer-note">
        Inspired by the scientific Python stack: scikit-learn, SciPy, and NumPy.
      </p>
    </footer>
  );
}
