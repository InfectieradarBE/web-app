import clsx from 'clsx';
import React from 'react';
import { containerClassName } from '../../constants';

interface TitleBarProps {
  content?: string;
  showAlways?: boolean;
}

const TitleBar: React.FC<TitleBarProps> = (props) => {
  if (!props.content && !props.showAlways) {
    return null;
  }
  return (
    <div className="bg-secondary" style={{ minHeight: 49 }}>
      <div className={clsx(containerClassName, "py-1")}>
        <h1 className="m-0">{props.content}</h1>
      </div>
    </div>

  );
};

export default TitleBar;
