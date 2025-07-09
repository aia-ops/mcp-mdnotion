#!/usr/bin/env node

import express from 'express';
import cors from 'cors';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    server: 'mcp-mdnotion',
    version: '1.0.2',
    tool: 'markdown-to-notion'
  });
});

app.post('/mcp', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Access-Control-Allow-Origin': '*'
  });

  const responseData = {
    jsonrpc: '2.0',
    id: req.body?.id || null,
    result: {
      content: [
        {
          type: 'text',
          text: 'Simple SSE server - markdown-to-notion tool ready'
        }
      ]
    }
  };

  res.write(`data: ${JSON.stringify(responseData)}\n\n`);
  res.end();
});

app.get('/mcp', (req, res) => {
  res.status(405).json({ error: 'Method not allowed' });
});

app.listen(PORT, () => {
  console.log(`🚀 MCP Markdown to Notion Server`);
  console.log(`🌐 http://localhost:${PORT}`);
  console.log(`⚡ MCP endpoint: /mcp`);
  console.log(`🏥 Health check: /health`);
});
