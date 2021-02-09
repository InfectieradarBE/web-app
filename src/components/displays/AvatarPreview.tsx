import React from 'react';
// import { getAvatarIconFromID } from '../../avatars/ProfileUtils';
import clsx from 'clsx';
import { getExternalOrLocalContentURL } from '../../utils/routeUtils';

interface AvatarPreviewProps {
  avatarId: string;
  size?: string;
  className?: string;
}

const AvatarPreview: React.FC<AvatarPreviewProps> = (props) => {
  const size = props.size ? props.size : 28;
  return (
    <img
      alt="avatar"
      src={getExternalOrLocalContentURL('/images/avatars/Unknown_schwaz.png')}
      className={clsx("d-inline-block bg-white text-body overflow-hidden", props.className)}
      width={size}
    />
  );
};

export default AvatarPreview;
