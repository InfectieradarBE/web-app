import clsx from 'clsx';
import React from 'react';

interface LinkListProps {
  title: string;
  className?: string;
  items: Array<{
    label: string;
    value: string;
    type: 'internal' | 'external' | 'language' | 'dialog';
  }>;
  onChangeLanguage: (code: string) => void;
  onOpenExternalPage: (url: string) => void;
  onNavigate: (url: string) => void;
  onOpenDialog: (dialog: string) => void;
}

const LinkList: React.FC<LinkListProps> = (props) => {
  return (
    <div className={
      clsx("border-primary border-top-2 py-2",
        props.className
      )}>
      <h2>{props.title}</h2>
      <div className="d-grid gap-1">
        {props.items.map(item => <button key={item.value}
          className="btn btn-link text-start px-0 text-decoration-none"
          onClick={() => {
            switch (item.type) {
              case 'dialog':
                props.onOpenDialog(item.value);
                break;
              case 'language':
                props.onChangeLanguage(item.value);
                break;
              case 'internal':
                props.onNavigate(item.value);
                break;
              case 'external':
                props.onOpenExternalPage(item.value);
                break;
            }
          }}
        >
          <i className="fas fa-arrow-right me-1"></i>
          {item.label}
        </button>)}
      </div>
    </div>

  );
};

export default LinkList;
