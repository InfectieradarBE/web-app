import React from 'react';
import SvgPathIcon from '../SvgPathIcon';

interface ChevronDownProps {
  fontSize?: string;
}

const ChevronDown: React.FC<ChevronDownProps> = (props) => {
  return (
    <SvgPathIcon
      fontSize={props.fontSize}
      viewBoxFill={'none'}
      viewBox="0 0 16 16"
      path={{
        d: "M0 4.92425L1.49568 3.42857L8 9.93289L14.5043 3.42857L16 4.92425L8 12.9243L0 4.92425Z",
        fillRule: 'evenodd',
        clipRule: 'evenodd'
      }}
    />
  );
};

export default ChevronDown;
