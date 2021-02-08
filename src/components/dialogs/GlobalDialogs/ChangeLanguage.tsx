import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getUserReq, setPreferredLanguageReq } from '../../../api/userAPI';
import { getErrorMsg } from '../../../api/utils';
import { closeDialog } from '../../../store/dialogSlice';
import { RootState } from '../../../store/rootReducer';
import { userActions } from '../../../store/userSlice';
import { DialogLanguageConfig } from '../../../types/config/dialogs';
import DialogBtn from '../../buttons/DialogBtn';
import AlertBox from '../../displays/AlertBox';
import SelectField from '../../inputs/SelectField';
import { dialogPaddingXClass } from '../contants';
import Dialog from '../Dialog';

interface ChangeLanguageProps {
  availableLanguages?: DialogLanguageConfig[];
  currentLanguage?: string;
  onChangeLanguage: (code: string) => void;
}

const ChangeLanguage: React.FC<ChangeLanguageProps> = (props) => {
  const { t } = useTranslation(['dialogs']);
  const dispatch = useDispatch();
  const dialogState = useSelector((state: RootState) => state.dialog)
  const open = dialogState.config?.type === 'changeLanguage';
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [selectedLanguage, setSelectedLanguage] = useState(currentUser.account.preferredLanguage);

  useEffect(() => {
    if (open) {
      fetchUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

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

  useEffect(() => {
    setSelectedLanguage(currentUser.account.preferredLanguage);
  }, [currentUser]);

  const resetState = () => {
    setError('');
    setSelectedLanguage(currentUser.account.preferredLanguage);
    setLoading(false);
  }

  const handleClose = () => {
    resetState();
    dispatch(closeDialog());
  }

  const changeLanguage = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await setPreferredLanguageReq(selectedLanguage);
      if (response.status === 200) {
        if (response.data) {
          dispatch(userActions.setUser(response.data));
        }
        props.onChangeLanguage(selectedLanguage);
        handleClose();
      }
    } catch (e) {
      const err = getErrorMsg(e);
      console.error(err);
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleError = (errorMsg?: string) => {
    switch (errorMsg) {
      case 'no error response':
      case 'error during token validation':
        setSelectedLanguage(selectedLanguage)
        dispatch(closeDialog());
        break;
      default:
        setError(t('dialogs:changeLanguage.errors.unknown'));
        break;
    }
  }

  return (
    <Dialog
      open={open}
      title={t('changeLanguage.title')}
      onClose={handleClose}
      ariaLabelledBy="changeLanguageDialogTitle"
    >
      <div className={clsx(
        dialogPaddingXClass,
        'py-3',
        'bg-grey-1'
      )}>
          {
            props.availableLanguages && props.availableLanguages.length > 0 ?
              <SelectField
                id="defaultLanguage"
                label={t('dialogs:changeLanguage.defaultLanguageLabel')}
                name="defaultLanguage"
                autoComplete="off"
                className="mb-2"
                value={selectedLanguage}
                values={props.availableLanguages.map(language => { return { 'code': language.code, 'label': t(`dialogs:changeLanguage.languages.${language.itemKey}`) } })}
                required={true}
                onChange={(event) => {
                  const value = event.target.value;
                  setSelectedLanguage(value);
                }}
                hasError={error!==""}
              />
              : null}


          <AlertBox
            type="info"
            content={t('changeLanguage.info')}
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
              label={t('changeLanguage.cancelBtn')}
              onClick={() => handleClose()}
            />
            <DialogBtn
              className="mt-2"
              type="submit"
              color="primary"
              loading={loading}
              disabled={loading}
              label={t('changeLanguage.confirmBtn')}
              onClick={() => changeLanguage()}
            />
          </div>
      </div>
    </Dialog>
  );
};

export default ChangeLanguage;
