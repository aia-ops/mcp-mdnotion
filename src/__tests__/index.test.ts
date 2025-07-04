import { convertMarkdownToNotionBlocks } from '../../src/index.js';
import { markdownToBlocks } from '@tryfabric/martian';

describe('Markdown to Notion Conversion', () => {
  it('should convert markdown to notion blocks correctly', () => {
    const markdown = '# Hello World\n\nThis is a paragraph.';
    const expectedBlocks = markdownToBlocks(markdown);

    const result = convertMarkdownToNotionBlocks(markdown);

    expect(result).toEqual(expectedBlocks);
  });

  it('should handle empty markdown string', () => {
    const markdown = '';
    const expectedBlocks = markdownToBlocks(markdown);
    const result = convertMarkdownToNotionBlocks(markdown);
    expect(result).toEqual(expectedBlocks);
  });

  it('should handle markdown with multiple elements', () => {
    const markdown = '# Title\n\n- item 1\n- item 2\n\n> quote';
    const expectedBlocks = markdownToBlocks(markdown);
    const result = convertMarkdownToNotionBlocks(markdown);
    expect(result).toEqual(expectedBlocks);
  });
});
