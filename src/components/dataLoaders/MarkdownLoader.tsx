import React from 'react';
import { useTranslatedMarkdown } from '../../hooks/useTranslatedMarkdown';
import MarkdownRenderer from '../displays/MarkdownRenderer';

interface MarkdownLoaderProps {
  className?: string;
  markdownUrl: string;
  languageCode: string;
}

const MarkdownLoader: React.FC<MarkdownLoaderProps> = (props) => {
  const { content, loading } = useTranslatedMarkdown(props.markdownUrl);

  if (loading) {
    return <div className="container">
      <div className="d-flex align-items-center my-3 bg-secondary justify-content-center h-100" style={{ minHeight: 300 }}>
        <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  }
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
