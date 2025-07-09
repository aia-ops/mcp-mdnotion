import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { markdownToBlocks } from '@tryfabric/martian';
import { MCP_CONFIG } from "./config.js";

export function convertMarkdownToNotionBlocks(markdown: string) {
  return markdownToBlocks(markdown);
}

export function createMcpServer(version: string = "1.0.0") {
  const mcpServer = new McpServer({
    name: MCP_CONFIG.name,
    version: version
  }, {
    capabilities: {
      resources: {},
      tools: {},
    }
  });

  mcpServer.tool(
    MCP_CONFIG.tool.name,
    MCP_CONFIG.tool.description,
    {
      markdown: z.string().describe("The markdown content to convert."),
    },
    async ({ markdown }) => {
      const blocks = convertMarkdownToNotionBlocks(markdown);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(blocks, null, 2),
          },
        ],
      };
    }
  );

  return mcpServer;
}
