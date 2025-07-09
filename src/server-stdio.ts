#!/usr/bin/env node

import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createMcpServer } from "./shared/mcp-factory.js";

// Export the conversion function for backward compatibility
export { convertMarkdownToNotionBlocks } from "./shared/mcp-factory.js";

const server = createMcpServer("1.0.0");

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);

  // Enhanced logging with emojis like HTTP server
  console.log("🚀 MCP Markdown to Notion Server (STDIO)");
  console.log("📡 Ready to process markdown conversion requests");
  console.log("🔧 Tool available: markdown-to-notion");
  console.log("✨ Server initialized and listening on stdio");
}

if (process.env.NODE_ENV !== 'test') {
  main().catch((error) => {
    console.error("💥 Fatal error in STDIO server:", error);
    process.exit(1);
  });
}

export default server;
