import { createMcpServer } from "./shared/mcp-factory.js";
import metadata from "./metadata.js";

export const create = () => {
  return createMcpServer(metadata.version);
};
