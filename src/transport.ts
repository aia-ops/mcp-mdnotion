import log4js from 'log4js';
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { create as createMcpServer } from './mcp-server.js';
import mcpErrors from './mcp-errors.js';
import type { Express, Request, Response } from 'express';

const MCP_PATH = '/mcp';
const l = log4js.getLogger();

export const bootstrap = async (app: Express) => {
  app.post(MCP_PATH, postRequestHandler);
  app.get(MCP_PATH, sessionRequestHandler);
  app.delete(MCP_PATH, sessionRequestHandler);
}

const postRequestHandler = async (req: Request, res: Response) => {
  try {
    const newMcpServer = createMcpServer();
    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: undefined,
      enableJsonResponse: false,
    });

    res.on('close', () => {
      transport.close();
      newMcpServer.close();
    });

    await newMcpServer.connect(transport);
    await transport.handleRequest(req, res, req.body);
  } catch (err) {
    l.error(`Error handling MCP request ${err}`);
    if (!res.headersSent) {
      res.status(500).json(mcpErrors.internalServerError)
    }
  }
}

const sessionRequestHandler = async (req: Request, res: Response) => {
  res.status(405).set('Allow', 'POST').json(mcpErrors.methodNotAllowed);
}

export default {
  bootstrap
};
