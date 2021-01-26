import React from 'react';
import SvgPathIcon from '../SvgPathIcon';

interface ChevronUpProps {
  fontSize?: string;
}

const ChevronDownIcon = (size: string, className?: string) => <svg
  height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  < path fillRule="evenodd" clipRule="evenodd"
    // d="M0 7.38638L2.24352 5.14286L12 14.8993L21.7565 5.14286L24 7.38638L12 19.3864L0 7.38638Z"
    d="M0 4.92425L1.49568 3.42857L8 9.93289L14.5043 3.42857L16 4.92425L8 12.9243L0 4.92425Z"
    fill="currentColor" />
</svg >

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
