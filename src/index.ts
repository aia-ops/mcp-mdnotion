import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { markdownToBlocks } from '@tryfabric/martian';

export function convertMarkdownToNotionBlocks(markdown: string) {
  return markdownToBlocks(markdown);
}

const server = new McpServer({
  name: "markdown-to-notion",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});

server.tool(
  "markdown-to-notion",
  "Convert markdown content to notion json page content",
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

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Markdown to Notion MCP Server running on stdio");
}

if (process.env.NODE_ENV !== 'test') {
  main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
  });
}

export default server;
