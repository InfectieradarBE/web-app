import React from 'react';
import { useTranslatedMarkdown } from '../../hooks/useTranslatedMarkdown';
import MarkdownRenderer from '../displays/MarkdownRenderer';
import MapWithTimeSliderLoader from './MapWithTimeSliderLoader';

interface MarkdownLoaderProps {
  className?: string;
  markdownUrl: string;
  languageCode: string;
  flavor?: string;
}

const customFlavorRenderers = {
  default: {
    'inlineCode': (node: any) => <p className="border-primary border-top-2 border-bottom-2 text-grey-6" >{node.children}</p>,
    'paragraph': (node: any) => node.children[0].type.name === "image" || node.children[0].type.name === "inlineCode" ? (
      <div {...node} />
    ) : (
        <p {...node} />
      )
    ,
  },
  chartRenderer: {
    'inlineCode': (node: any) => <p className="border-primary border-top-2 border-bottom-2 text-grey-6" >{node.children}</p>,
    'paragraph': (node: any) => node.children[0].type.name === "image" || node.children[0].type.name === "inlineCode" ? (
      <div {...node} />
    ) : (
        <p {...node} />
      )
    ,
    'definition': (value: any) => {
      const id = value.identifier.split(':')[0];
      // console.log(value);
      switch (id) {
        case 'mapchart':
          const mapUrl = value.identifier.split(':')[1];
          return <MapWithTimeSliderLoader
            mapUrl={mapUrl}
            dataUrl={value.url}
          />;
        default:
          return <p>{'unknown: ' + value.identifier}</p>
      }
    },
  }
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

  let renderers = customFlavorRenderers.default;
  switch (props.flavor) {
    case 'chart-renderer':
      renderers = customFlavorRenderers.chartRenderer;
  }

  return <MarkdownRenderer
    className={props.className}
    markdown={content}
    renderers={renderers}
  />
};

export default MarkdownLoader;
