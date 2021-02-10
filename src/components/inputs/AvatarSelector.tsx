import clsx from 'clsx';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import Avatar from '../displays/Avatar';
import styles from './AvatarSelector.module.scss';

interface AvatarSelectorProps {
  className?: string;
  selectedAvatarId: string;
  onSelectAvatar: (avatarId: string) => void;
  title: string;
}

const AvatarSelector: React.FC<AvatarSelectorProps> = (props) => {
  const avatars = useSelector((state: RootState) => state.config.avatars);

  return (
    <div className={props.className}>
      <label
        className="form-label m-0"
      >{props.title}</label>

      <div className="d-flex flex-wrap justify-content-start">
        {avatars.map(avatar =>
          <div key={avatar.avatarId}
            onClick={() => {
              props.onSelectAvatar(avatar.avatarId)
            }}
            className={clsx("mt-1a me-1a",
              "position-relative",
              "cursor-pointer",
              "border-primary",
              styles.avatar,
              {
                [styles.selected]: props.selectedAvatarId === avatar.avatarId
              }
            )}
            style={{ maxWidth: 50 }}>
            <Avatar
              size="100%"
              avatarId={avatar.avatarId}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AvatarSelector;
