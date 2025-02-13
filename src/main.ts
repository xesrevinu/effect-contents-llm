import { run } from "./process.ts";
import type { RemoteSource } from "./types.ts";

const SOURCES: RemoteSource[] = [
  {
    name: "effect-website",
    url: "https://github.com/Effect-TS/website.git",
    resources: [
      {
        name: "website-docs",
        include: "content/src/content/docs/docs/**/*.{md,mdx}",
      },
    ],
  },
  {
    name: "effect-io-ai",
    url: "https://github.com/tim-smart/effect-io-ai.git",
    resources: [
      {
        name: "effect-api",
        include: "effect/**/*.{md,mdx}",
      },
      {
        name: "effect-modules",
        include: "json/_all.json",
      },
    ],
  },
  {
    name: "effect",
    url: "https://github.com/Effect-TS/effect.git",
    resources: [
      {
        name: "effect-core",
        include: "packages/effect/README.md",
      },
      {
        name: "effect-ai",
        include: ["packages/ai/ai/README.md", "packages/ai/ai-*/README.md"],
      },
      {
        name: "effect-cli",
        include: "packages/cli/README.md",
      },
      {
        name: "printer",
        include: "packages/printer/README.md",
      },
      {
        name: "effect-experimental",
        include: "packages/experimental/README.md",
      },
      {
        name: "effect-opentelemetry",
        include: "packages/opentelemetry/README.md",
      },
      {
        name: "effect-platform",
        include: [
          "packages/platform/README.md",
          "packages/platform-*/README.md",
        ],
      },
      {
        name: "effect-rpc",
        include: ["packages/rpc/README.md", "packages/rpc-*/README.md"],
      },
      {
        name: "effect-sql",
        include: ["packages/sql/README.md", "packages/sql-*/README.md"],
      },
      {
        name: "effect-typeclass",
        include: "packages/typeclass/README.md",
      },
      {
        name: "effect-vitest",
        include: "packages/vitest/README.md",
      },
    ],
  },
];

run(SOURCES).catch(console.error);
