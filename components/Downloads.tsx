"use client";

import { Cards } from "nextra/components";

function DownloadIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

export default function Downloads() {
  return (
    <Cards>
      <Cards.Card
        icon={<DownloadIcon />}
        title="Barqaror relizlar: so'nggi build"
        href="https://hydra.xinux.uz/jobset/installer/stable/latest-eval"
      />
      <Cards.Card
        icon={<DownloadIcon />}
        title="Nostabil relizlar: so'nggi build"
        href="https://hydra.xinux.uz/jobset/installer/unstable/latest-eval"
      />
    </Cards>
  );
}
