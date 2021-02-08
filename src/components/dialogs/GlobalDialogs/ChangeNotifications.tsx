import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { ContactPreferences } from '../../../api/types/user';
import { getUserReq, updateContactPreferencesReq } from '../../../api/userAPI';
import { closeDialog, openAlertDialog } from '../../../store/dialogSlice';
import { RootState } from '../../../store/rootReducer';
import { userActions } from '../../../store/userSlice';
import DialogBtn from '../../buttons/DialogBtn';
import AlertBox from '../../displays/AlertBox';
import Checkbox from '../../inputs/Checkbox';
import { dialogPaddingXClass } from '../contants';
import Dialog from '../Dialog';

interface ChangeNotificationsProps {
}

const ChangeNotifications: React.FC<ChangeNotificationsProps> = (props) => {
  const { t } = useTranslation(['dialogs']);
  const dispatch = useDispatch();
  const dialogState = useSelector((state: RootState) => state.dialog)
  const open = dialogState.config?.type === 'changeNotifications';
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [changed, setChanged] = useState(false);

  const [weeklyEnabled, setWeeklyEnabled] = useState(false);
  const [newsletterEnabled, setNewsletterEnabled] = useState(false);


  useEffect(() => {
    if (open) {
      fetchUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    setNewsletterEnabled(currentUser.contactPreferences.subscribedToNewsletter ? true : false);
    setWeeklyEnabled(currentUser.contactPreferences.subscribedToWeekly ? true : false);
  }, [currentUser]);

  const fetchUser = async () => {
    if (loading) { return; }
    setLoading(true);
    try {
      const user = (await getUserReq()).data;
      dispatch(userActions.setUser(user));
      setLoading(false);
    } catch (e) {
      console.log(e.respomse);
      setLoading(false);
    }
  }

  const handleClose = () => {
    setChanged(false);
    setLoading(false);
    dispatch(closeDialog());
  }

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    const contactPreferences: ContactPreferences = {
      ...currentUser.contactPreferences,
      subscribedToWeekly: weeklyEnabled,
      subscribedToNewsletter: newsletterEnabled
    };

    try {
      const user = (await updateContactPreferencesReq(contactPreferences)).data;
      dispatch(userActions.setUser(user));
      handleClose();
      dispatch(openAlertDialog({
        type: 'alertDialog',
        payload: {
          color: 'success',
          title: t('changeNotifications.successDialog.title'),
          content: t('changeNotifications.successDialog.content'),
          btn: t('changeNotifications.successDialog.btn'),
        }
      }))
    } catch (e) {
      setLoading(false);
      console.error(e.response);
    }
  }

  return (
    <Dialog
      open={open}
      title={t('changeNotifications.title')}
      onClose={handleClose}
      ariaLabelledBy="changeNotificationsDialogTitle"
    >
      <div className={clsx(
        dialogPaddingXClass,
        'py-3',
        'bg-grey-1'
      )}>
        <form onSubmit={submitForm}>
          <label
            className="mb-1 form-label"
            htmlFor="weeklyEmail">
            {t('dialogs:changeNotifications.weeklyReminder.label')}
          </label>
          <Checkbox
            id="weeklyEmail"
            name="weeklyEmail"
            checked={weeklyEnabled}
            onChange={
              (value: boolean) => {
                setChanged(true);
                setWeeklyEnabled(value);
              }
            }
          >
            {weeklyEnabled ?
              t('dialogs:changeNotifications.weeklyReminder.on') :
              t('dialogs:changeNotifications.weeklyReminder.off')}
          </Checkbox>

          <label
            className="mt-2 mb-1 form-label"
            htmlFor="newsletter">
            {t('dialogs:changeNotifications.newsletter.label')}
          </label>
          <Checkbox
            id="newsletter"
            name="newsletter"
            checked={newsletterEnabled}
            onChange={
              (value: boolean) => {
                setChanged(true);
                setNewsletterEnabled(value);
              }
            }
          >
            {newsletterEnabled ?
              t('dialogs:changeNotifications.newsletter.on') :
              t('dialogs:changeNotifications.newsletter.off')}
          </Checkbox>

          <AlertBox
            type="info"
            className="mt-2"
            content={t('changeNotifications.info')}
          />

          <AlertBox
            type="danger"
            className="mt-2"
            hide={!error}
            closable={true}
            onClose={() => setError('')}
            useIcon={true}
            content={error}
          />

          <div className="d-flex flex-wrap">
            <DialogBtn
              className="mt-2 me-2"
              type="button"
              color="primary"
              outlined={true}
              label={t('changeNotifications.cancelBtn')}
              onClick={() => handleClose()}
            />
            <DialogBtn
              className="mt-2"
              type="submit"
              color="primary"
              loading={loading}
              disabled={loading || !changed}
              label={t('changeNotifications.submitBtn')}
            />
          </div>
        </form>
      </div>
    </Dialog>
  );
};

export default ChangeNotifications;
