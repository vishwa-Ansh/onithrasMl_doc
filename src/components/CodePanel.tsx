import { useState } from "react";

type CodePanelProps = {
  label: string;
  language: string;
  code: string;
};

export function CodePanel({ label, language, code }: CodePanelProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      if (!navigator.clipboard?.writeText) {
        return;
      }

      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="code-panel">
      <div className="code-panel-header">
        <div>
          <p className="code-panel-label">{label}</p>
          <p className="code-panel-language">{language}</p>
        </div>
        <button className="code-copy-button" onClick={handleCopy} type="button">
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      <pre className="code-block">
        <code>{code}</code>
      </pre>
    </div>
  );
}
