import React from 'react';
import SvgPathIcon from '../SvgPathIcon';

interface ChevronUpProps {
  fontSize?: string;
}


const ChevronUp: React.FC<ChevronUpProps> = (props) => {
  return (
    <SvgPathIcon
      fontSize={props.fontSize}
      viewBoxFill={'none'}
      viewBox="0 0 16 16"
      path={{
        d: "M0 11.0757L1.49568 12.5714L8 6.06711L14.5043 12.5714L16 11.0757L8 3.07575L0 11.0757Z",
        fillRule: 'evenodd',
        clipRule: 'evenodd'
      }}
    />
  );
};

export default ChevronUp;
