import React from 'react';
import clsx from 'clsx';
import { getExternalOrLocalContentURL } from '../../utils/routeUtils';


interface LogoCreditsProps {
  itemKey: string;
  useTitle?: boolean;
  images: Array<LogoImageItem>;
  title?: string;
  className?: string;
  containerClassName?: string;
}

interface LogoImageItem {
  key: string;
  url: string;
  altKey: string;
  height?: number | string;
  width?: number | string;
  className?: string;
}

const LogoCredits: React.FC<LogoCreditsProps> = (props) => {
  const renderImage = (image: LogoImageItem) => {
    return (
      <p key={image.key} className={(clsx(props.containerClassName))}>
        <img className={(clsx(
          image.className
        ))} src={getExternalOrLocalContentURL(image.url)}
          alt={image.altKey}
          height={image.height ? image.height : 'auto'}
          width={image.width ? image.width : 'auto'}
          style={{ maxWidth: '100%' }}
        />
      </p>
    );
  }

  return (
    <div className={(clsx(
      "border-primary border-top-2 pt-2 mt-3",
      props.className
    ))}>
      {props.useTitle && props.title ?
        <h5 className="fw-bold text-grey-6 mb-2">
          {props.title}
        </h5>
        : null}
      {props.images.map(image => renderImage(image))}
    </div>
  );
};

export default LogoCredits;
