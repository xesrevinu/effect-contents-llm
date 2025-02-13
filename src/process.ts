import fs from 'node:fs';
import path from 'node:path';
import { glob } from 'glob';
import prettyBytes from 'pretty-bytes';
import { encode } from 'gpt-tokenizer';

interface DocConfig {
  title: string;
  originUrl: string;
  pattern: string[];
}

interface FileTypeStats {
  extension: string;
  count: number;
  size: number;
  tokens: number;
}

interface ProcessResult {
  type: string;
  stats: FileStats[];
  totalSize: number;
  totalTokens: number;
  content: string;
  fileTypes: Map<string, FileTypeStats>; 
}

interface GrandTotal {
  size: number;
  tokens: number;
  files: number;
}

const DOC_TYPES: DocConfig[] = [
  {
    title: 'Website Documentation',
    originUrl: "https://effect.website/docs",
    pattern: [
      'output/docs.*'
    ]
  },
  {
    title: 'API Documentation',
    originUrl: "https://effect.website",
    pattern: [
      'output/api.*'
    ]
  },
  {
    title: 'Module Documentation',
    originUrl: "https://effect.website",
    pattern: [
      'output/module.*'
    ]
  }
];

function processContent(filePath: string, content: string, extension: string): string {
  switch (extension) {
    case '.json':
      try {
        const jsonParts = content.split(/^#.*\.json$/gm)
          .map(part => part.trim())
          .filter(part => part.length > 0);

        if (jsonParts.length === 0) {
          console.warn(`No valid JSON parts found in ${filePath}`);
          return content;
        }

        const jsonObjects = [];
        for (const part of jsonParts) {
          try {
            const obj = JSON.parse(part);
            jsonObjects.push(obj);
          } catch (parseError) {
            console.error(`Error parsing JSON part in ${filePath}:`, parseError);
            console.error('Problematic content:', part.substring(0, 100) + '...');
          }
        }

        if (jsonObjects.length === 0) {
          console.warn(`No valid JSON objects parsed from ${filePath}`);
          return content;
        }

        const jsonContent = JSON.stringify(jsonObjects, null, 2);
        try {
          fs.writeFileSync(`output/${filePath}`, jsonContent);
        } catch (writeError) {
          console.error(`Error writing processed JSON to ${filePath}:`, writeError);
        }

        return jsonContent;
      } catch (error) {
        console.error(`Error processing JSON file ${filePath}:`, error);
        return content;
      }
    default:
      return content;
  }
}

class FileStats {
  public path: string;
  public size: number;
  public tokens: number;
  public content: string;
  public extension: string;
  public originUrl: string;

  constructor(filePath: string, content: string, originUrl: string) {
    this.path = filePath;
    this.extension = path.extname(filePath).toLowerCase();
    
    this.content = processContent(filePath, content, this.extension);
    
    this.size = Buffer.byteLength(this.content);
    this.tokens = encode(this.content).length;
    this.originUrl = originUrl;

    console.log(`File stats for ${filePath}:`, {
      size: prettyBytes(this.size),
      tokens: this.tokens,
      extension: this.extension
    });
  }

  toMarkdown(): string {
    return `| ${this.path} | ${prettyBytes(this.size)} | ${this.tokens.toLocaleString()} | [${this.originUrl}](${this.originUrl})`;
  }
}

async function processDocType(docConfig: DocConfig, index: number): Promise<ProcessResult> {
  const stats: FileStats[] = [];
  const fileTypes = new Map<string, FileTypeStats>();
  let totalSize = 0;
  let totalTokens = 0;

  for (const pattern of docConfig.pattern) {
    console.log(`Searching for files with pattern: ${pattern}`);
    const files = await glob(pattern);
    console.log(`Found ${files.length} files:`, files);

    for (const file of files) {
      try {
        console.log(`Processing file: ${file}`);
        const content = fs.readFileSync(file, 'utf8');
        const fileStats = new FileStats(path.basename(file), content, docConfig.originUrl);
        stats.push(fileStats);
        totalSize += fileStats.size;
        totalTokens += fileStats.tokens;

        const typeStats = fileTypes.get(fileStats.extension) || {
          extension: fileStats.extension,
          count: 0,
          size: 0,
          tokens: 0
        };
        typeStats.count++;
        typeStats.size += fileStats.size;
        typeStats.tokens += fileStats.tokens;
        fileTypes.set(fileStats.extension, typeStats);

        console.log(`File stats:`, {
          path: fileStats.path,
          size: prettyBytes(fileStats.size),
          tokens: fileStats.tokens,
          extension: fileStats.extension
        });
      } catch (error) {
        console.error(`Error processing file ${file}:`, error);
      }
    }
  }

  return {
    type: index.toString(),
    stats,
    totalSize,
    totalTokens,
    content: stats.map(s => s.content).join('\n\n'),
    fileTypes
  };
}

function generateReport(results: ProcessResult[]): string {
  let report = `## Documentation Statistics\n\n`;
  
  const grandTotal = results.reduce<GrandTotal>((acc, r) => ({
    size: acc.size + r.totalSize,
    tokens: acc.tokens + r.totalTokens,
    files: acc.files + r.stats.length
  }), { size: 0, tokens: 0, files: 0 });

  const allFileTypes = new Map<string, FileTypeStats>();
  for (const result of results) {
    for (const [ext, stats] of result.fileTypes) {
      const existing = allFileTypes.get(ext) || {
        extension: ext,
        count: 0,
        size: 0,
        tokens: 0
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

  report += `### File Types\n\n`;
  report += `| Extension | Count | Size | Tokens | Origin URL |\n`;
  report += `|-----------|-------|------|--------|-----------|\n`;
  for (const [ext, stats] of allFileTypes.entries()) {
    const docConfig = DOC_TYPES.find(doc => 
      doc.pattern.some(p => p.endsWith(ext))
    ) || DOC_TYPES[0];
    report += `| ${stats.extension || '(none)'} | ${stats.count} | ${prettyBytes(stats.size)} | ${stats.tokens.toLocaleString()} | [${docConfig.originUrl}](${docConfig.originUrl}) |\n`;
  }
  report += '\n';

  for (let i = 0; i < results.length; i++) {
    const result = results[i];
    const docConfig = DOC_TYPES[i];
    
    report += `### ${docConfig.title}\n\n`;
    report += `- Files: ${result.stats.length}\n`;
    report += `- Size: ${prettyBytes(result.totalSize)}\n`;
    report += `- Tokens: ${result.totalTokens.toLocaleString()}\n\n`;

    if (result.stats.length > 0) {
      report += `#### File Types\n\n`;
      report += `| Extension | Count | Size | Tokens |\n`;
      report += `|-----------|-------|------|--------|\n`;
      for (const stats of result.fileTypes.values()) {
        report += `| ${stats.extension || '(none)'} | ${stats.count} | ${prettyBytes(stats.size)} | ${stats.tokens.toLocaleString()} |\n`;
      }
      report += '\n';

      report += `#### Files\n\n`;
      report += `| File | Size | Tokens | Origin URL |\n`;
      report += `|------|------|--------|----------|\n`;
      report += result.stats.map(s => s.toMarkdown()).join('\n');
      report += '\n\n';
    }
  }

  return report;
}

function updateReadme(statsContent: string): void {
  const readmePath = 'README.md';
  let readmeContent = fs.readFileSync(readmePath, 'utf8');

  const statsStartMarker = '<!-- STATS_START -->';
  const statsEndMarker = '<!-- STATS_END -->';
  
  const startIndex = readmeContent.indexOf(statsStartMarker);
  const endIndex = readmeContent.indexOf(statsEndMarker);

  if (startIndex === -1 || endIndex === -1) {
    readmeContent += `\n${statsStartMarker}\n${statsContent}\n${statsEndMarker}\n`;
  } else {
    readmeContent = 
      readmeContent.substring(0, startIndex + statsStartMarker.length) +
      '\n' + statsContent + '\n' +
      readmeContent.substring(endIndex);
  }

  fs.writeFileSync(readmePath, readmeContent);
}

async function main(): Promise<void> {
  try {
    console.log('Starting documentation processing...');
    
    const results = await Promise.all(
      DOC_TYPES.map((config, index) => {
        console.log(`Processing ${config.title}...`);
        return processDocType(config, index);
      })
    );

    console.log('Generating statistics report...');
    const statsReport = generateReport(results);
    
    console.log('Updating README.md...');
    updateReadme(statsReport);

    console.log('Documentation processing completed successfully.');
  } catch (error) {
    console.error('Error processing documentation:', error);
    process.exit(1);
  }
}

main().catch(console.error); 