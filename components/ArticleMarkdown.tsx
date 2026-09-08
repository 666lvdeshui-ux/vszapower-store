import React from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Root, RootContent } from 'mdast';

/** Style editorial warnings without rewriting code examples or accepting raw HTML. */
function remarkWarnings() {
  return (tree: Root) => {
    function visit(node: Root | RootContent) {
      if (node.type === 'blockquote') {
        const paragraph = node.children[0];
        const first = paragraph?.type === 'paragraph' ? paragraph.children[0] : undefined;
        if (first?.type === 'text' && /^\[!WARNING\](?:\s|$)/.test(first.value)) {
          first.value = first.value.replace(/^\[!WARNING\]\s*/, '⚠ WARNING: ');
          node.data = { ...node.data, hProperties: { className: ['article-warning'] } };
        }
      }
      if ('children' in node) node.children.forEach(child => visit(child as RootContent));
    }
    visit(tree);
  };
}

export default function ArticleMarkdown({ content }: { content: string }) {
  return (
    <Markdown
      remarkPlugins={[remarkGfm, remarkWarnings]}
      skipHtml
      components={{
        // The article template already supplies its H1; retain the body heading's styling.
        h1: ({ children }) => <h2 style={{ fontSize: '2em' }}>{children}</h2>,
        table: ({ children }) => <div className="markdown-table-wrapper"><table>{children}</table></div>,
      }}
    >
      {content}
    </Markdown>
  );
}
