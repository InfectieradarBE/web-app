import React from 'react';
// import { getAvatarIconFromID } from '../../avatars/ProfileUtils';
import clsx from 'clsx';

interface AvatarPreviewProps {
  avatarId: string;
  fontSize?: string;
  className?: string;
}

const AvatarPreview: React.FC<AvatarPreviewProps> = (props) => {
  return (
    <i
      className={clsx("bg-white text-body", props.className)}
      style={{
        fontSize: props.fontSize,
        lineHeight: props.fontSize,
        minWidth: 28,
        minHeight: 28
      }}>
      {/*getAvatarIconFromID(props.avatarId)*/}
    </i>
  );
};

export default AvatarPreview;
