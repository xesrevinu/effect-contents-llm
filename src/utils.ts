import { promisify } from "util";
import { exec } from "child_process";
import fs from "node:fs";
import type { YekConfig } from "./types";

export const execAsync = promisify(exec);

export async function initSubmodules(): Promise<void> {
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

const DefaultBatchSize = process.env.CI ? 50 : 100;

export async function runYek(
  files: string[],
  outputFile: string,
  batchSize = DefaultBatchSize
): Promise<void> {
  console.log(`Processing ${files.length} files in batches of ${batchSize}...`);

  // Create or clear the output file
  fs.writeFileSync(outputFile, "");

  // Process files in batches
  for (let i = 0; i < files.length; i += batchSize) {
    const batch = files.slice(i, i + batchSize);
    const tempOutput = `${outputFile}.temp`;

    const command = `yek ${batch.join(
      " "
    )} --output-template 'FILE_PATH\nFILE_CONTENT' > ${tempOutput}`;

    try {
      console.log(
        `Processing batch ${i / batchSize + 1}/${Math.ceil(
          files.length / batchSize
        )}...`
      );
      await execAsync(command);

      // Append the temp file content to the main output file
      const content = fs.readFileSync(tempOutput, "utf8");
      fs.appendFileSync(outputFile, content);

      // Clean up temp file
      fs.unlinkSync(tempOutput);
    } catch (error) {
      console.error(`Error processing batch ${i / batchSize + 1}:`, error);
      throw error;
    }
  }

  console.log(`Yek processing completed`);
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
  const headers = columns.map((col) => col.header);
  let table = `| ${headers.join(" | ")} |\n`;

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
