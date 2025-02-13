# Effect Documentation Processor

This project processes and combines documentation from various Effect sources, making them more accessible for LLM processing. It handles documentation from:

- [Effect Website Documentation](https://github.com/Effect-TS/website)
- [Effect-IO-AI Documentation](https://github.com/tim-smart/effect-io-ai)

## Features

- Processes and combines multiple documentation sources:
  - Official Effect documentation from the website
  - API documentation from effect-io-ai
  - Module documentation from effect-io-ai
- Uses [yek](https://github.com/bodo-run/yek) for efficient file processing
- Generates comprehensive statistics for each documentation type
- Calculates token counts for LLM processing
- Maintains organized output structure
- Supports both Markdown and JSON formats

## Prerequisites

- Node.js 18+
- pnpm
- Git (for submodules)
- [yek](https://github.com/bodo-run/yek) - A fast Rust-based tool for serializing text files

## Installation

1. Clone the repository:
```bash
git clone https://github.com/xesrevinu/effect-contents-llm.git
cd effect-contents-llm
```

2. Install dependencies:
```bash
pnpm install
```

3. Install yek:
```bash
# Unix-like Systems (macOS, Linux)
curl -fsSL https://bodo.run/yek.sh | bash
```

4. Initialize submodules:
```bash
pnpm run init
```

## Usage

### Basic Usage

Build all documentation:
```bash
pnpm run build
```

This will:
1. Process documentation from all sources
2. Generate statistics
3. Update this README with current statistics

<!-- STATS_START -->
## Documentation Statistics

### Summary

- Total Files: 14
- Total Size: 9.35 MB
- Total Tokens: 2,564,394

### website-docs

- Files: 1
- Size: 1.48 MB
- Tokens: 345,030

#### Files

| File | Size | Tokens | Raw |
| --- | --- | --- | --- |
| [output/website-docs.txt](https://github.com/xesrevinu/effect-contents-llm/blob/main/output/website-docs.txt) | 1.48 MB | 345,030 | [Raw](https://raw.githubusercontent.com/xesrevinu/effect-contents-llm/main/output/website-docs.txt) |

### effect-api

- Files: 1
- Size: 2.34 MB
- Tokens: 646,373

#### Files

| File | Size | Tokens | Raw |
| --- | --- | --- | --- |
| [output/effect-api.txt](https://github.com/xesrevinu/effect-contents-llm/blob/main/output/effect-api.txt) | 2.34 MB | 646,373 | [Raw](https://raw.githubusercontent.com/xesrevinu/effect-contents-llm/main/output/effect-api.txt) |

### effect-modules

- Files: 1
- Size: 5.26 MB
- Tokens: 1,511,620

#### Files

| File | Size | Tokens | Raw |
| --- | --- | --- | --- |
| [output/effect-modules.txt](https://github.com/xesrevinu/effect-contents-llm/blob/main/output/effect-modules.txt) | 5.26 MB | 1,511,620 | [Raw](https://raw.githubusercontent.com/xesrevinu/effect-contents-llm/main/output/effect-modules.txt) |

### effect-core

- Files: 1
- Size: 2.68 kB
- Tokens: 473

#### Files

| File | Size | Tokens | Raw |
| --- | --- | --- | --- |
| [output/effect-core.txt](https://github.com/xesrevinu/effect-contents-llm/blob/main/output/effect-core.txt) | 2.68 kB | 473 | [Raw](https://raw.githubusercontent.com/xesrevinu/effect-contents-llm/main/output/effect-core.txt) |

### effect-ai

- Files: 1
- Size: 17 B
- Tokens: 8

#### Files

| File | Size | Tokens | Raw |
| --- | --- | --- | --- |
| [output/effect-ai.txt](https://github.com/xesrevinu/effect-contents-llm/blob/main/output/effect-ai.txt) | 17 B | 8 | [Raw](https://raw.githubusercontent.com/xesrevinu/effect-contents-llm/main/output/effect-ai.txt) |

### effect-cli

- Files: 1
- Size: 48.6 kB
- Tokens: 10,885

#### Files

| File | Size | Tokens | Raw |
| --- | --- | --- | --- |
| [output/effect-cli.txt](https://github.com/xesrevinu/effect-contents-llm/blob/main/output/effect-cli.txt) | 48.6 kB | 10,885 | [Raw](https://raw.githubusercontent.com/xesrevinu/effect-contents-llm/main/output/effect-cli.txt) |

### printer

- Files: 1
- Size: 11 kB
- Tokens: 2,279

#### Files

| File | Size | Tokens | Raw |
| --- | --- | --- | --- |
| [output/printer.txt](https://github.com/xesrevinu/effect-contents-llm/blob/main/output/printer.txt) | 11 kB | 2,279 | [Raw](https://raw.githubusercontent.com/xesrevinu/effect-contents-llm/main/output/printer.txt) |

### effect-experimental

- Files: 1
- Size: 152 B
- Tokens: 34

#### Files

| File | Size | Tokens | Raw |
| --- | --- | --- | --- |
| [output/effect-experimental.txt](https://github.com/xesrevinu/effect-contents-llm/blob/main/output/effect-experimental.txt) | 152 B | 34 | [Raw](https://raw.githubusercontent.com/xesrevinu/effect-contents-llm/main/output/effect-experimental.txt) |

### effect-opentelemetry

- Files: 1
- Size: 154 B
- Tokens: 36

#### Files

| File | Size | Tokens | Raw |
| --- | --- | --- | --- |
| [output/effect-opentelemetry.txt](https://github.com/xesrevinu/effect-contents-llm/blob/main/output/effect-opentelemetry.txt) | 154 B | 36 | [Raw](https://raw.githubusercontent.com/xesrevinu/effect-contents-llm/main/output/effect-opentelemetry.txt) |

### effect-platform

- Files: 1
- Size: 154 kB
- Tokens: 35,130

#### Files

| File | Size | Tokens | Raw |
| --- | --- | --- | --- |
| [output/effect-platform.txt](https://github.com/xesrevinu/effect-contents-llm/blob/main/output/effect-platform.txt) | 154 kB | 35,130 | [Raw](https://raw.githubusercontent.com/xesrevinu/effect-contents-llm/main/output/effect-platform.txt) |

### effect-rpc

- Files: 1
- Size: 10.9 kB
- Tokens: 2,534

#### Files

| File | Size | Tokens | Raw |
| --- | --- | --- | --- |
| [output/effect-rpc.txt](https://github.com/xesrevinu/effect-contents-llm/blob/main/output/effect-rpc.txt) | 10.9 kB | 2,534 | [Raw](https://raw.githubusercontent.com/xesrevinu/effect-contents-llm/main/output/effect-rpc.txt) |

### effect-sql

- Files: 1
- Size: 11.6 kB
- Tokens: 2,933

#### Files

| File | Size | Tokens | Raw |
| --- | --- | --- | --- |
| [output/effect-sql.txt](https://github.com/xesrevinu/effect-contents-llm/blob/main/output/effect-sql.txt) | 11.6 kB | 2,933 | [Raw](https://raw.githubusercontent.com/xesrevinu/effect-contents-llm/main/output/effect-sql.txt) |

### effect-typeclass

- Files: 1
- Size: 15.8 kB
- Tokens: 4,176

#### Files

| File | Size | Tokens | Raw |
| --- | --- | --- | --- |
| [output/effect-typeclass.txt](https://github.com/xesrevinu/effect-contents-llm/blob/main/output/effect-typeclass.txt) | 15.8 kB | 4,176 | [Raw](https://raw.githubusercontent.com/xesrevinu/effect-contents-llm/main/output/effect-typeclass.txt) |

### effect-vitest

- Files: 1
- Size: 12.3 kB
- Tokens: 2,883

#### Files

| File | Size | Tokens | Raw |
| --- | --- | --- | --- |
| [output/effect-vitest.txt](https://github.com/xesrevinu/effect-contents-llm/blob/main/output/effect-vitest.txt) | 12.3 kB | 2,883 | [Raw](https://raw.githubusercontent.com/xesrevinu/effect-contents-llm/main/output/effect-vitest.txt) |


<!-- STATS_END -->

## Project Structure

```
effect-contents-llm/
├── src/                 # Source code
│   └── process.ts      # Main processing logic
├── output/             # Processed documentation
├── sources/            # Documentation sources (submodules)
│   ├── website/
│   └── effect-io-ai/
└── README.md
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT

## Acknowledgments

- [Effect](https://github.com/Effect-TS) - The original documentation sources
- [effect-io-ai](https://github.com/tim-smart/effect-io-ai) - Additional Effect documentation
