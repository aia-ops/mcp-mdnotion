# Markdown to Notion MCP Server

This project is a Model Context Protocol (MCP) server that converts Markdown content to Notion API Blocks.

It uses the `@tryfabric/martian` library to parse Markdown and convert it into a format compatible with the Notion API.

## Prerequisites

- Node.js (v16 or higher)

## Installation

### Using npx (Recommended)

You can run this MCP server directly using npx without installing it globally:

```bash
npx mcp-mdnotion
```

### Local Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mikamboo/mcp-mdnotion.git
   cd mcp-mdnotion
   ```

2. Install the dependencies:
   ```bash
   npm install
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

## Integration with MCP Clients (e.g. Copilot, Claude Desktop)

To use this server with an MCP client like Copilote, you need to configure it in the client's settings.

1.  Create a `.vscode` directory in the root of the project if it doesn't exist.
2.  Create a file named `mcp.json` inside the `.vscode` directory.
3.  Add the following configuration to the `mcp.json` file:

```json
{
  "servers": {
    "markdown-to-notion": {
      "type": "stdio",
      "command": "node",
      "args": ["build/index.js"]
    }
  }
}
```

This configuration tells the MCP client how to start the server.

- `markdown-to-notion`: A unique name for your server.
- `type`: The communication protocol (in this case, `stdio`).
- `command`: The command to execute to start the server (`node`).
- `args`: The arguments to pass to the command (`build/index.js`).

After configuring the client, you can use the `markdown-to-notion` tool in your conversations.

## References

* https://github.com/tryfabric/martian
* https://modelcontextprotocol.io/quickstart/server
