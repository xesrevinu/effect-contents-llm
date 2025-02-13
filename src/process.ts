import fs from "node:fs";
import path from "node:path";
import { glob } from "glob";
import prettyBytes from "pretty-bytes";
import { encode } from "gpt-tokenizer";
import { addSubmodule, initSubmodules, runYek, buildTable } from "./utils.ts";
import type {
  RemoteSource,
  ProcessedResource,
  GrandTotal,
  FileTypeStats,
  Resource,
} from "./types.ts";

const GITHUB_REPO = "https://github.com/xesrevinu/effect-contents-llm";
const GITHUB_RAW =
  "https://raw.githubusercontent.com/xesrevinu/effect-contents-llm/main";

class FileStats {
  public path: string;
  public size: number;
  public tokens: number;
  public content: string;
  public extension: string;
  public originUrl: string;
  public githubUrl: string;
  public rawUrl: string;

  constructor(filePath: string, content: string, originUrl: string) {
    this.path = filePath;
    this.extension = path.extname(filePath).toLowerCase();
    this.content = content;
    this.size = Buffer.byteLength(this.content);
    this.tokens = encode(this.content).length;
    this.originUrl = originUrl;
    this.githubUrl = `${GITHUB_REPO}/blob/main/${filePath}`;
    this.rawUrl = `${GITHUB_RAW}/${filePath}`;
  }
}

function generateReport(results: ProcessedResource[]): string {
  let report = `## Documentation Statistics\n\n`;

  const grandTotal = results.reduce<GrandTotal>(
    (acc, r) => ({
      size: acc.size + r.totalSize,
      tokens: acc.tokens + r.totalTokens,
      files: acc.files + r.files.length,
    }),
    { size: 0, tokens: 0, files: 0 }
  );

  const allFileTypes = new Map<string, FileTypeStats>();
  for (const result of results) {
    for (const [ext, stats] of result.fileTypes) {
      const existing = allFileTypes.get(ext) || {
        extension: ext,
        count: 0,
        size: 0,
        tokens: 0,
      };
      existing.count += stats.count;
      existing.size += stats.size;
      existing.tokens += stats.tokens;
      allFileTypes.set(ext, existing);
    }
  }

  report += `### Summary\n\n`;
  report += `- Total Files: ${grandTotal.files}\n`;
  report += `- Total Size: ${prettyBytes(grandTotal.size)}\n`;
  report += `- Total Tokens: ${grandTotal.tokens.toLocaleString()}\n\n`;

  for (let i = 0; i < results.length; i++) {
    const result = results[i];

    report += `### ${result.name}\n\n`;
    report += `- Files: ${result.files.length}\n`;
    report += `- Size: ${prettyBytes(result.totalSize)}\n`;
    report += `- Tokens: ${result.totalTokens.toLocaleString()}\n\n`;

    if (result.files.length > 0) {
      report += `#### Files\n\n`;
      const fileColumns = [
        {
          header: "File",
          render: (file: FileStats) => `[${file.path}](${file.githubUrl})`,
        },
        {
          header: "Size",
          render: (file: FileStats) => prettyBytes(file.size),
        },
        {
          header: "Tokens",
          render: (file: FileStats) => file.tokens.toLocaleString(),
        },
        {
          header: "Raw",
          render: (file: FileStats) => `[Raw](${file.rawUrl})`,
        },
      ];

      report += buildTable<FileStats>(fileColumns, result.files) + "\n\n";
    }
  }

  return report;
}

function updateReadme(statsContent: string): void {
  const readmePath = "README.md";
  let readmeContent = fs.readFileSync(readmePath, "utf8");

  const statsStartMarker = "<!-- STATS_START -->";
  const statsEndMarker = "<!-- STATS_END -->";

  const startIndex = readmeContent.indexOf(statsStartMarker);
  const endIndex = readmeContent.indexOf(statsEndMarker);

  if (startIndex === -1 || endIndex === -1) {
    readmeContent += `\n${statsStartMarker}\n${statsContent}\n${statsEndMarker}\n`;
  } else {
    readmeContent =
      readmeContent.substring(0, startIndex + statsStartMarker.length) +
      "\n" +
      statsContent +
      "\n" +
      readmeContent.substring(endIndex);
  }

  fs.writeFileSync(readmePath, readmeContent);
}

