import { MCP_CONFIG } from './shared/config.js';

const metadata = {
  version: '1.0.2',
  serverName: MCP_CONFIG.name,
  startTime: Date.now()
}

export async function init() {
  metadata.startTime = Date.now();
}

export default {
  init,

  get all() {
    return metadata;
  },

  get version() {
    return metadata.version;
  },

  get serverName() {
    return metadata.serverName;
  },

  get startTime() {
    return metadata.startTime;
  }
};
