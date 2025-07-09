import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

const ENDPOINT_URL = process.env.MCP_SERVER_ENDPOINT || 'http://localhost:3000/mcp';

console.log(`Connecting to: ${ENDPOINT_URL}`);

async function testMcpServer() {
  try {
    const transport = new StreamableHTTPClientTransport(new URL(ENDPOINT_URL));
    const client = new Client({
      name: "mcp-mdnotion-client",
      version: "1.0.0"
    });

    await client.connect(transport);
    console.log('✅ Connected');

    // Test markdown-to-notion tool
    console.log('\n📝 Testing markdown-to-notion...');
    const result = await client.callTool({
      name: "markdown-to-notion",
      arguments: {
        markdown: "# Hello World\n\nThis is **bold** text with:\n\n- Item 1\n- Item 2\n\n> Quote"
      }
    });
    console.log('Result:', result);

    await client.close();
    console.log('\n✅ Test completed');

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

testMcpServer();
