import React from 'react';
import { useTranslatedMarkdown } from '../../../hooks/useTranslatedMarkdown';
import MarkdownRenderer from '../../displays/MarkdownRenderer';

interface MarkdownLoaderProps {
  className?: string;
  markdownUrl: string;
  languageCode: string;
}

const MarkdownLoader: React.FC<MarkdownLoaderProps> = (props) => {
  const content = useTranslatedMarkdown(props.markdownUrl);

  if (!content) {
    return null;
  }
  return <MarkdownRenderer
    className={props.className}
    markdown={content}
    renderers={{
      'inlineCode': (node) => <p className="border-primary border-top-2 border-bottom-2" style={{ fontSize: '1.0rem', color: '#696969' }} >{node.children}</p>,
      'paragraph': (node) => node.children[0].type.name === "image" || node.children[0].type.name === "inlineCode" ? (
        <div {...node} />
      ) : (
          <p {...node} />
        )
      ,
    }}
  />
};

export default MarkdownLoader;
