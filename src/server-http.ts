#!/usr/bin/env node

import './logging.js';
import log4js from 'log4js';
import express from 'express';
import cors from 'cors';
import metadata from './metadata.js';
import transport from './transport.js';

export async function startHttpServer() {
  await metadata.init();

  const logr = log4js.getLogger();
  const PORT = process.env.PORT || 3000;

  const app = express();

  // Enable CORS for all routes
  app.use(cors());

  // Parse JSON bodies
  app.use(express.json());

  // Health check endpoint
  app.get('/health', (req, res) => {
    res.json(metadata.all);
  });

  // Bootstrap MCP transport
  await transport.bootstrap(app);

  // Start the server
  app.listen(PORT, () => {
    logr.info(`🚀 MCP Markdown to Notion Server (HTTP)`);
    logr.info(`🌐 http://localhost:${PORT}`);
    logr.info(`⚡ MCP endpoint: http://localhost:${PORT}/mcp`);
    logr.info(`🏥 Health check: http://localhost:${PORT}/health`);
  });
}

// Auto-start if run directly
if (process.env.NODE_ENV !== 'test') {
  startHttpServer().catch((error) => {
    console.error("Fatal error starting HTTP server:", error);
    process.exit(1);
  });
}
