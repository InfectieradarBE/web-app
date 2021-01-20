import React from 'react';
import ReactMarkdown from "react-markdown";
import TextLink from '../buttons/TextLink';


interface MarkdownRendererProps {
    markdown: string;
    renderers?: { [nodeType: string]: React.ElementType<any>; };
    className?: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = (props) => {
    return (
        <ReactMarkdown
            className={props.className}
            source={props.markdown}
            escapeHtml={false}
            renderers={
                {
                    link: TextLink,
                    ...props.renderers
                }
            } />
    );
};

export default MarkdownRenderer;
