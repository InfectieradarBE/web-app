import React from 'react';

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
      <div className="container py-1">
        <h1 className="m-0">{props.content}</h1>
      </div>
    </div>

  );
};

export default TitleBar;
