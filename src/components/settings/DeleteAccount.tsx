import React from 'react';
import { useTranslation } from 'react-i18next';
import { useIsAuthenticated } from '../../hooks/useIsAuthenticated';
import AlertBox from '../displays/AlertBox';
import { useDispatch } from 'react-redux';
import { openDialogWithoutPayload } from '../../store/dialogSlice';

interface DeleteAccountProps {
  itemKey: string;
}

const DeleteAccount: React.FC<DeleteAccountProps> = (props) => {
  const { t } = useTranslation(['settings']);
  const isAuth = useIsAuthenticated();
  const dispatch = useDispatch();

  if (!isAuth) {
    return <div className="bg-warning-light p-3">
      {'authentication needed'}
    </div>
  }

  return (
    <div className="border-primary border-top-2 pt-2 mt-3">
      <h2>
        {t(`${props.itemKey}.title`)}
      </h2>
      <AlertBox
        className="mt-1"
        type="warning"
        useIcon={true}
        iconSize={'2rem'}
        content={t(`${props.itemKey}.warning`)}
      />
      <button className="btn btn-danger-light mt-2"
        onClick={() => {
          dispatch(openDialogWithoutPayload('deleteAccount'))
        }}
      >
        {t(`${props.itemKey}.deleteBtn`)}
      </button>
    </div>
  );
};

export default DeleteAccount;
