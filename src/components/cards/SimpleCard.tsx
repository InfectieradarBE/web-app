import React from 'react';
import MarkdownRenderer from '../displays/MarkdownRenderer';

interface SimpleCardProps {
  className?: string;
  title?: string;
  content: string;
  variant?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const SimpleCard: React.FC<SimpleCardProps> = (props) => {
  const Variant = props.variant ? props.variant : 'h2';
  return (
    <div className={props.className}>
      {props.title ?
        <Variant className="py-1a px-2 bg-primary text-white m-0">{props.title}</Variant> : null}
      {props.content ? <MarkdownRenderer
        className="p-2 bg-secondary"
        markdown={props.content}
      /> : null}
    </div>
  );
};

export default SimpleCard;
