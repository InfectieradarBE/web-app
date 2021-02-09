import clsx from 'clsx';
import React from 'react';
import { Profile } from '../../api/types/user';
import AvatarPreview from '../displays/AvatarPreview';

interface SurveyCardBtnProps {
  profile: Profile;
  onClick: () => void;
  category: string;
}

const SurveyCardBtn: React.FC<SurveyCardBtnProps> = (props) => {
  return (
    <button
      className={
        clsx(
          'btn fw-bold border-0 d-flex',
          {
            'btn-secondary': ['prio'].includes(props.category),
            'btn-primary': props.category === 'normal',
            'btn-grey-2': ['optional'].includes(props.category),
          }
        )
      }
    >
      <AvatarPreview
        className="me-1"
        avatarId={props.profile.avatarId}
      />
      <span
        className="d-inline-block text-truncate align-self-center"
        style={{ maxWidth: 200 }}
      >
        {props.profile.alias}
      </span>

      <i>
        <svg width="1.25em" height="1.25em" viewBox="0 0 16 16" className="bi bi-arrow-right-short" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z" />
        </svg>
      </i>
    </button>
  );
};

export default SurveyCardBtn;
