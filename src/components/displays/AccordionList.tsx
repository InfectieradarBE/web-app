import React, { useState } from 'react';
import ChevronDown from '../icons/Arrows/ChevronDown';
import ChevronUp from '../icons/Arrows/ChevronUp';
import MarkdownRenderer from './MarkdownRenderer';

interface AccordionListProps {
  items: Array<{
    title: string;
    content: string;
  }>
  openLabel: string;
  closeLabel: string;
}

const AccordionList: React.FC<AccordionListProps> = (props) => {
  const [openedKeys, setOpenedKeys] = useState<string[]>([]);

  const toggleItem = (key: string, isOpened: boolean) => {
    if (isOpened) {
      setOpenedKeys(prev => prev.filter(k => k !== key));
    } else {
      setOpenedKeys(prev => [...prev, key])
    }
  }

  return (
    <React.Fragment>
      {props.items.map((item, index) => {
        const key = 'item' + index.toFixed();
        const isOpened = openedKeys.includes(key);

        return <div key={key}
          className="mt-3"
        >
          <div className="bg-secondary py-1a px-2 d-flex align-items-center cursor-pointer"
            data-bs-toggle="collapse" data-bs-target={'#' + key}
            onClick={() => {
              toggleItem(key, isOpened);
            }}
          >
            <h6 className="m-0 flex-grow-1">{item.title}</h6>
            <button
              data-bs-toggle="collapse" data-bs-target={'#' + key}
              aria-expanded="false" aria-controls={'#' + key}
              className="btn btn-link text-body p-0 ps-1 d-flex align-items-center text-decoration-none"
              onClick={() => {
                toggleItem(key, isOpened);
              }}
            >
              {isOpened ?
                <React.Fragment>
                  <span className="text-decoration-underline  d-none d-sm-inline">{props.closeLabel}</span>
                  <span className="ps-1 d-flex align-items-center">
                    <ChevronUp />
                  </span>
                </React.Fragment> :
                <React.Fragment>
                  <span className="text-decoration-underline d-none d-sm-inline">{props.openLabel}</span>
                  <span className="ps-1 d-flex align-items-center">
                    <ChevronDown />
                  </span>
                </React.Fragment>}
            </button>
          </div>
          <div
            id={key}
            className="collapse multi-collapse">
            <MarkdownRenderer
              className="py-1a px-2"
              markdown={item.content}
            />
          </div>
        </div>
      })}
    </React.Fragment >
  );
};

export default AccordionList;
