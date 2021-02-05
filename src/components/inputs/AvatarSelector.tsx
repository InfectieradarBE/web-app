import React from 'react';

interface AvatarSelectorProps {
  className?: string;
  selectedAvatarId: string;
  onSelectAvatar: (avatarId: string) => void;
  title: string;
}

const AvatarSelector: React.FC<AvatarSelectorProps> = (props) => {
  return (
    <div className={props.className}>
      <label
        className="form-label"
      >{props.title}</label>

      <p className="m-0">AvatarSelector</p>
    </div>
  );
};

export default AvatarSelector;
