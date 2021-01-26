import React from 'react';

interface SvgPathIconProps {
  fontSize?: string;
  className?: string;
  viewBox?: string;
  viewBoxFill?: string;
  path: {
    d: string;
    fillRule?: "nonzero" | "evenodd" | "inherit";
    clipRule?: "nonzero" | "evenodd" | "inherit";
  }
}


const SvgPathIcon: React.FC<SvgPathIconProps> = (props) => {
  return (
    <svg
      className={props.className}
      height={props.fontSize ? props.fontSize : '1em'}
      viewBox={props.viewBox ? props.viewBox : "0 0 16 16"}
      fill={props.viewBoxFill ? props.viewBoxFill : "none"}
      xmlns="http://www.w3.org/2000/svg">
      <path fillRule={props.path.fillRule} clipRule={props.path.clipRule}
        d={props.path.d}
        fill="currentColor" />
    </svg >
  );
};

export default SvgPathIcon;
