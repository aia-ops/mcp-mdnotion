#!/usr/bin/env node

// Export the conversion function for backward compatibility
export { convertMarkdownToNotionBlocks } from "./shared/mcp-factory.js";

// Determine server mode from environment variable
const SERVER_MODE = process.env.SERVER_MODE || 'stdio';

async function main() {
  if (SERVER_MODE === 'http') {
    // Run HTTP server
    console.log('🌐 Starting MCP Server in HTTP mode...');
    await import('./server-http.js');
  } else {
    // Run STDIO server (default)
    console.log('📡 Starting MCP Server in STDIO mode...');
    await import('./server-stdio.js');
  }
}

if (process.env.NODE_ENV !== 'test') {
  main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
  });
}
