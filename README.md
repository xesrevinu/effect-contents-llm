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
- Total Size: 15.1 MB
- Total Tokens: 4,045,292

### File Types

| Extension | Count | Size | Tokens | Origin URL | GitHub |
|-----------|-------|------|--------|------------|--------|
| .md | 2 | 3.92 MB | 1,021,920 | [https://effect.website/docs](https://effect.website/docs) | [View](https://github.com/xesrevinu/effect-contents-llm/blob/main/output/docs.md) |
| .json | 1 | 11.2 MB | 3,023,372 | [https://effect.website/docs](https://effect.website/docs) | [View](https://github.com/xesrevinu/effect-contents-llm/blob/main/output/docs.json) |

### Website Documentation

- Files: 1
- Size: 1.49 MB
- Tokens: 346,080

#### File Types

| Extension | Count | Size | Tokens | GitHub |
|-----------|-------|------|--------|--------|
| .md | 1 | 1.49 MB | 346,080 | [View](https://github.com/xesrevinu/effect-contents-llm/blob/main/output/docs.md) |

#### Files

| File | Size | Tokens | Origin URL | GitHub | Raw |
|------|------|--------|------------|--------|-----|
| [docs.md](https://github.com/xesrevinu/effect-contents-llm/blob/main/output/docs.md) | 1.49 MB | 346,080 | [Docs](https://effect.website/docs) | [View](https://github.com/xesrevinu/effect-contents-llm/blob/main/output/docs.md) | [Raw](https://raw.githubusercontent.com/xesrevinu/effect-contents-llm/main/output/docs.md) |

### API Documentation

- Files: 1
- Size: 2.44 MB
- Tokens: 675,840

#### File Types

| Extension | Count | Size | Tokens | GitHub |
|-----------|-------|------|--------|--------|
| .md | 1 | 2.44 MB | 675,840 | [View](https://github.com/xesrevinu/effect-contents-llm/blob/main/output/api.md) |

#### Files

| File | Size | Tokens | Origin URL | GitHub | Raw |
|------|------|--------|------------|--------|-----|
| [api.md](https://github.com/xesrevinu/effect-contents-llm/blob/main/output/api.md) | 2.44 MB | 675,840 | [Docs](https://effect.website) | [View](https://github.com/xesrevinu/effect-contents-llm/blob/main/output/api.md) | [Raw](https://raw.githubusercontent.com/xesrevinu/effect-contents-llm/main/output/api.md) |

### Module Documentation

- Files: 1
- Size: 11.2 MB
- Tokens: 3,023,372

#### File Types

| Extension | Count | Size | Tokens | GitHub |
|-----------|-------|------|--------|--------|
| .json | 1 | 11.2 MB | 3,023,372 | [View](https://github.com/xesrevinu/effect-contents-llm/blob/main/output/module.json) |

#### Files

| File | Size | Tokens | Origin URL | GitHub | Raw |
|------|------|--------|------------|--------|-----|
| [module.json](https://github.com/xesrevinu/effect-contents-llm/blob/main/output/module.json) | 11.2 MB | 3,023,372 | [Docs](https://effect.website) | [View](https://github.com/xesrevinu/effect-contents-llm/blob/main/output/module.json) | [Raw](https://raw.githubusercontent.com/xesrevinu/effect-contents-llm/main/output/module.json) |


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
