#!/usr/bin/env node

// Simple test client for the SSE server
const testClient = async () => {
  try {
    console.log('🔍 Testing MCP SSE Server...\n');

    // Test health endpoint
    console.log('1. Testing health endpoint...');
    const healthResponse = await fetch('http://localhost:3000/health');
    const healthData = await healthResponse.json();
    console.log('✅ Health check:', healthData);

    // Test MCP endpoint with SSE
    console.log('\n2. Testing MCP SSE endpoint...');
    const mcpResponse = await fetch('http://localhost:3000/mcp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'tools/call',
        params: {
          name: 'test',
          arguments: {}
        },
        id: 1
      })
    });

    console.log('📡 Response headers:');
    for (const [key, value] of mcpResponse.headers) {
      console.log(`   ${key}: ${value}`);
    }

    const mcpData = await mcpResponse.text();
    console.log('📨 SSE Response:', mcpData);

    console.log('\n✅ SSE Server test completed successfully!');

  } catch (error) {
    console.error('❌ Error testing server:', error.message);
    process.exit(1);
  }
};

// Check if server is running first
const checkServer = async () => {
  try {
    await fetch('http://localhost:3000/health');
    await testClient();
  } catch (error) {
    console.error('❌ Server is not running on http://localhost:3000');
    console.log('💡 Start the server first with: node simple-sse-server.js');
    process.exit(1);
  }
};

checkServer();
