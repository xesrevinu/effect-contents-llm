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

### Output Structure

The processed files will be available in the `output` directory:
- `output/docs.md` - Website documentation
- `output/api.md` - API documentation
- `output/module.md` - Module documentation

### Configuration

You can customize the processing behavior by modifying the config files in the `config` directory:
- `config/docs.yaml` - Website documentation config
- `config/api.yaml` - API documentation config
- `config/module.yaml` - Module documentation config

<!-- STATS_START -->
## Documentation Statistics

### Summary

- Total Files: 3
- Total Size: 9.07 MB
- Total Tokens: 2,500,334

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
- Size: 2.33 MB
- Tokens: 643,684

#### Files

| File | Size | Tokens | Raw |
| --- | --- | --- | --- |
| [output/effect-api.txt](https://github.com/xesrevinu/effect-contents-llm/blob/main/output/effect-api.txt) | 2.33 MB | 643,684 | [Raw](https://raw.githubusercontent.com/xesrevinu/effect-contents-llm/main/output/effect-api.txt) |

### effect-module

- Files: 1
- Size: 5.26 MB
- Tokens: 1,511,620

#### Files

| File | Size | Tokens | Raw |
| --- | --- | --- | --- |
| [output/effect-module.txt](https://github.com/xesrevinu/effect-contents-llm/blob/main/output/effect-module.txt) | 5.26 MB | 1,511,620 | [Raw](https://raw.githubusercontent.com/xesrevinu/effect-contents-llm/main/output/effect-module.txt) |


<!-- STATS_END -->

## Project Structure

```
effect-contents-llm/
├── config/               # Configuration files
│   ├── docs.yaml
│   ├── api.yaml
│   └── module.yaml
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
