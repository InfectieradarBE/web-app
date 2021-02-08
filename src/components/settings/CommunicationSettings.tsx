import React from 'react';

import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import EditBtn from '../buttons/EditBtn';
import { openDialogWithoutPayload } from '../../store/dialogSlice';
import { useIsAuthenticated } from '../../hooks/useIsAuthenticated';

interface CommunicationSettingsProps {
  itemKey: string;
}

const CommunicationSettings: React.FC<CommunicationSettingsProps> = (props) => {
  const { t, i18n } = useTranslation(['settings']);
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

      {/** email reminders*/}
      <h3 className="fw-bold mt-2">
        {t(`${props.itemKey}.emailReminders.title`)}
      </h3>
      <p className="mb-1 text-grey-7">
        {t(`${props.itemKey}.emailReminders.info`)}
      </p>
      <EditBtn
        onClick={() => dispatch(openDialogWithoutPayload('changeNotifications'))}
      >
        {t(`${props.itemKey}.emailReminders.btnManageNotifications`)}
      </EditBtn>

      {/** language*/}
      <h3 className="fw-bold mt-2">
        {t(`${props.itemKey}.defaultLanguage.title`)}
      </h3>
      <p className="mb-1 text-grey-7">
        {t(`${props.itemKey}.defaultLanguage.info`)}
      </p>
      <EditBtn
        onClick={() => dispatch(openDialogWithoutPayload('changeDefaultLanguage'))}
      >
        {t(`${props.itemKey}.defaultLanguage.languages.${i18n.language}`)}
      </EditBtn>
    </div>
  );
};

export default CommunicationSettings;
