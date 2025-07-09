# MCP Markdown-to-Notion Server Usage

This MCP server provides a unified entry point that can run in either HTTP or STDIO mode.

## Server Modes

### STDIO Mode (Default)
The server runs as a standard MCP server using stdin/stdout for communication.

```bash
# Default mode (STDIO)
npm start

# Explicit STDIO mode
SERVER_MODE=stdio npm start
# or
npm run start:stdio
```

### HTTP Mode
The server runs as an HTTP server with Server-Sent Events (SSE) support.

```bash
# HTTP mode
SERVER_MODE=http npm start
# or
npm run start:http

# HTTP mode with custom port
SERVER_MODE=http PORT=3001 npm start
```

## Available Tool

The server exposes a single tool: `markdown-to-notion`

### Tool Usage (STDIO)
```bash
echo '{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "markdown-to-notion", "arguments": {"markdown": "# Hello World\n\nThis is a test."}}}' | npm start
```

### Tool Usage (HTTP)
When in HTTP mode, the server provides:
- Health endpoint: `http://localhost:3000/health`
- MCP endpoint: `http://localhost:3000/mcp` (requires SSE-compatible client)

## Development

```bash
# Build the project
npm run build

# Run tests
npm test

# Development mode (STDIO)
npm run dev

# Development mode (HTTP)
npm run dev:http
```

## Example: Converting Markdown

Input markdown:
```markdown
# Hello World

This is a **bold** statement.

- Item 1
- Item 2
```

Output: Notion JSON blocks that can be directly used with the Notion API.
