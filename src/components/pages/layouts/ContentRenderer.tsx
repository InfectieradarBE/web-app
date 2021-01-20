import clsx from 'clsx';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { PageColumn, PageItem, PageRow } from '../../../types/config/pages';
import MarkdownRenderer from '../../displays/MarkdownRenderer';

interface ContentRendererProps {
    rows: Array<PageRow>;
    pageKey: string;
}

const ContentRenderer: React.FC<ContentRendererProps> = (props) => {
    const { t } = useTranslation([props.pageKey]);

    const renderItem = (item: PageItem) => {
        switch (item.type) {
            case 'markdown':
                return <MarkdownRenderer
                    key={item.itemKey}
                    className={item.className}
                    markdown={t(item.itemKey)}
                />
        }
        return <div
            key={item.itemKey}
            className={item.className}>
            {item.itemKey}
        </div>
    }

    const renderColumn = (col: PageColumn, index: number) => {
        return <div
            className={col.className}
            key={index.toFixed()}>
            {col.items.map(item => renderItem(item))}
        </div>
    }

    return (
        <React.Fragment>
            {props.rows.map((row, index) =>
                <div
                    key={index.toFixed()}
                    className={clsx("row", row.className)}>
                    {row.columns.map((col, index) => renderColumn(col, index))}
                </div>)}
        </React.Fragment>
    );
};

export default ContentRenderer;
