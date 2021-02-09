import React from 'react';
// import { getAvatarIconFromID } from '../../avatars/ProfileUtils';
import clsx from 'clsx';
import { getExternalOrLocalContentURL } from '../../utils/routeUtils';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';

interface AvatarProps {
  avatarId: string;
  size?: string;
  className?: string;
}

const Avatar: React.FC<AvatarProps> = (props) => {
  const avatars = useSelector((state: RootState) => state.config.avatars);

  const getUrl = (id: string): string => {
    const index = avatars.findIndex(a => a.avatarId === id);
    const url = index < 0 ? avatars.find(a => a.avatarId === 'default')?.url : avatars[index].url;

    return getExternalOrLocalContentURL(url ? url : 'default.png');
  }

  const size = props.size ? props.size : 28;
  return (
    <img
      alt="avatar"
      src={getUrl(props.avatarId)}
      className={clsx("d-inline-block bg-white text-body overflow-hidden", props.className)}
      width={size}
    />
  );
};

export default Avatar;