function updateFileTypeStats(
  fileTypes: Map<string, FileTypeStats>,
  fileStats: FileStats
): void {
  const typeStats = fileTypes.get(fileStats.extension) || {
    extension: fileStats.extension,
    count: 0,
    size: 0,
    tokens: 0,
  };

  typeStats.count++;
  typeStats.size += fileStats.size;
  typeStats.tokens += fileStats.tokens;
  fileTypes.set(fileStats.extension, typeStats);
}

async function processResource(
  source: RemoteSource,
  resource: Resource
): Promise<ProcessedResource> {
  try {
    const pwd = process.cwd();
    const repoPath = path.join(pwd, "sources", source.name);

    if (!fs.existsSync(repoPath)) {
      throw new Error(`Repository path does not exist: ${repoPath}`);
    }

    const files = await glob(resource.pattern, {
      cwd: repoPath,
      absolute: true,
      nodir: true,
      ignore: ["node_modules/**"],
    });

    const stats: FileStats[] = [];
    const fileTypes = new Map<string, FileTypeStats>();
    let totalSize = 0;
    let totalTokens = 0;

    console.log(`Processing resource: ${resource.name}`);
    console.log(`Repository path: ${repoPath}`);
    console.log(`Pattern: ${resource.pattern}`);
    console.log(`Files found:`, files.length);

    if (files.length > 0) {
      const outputFile = path.join("output", `${resource.name}.txt`);

      await runYek(files, outputFile);

      let outputContent = fs.readFileSync(outputFile, "utf8");
      if (source.transform) {
        outputContent = source.transform(outputContent);
      }

      const fileStats = new FileStats(outputFile, outputContent, source.url);
      stats.push(fileStats);
      totalSize += fileStats.size;
      totalTokens += fileStats.tokens;
      updateFileTypeStats(fileTypes, fileStats);
    }

    return {
      name: resource.name,
      files: stats,
      totalSize,
      totalTokens,
      fileTypes,
    };
  } catch (error) {
    console.error(
      `Failed to process resource ${resource.name} from ${source.name}:`,
      error
    );
    throw error;
  }
}

const SOURCES: RemoteSource[] = [
  {
    name: "effect-website",
    url: "https://github.com/Effect-TS/website.git",
    resources: [
      {
        name: "website-docs",
        pattern: "content/src/content/docs/docs/**/*.{md,mdx}",
      },
    ],
  },
  {
    name: "effect-io-ai",
    url: "https://github.com/tim-smart/effect-io-ai.git",
    resources: [
      {
        name: "effect-api",
        pattern: "effect/**/*.{md,mdx}",
      },
      {
        name: "effect-module",
        pattern: "json/_all.json",
      },
    ],
  },
];

async function main(): Promise<void> {
  try {
    console.log("Starting documentation processing...");

    if (!fs.existsSync("output")) {
      fs.mkdirSync("output", { recursive: true });
    }

    if (!fs.existsSync("sources")) {
      fs.mkdirSync("sources", { recursive: true });
    }

    await initSubmodules();

    for (const source of SOURCES) {
      await addSubmodule(source.url, source.name);
    }

    const results: ProcessedResource[] = [];
    for (const source of SOURCES) {
      for (const resource of source.resources) {
        const result = await processResource(source, resource);
        results.push(result);
      }
    }

    console.log("Generating statistics report...");
    const statsReport = generateReport(results);

    console.log("Updating README.md...");
    updateReadme(statsReport);

    console.log("Documentation processing completed successfully.");
  } catch (error) {
    console.error("Error processing documentation:", error);
    process.exit(1);
  }
}

main().catch(console.error);
