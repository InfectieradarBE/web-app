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
    />
};

export default MarkdownLoader;
