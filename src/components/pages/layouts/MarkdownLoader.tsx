import React, { useEffect, useState } from 'react';
import MarkdownRenderer from '../../displays/MarkdownRenderer';

interface MarkdownLoaderProps {
    className?: string;
    markdownUrl: string;
    languageCode: string;
}

const MarkdownLoader: React.FC<MarkdownLoaderProps> = (props) => {
    const [content, setContent] = useState<string | undefined>();

    useEffect(() => {
        const url = `${process.env.REACT_APP_CONTENT_URL}/locales/${props.languageCode}/${props.markdownUrl}`;
        fetch(url)
            .then(res => res.text())
            .then(text => {
                if (text.startsWith('<!DOCTYPE html>')) {
                    console.log(`cannot find content for ${props.markdownUrl}`);
                    return;
                }
                setContent(text)
            })
            .catch(error => console.log(error));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.languageCode, props.markdownUrl]);


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
