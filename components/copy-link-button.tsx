// components/copy-link-button.tsx
"use client";

import { useState } from "react";

export function CopyLinkButton({ publicToken }: { publicToken: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    const link = `${window.location.origin}/convite/${publicToken}`;

    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="rounded-md border px-3 py-1 text-sm hover:bg-gray-50"
    >
      {copied ? "Copiado!" : "Copiar link"}
    </button>
  );
}