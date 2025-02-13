import { promisify } from "util";
import { exec } from "child_process";
import fs from "node:fs";
import type { YekConfig } from "./types";

export const execAsync = promisify(exec);

export async function initSubmodules(): Promise<void> {
  // Initialize submodules if not already initialized
  if (!fs.existsSync(".gitmodules")) {
    await execAsync("git submodule init");
  }
}

export async function addSubmodule(url: string, name: string): Promise<void> {
  const fullPath = `sources/${name}`;

  if (!fs.existsSync(fullPath)) {
    console.log(`Adding submodule ${name}...`);
    await execAsync(`git submodule add ${url} ${fullPath}`);
  }
}

export async function runYek(
  files: string[],
  outputFile: string
): Promise<void> {
  const command = `yek ${files.join(
    " "
  )} --output-template 'FILE_PATH\nFILE_CONTENT' > ${outputFile}`;

  try {
    console.log(`Running yek...`);
    await execAsync(command);
    console.log(`Yek processing completed`);
  } catch (error) {
    console.error(`Error running yek:`, error);
    throw error;
  }
}

interface TableColumn<T> {
  header: string;
  key?: keyof T | (string & {});
  render?: (item: T) => string;
}

export function buildTable<T>(
  columns: TableColumn<T>[],
  data: T[],
  options: { alignments?: Array<"left" | "center" | "right"> } = {}
): string {
  // 构建表头
  const headers = columns.map((col) => col.header);
  let table = `| ${headers.join(" | ")} |\n`;

  // 构建对齐行
  const alignments = options.alignments || columns.map(() => "left");
  const alignRow = alignments.map((align) => {
    switch (align) {
      case "center":
        return ":---:";
      case "right":
        return "---:";
      default:
        return "---";
    }
  });
  table += `| ${alignRow.join(" | ")} |\n`;

  // 构建数据行
  const rows = data.map((item) => {
    const cells = columns.map((col) => {
      if (col.render) {
        return col.render(item);
      }
      if (col.key) {
        return String(item[col.key as keyof T]);
      }
      return "";
    });
    return `| ${cells.join(" | ")} |`;
  });

  table += rows.join("\n");
  return table;
}
