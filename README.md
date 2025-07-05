# Markdown to Notion MCP Server

This project is a Model Context Protocol (MCP) server that converts Markdown content to Notion API Blocks.

It uses the `@tryfabric/martian` library to parse Markdown and convert it into a format compatible with the Notion API.

## Prerequisites

- Node.js (v18 or higher)

## Installation & Usage

### Using npx (Recommended)

The easiest way to use this MCP server is with npx, which allows you to run it without installing it globally:

```bash
npx mcp-mdnotion
```

This will automatically download and run the latest version of the server.

#### Configuration for npx

When using npx, configure your MCP client with the following settings:

**For Claude Desktop (claude_desktop_config.json):**
```json
{
  "mcpServers": {
    "markdown-to-notion": {
      "command": "npx",
      "args": ["mcp-mdnotion"]
    }
  }
}
```

### Global Installation

Alternatively, you can install the package globally:

```bash
npm install -g mcp-mdnotion
```

Then configure your MCP client to use the global installation:

```json
{
  "servers": {
    "markdown-to-notion": {
      "type": "stdio",
      "command": "mcp-mdnotion"
    }
  }
}
```

### Local Development

For local development or if you want to modify the code:

1. Clone the repository:
   ```bash
   git clone https://github.com/mikamboo/mcp-mdnotion.git
   cd mcp-mdnotion
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

## Quick Start

1. **Start using immediately with npx:**
   ```bash
   npx mcp-mdnotion
   ```

2. **Configure your MCP client** (e.g., VS Code, Claude Desktop) to use the server with npx configuration shown above.

3. **Test the conversion:**
   Use the `markdown-to-notion` tool in your MCP client to convert markdown like:
   ```markdown
   # Hello World
   
   This is a **bold** paragraph with *italic* text.
   ```

## Build

To build the project, run the following command:

```bash
npm run build
```

This will compile the TypeScript code and output the JavaScript files in the `build` directory.

## Running the Server

To run the MCP server, execute the following command:

```bash
node build/index.js
```

The server will start and listen for requests on standard I/O.

## Usage

The server exposes a single tool: `markdown-to-notion`.

### `markdown-to-notion`

This tool converts a given Markdown string into Notion blocks.

**Input:**

- `markdown` (string): The Markdown content to convert.

**Output:**

- A JSON string representing the Notion blocks.

**Example:**

If you send the following request to the server:

```json
{
  "tool": "markdown-to-notion",
  "input": {
    "markdown": "# Hello World\n\nThis is a paragraph."
  }
}
```

The server will respond with:

```json
{
  "content": [
    {
      "type": "text",
      "text": "[\n  {\n    \"object\": \"block\",\n    \"type\": \"heading_1\",\n    \"heading_1\": {\n      \"rich_text\": [\n        {\n          \"type\": \"text\",\n          \"text\": {\n            \"content\": \"Hello World\"\n          }\n        }\n      ]\n    }\n  },\n  {\n    \"object\": \"block\",\n    \"type\": \"paragraph\",\n    \"paragraph\": {\n      \"rich_text\": [\n        {\n          \"type\": \"text\",\n          \"text\": {\n            \"content\": \"This is a paragraph.\"\n          }\n        }\n      ]\n    }\n  }\n]"
    }
  ]
}
```

## Integration with MCP Clients

### VS Code with Copilot

1. Create or update `.vscode/mcp.json` in your project:
   ```json
   {
     "servers": {
       "markdown-to-notion": {
         "type": "stdio",
         "command": "npx",
         "args": ["mcp-mdnotion"]
       }
     }
   }
   ```

2. Restart VS Code or reload the MCP servers.

3. Use the tool by asking Copilot to convert markdown to Notion format.

### Claude Desktop

1. Open your Claude Desktop configuration file:
   - **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`
   - **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
   - **Linux:** `~/.config/Claude/claude_desktop_config.json`

2. Add the server configuration:
   ```json
   {
     "mcpServers": {
       "markdown-to-notion": {
         "command": "npx",
         "args": ["mcp-mdnotion"]
       }
     }
   }
   ```

3. Restart Claude Desktop.

### Other MCP Clients

For other MCP clients, use the npx command configuration:
- **Command:** `npx`
- **Arguments:** `["mcp-mdnotion"]`
- **Type:** `stdio`

## Development & Release

### Publishing to npm

This project uses GitHub Actions to automatically publish to npm when a new tag is created.

#### Setup

1. **Create an npm account** and get an access token:
   - Go to [npmjs.com](https://www.npmjs.com/) and create an account
   - Go to Access Tokens in your npm profile
   - Create a new "Automation" token

2. **Add the token to GitHub Secrets**:
   - Go to your GitHub repository → Settings → Secrets and variables → Actions
   - Add a new secret named `NPM_TOKEN` with your npm token value

#### Release Process

Use the built-in npm scripts to create releases:

```bash
# For bug fixes (1.0.0 → 1.0.1)
npm run release:patch

# For new features (1.0.0 → 1.1.0)
npm run release:minor

# For breaking changes (1.0.0 → 2.0.0)
npm run release:major
```

These commands will:
1. Update the version in `package.json`
2. Create a git tag
3. Push the changes and tag to GitHub
4. Trigger the GitHub Action to publish to npm

### Manual Publishing

If you prefer to publish manually:

```bash
npm run build
npm publish
```

## References

* https://github.com/tryfabric/martian
* https://modelcontextprotocol.io/quickstart/server
