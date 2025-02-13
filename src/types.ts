export interface YekConfig {
  configFile?: string;
  outputTemplate?: string;
  outputFile?: string;
}

export interface RemoteSource {
  name: string;
  url: string;
  resources: Resource[];
  transform?: (content: string) => string;
}

export interface Resource {
  name: string;
  pattern: string;
}

export interface ProcessedResource {
  name: string;
  files: FileStats[];
  totalSize: number;
  totalTokens: number;
  fileTypes: Map<string, FileTypeStats>;
}

export interface FileStats {
  path: string;
  size: number;
  tokens: number;
  content: string;
  extension: string;
  originUrl: string;
  githubUrl: string;
  rawUrl: string;
}

export interface FileTypeStats {
  extension: string;
  count: number;
  size: number;
  tokens: number;
}

export interface ProcessResult {
  type: string;
  stats: FileStats[];
  totalSize: number;
  totalTokens: number;
  content: string;
  fileTypes: Map<string, FileTypeStats>;
}

export interface GrandTotal {
  size: number;
  tokens: number;
  files: number;
}
