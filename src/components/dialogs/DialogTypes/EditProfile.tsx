import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { renewToken } from '../../../api/instances/authenticatedApi';
import { Profile } from '../../../api/types/user';
import { getUserReq, saveProfileReq } from '../../../api/userAPI';
import { getErrorMsg } from '../../../api/utils';
import { userActions } from '../../../store/userSlice';
import DialogBtn from '../../buttons/DialogBtn';
import AlertBox from '../../displays/AlertBox';
import AvatarSelector from '../../inputs/AvatarSelector';
import Checkbox from '../../inputs/Checkbox';
import TextField from '../../inputs/TextField';
import { dialogPaddingXClass } from '../contants';
import Dialog from '../Dialog';

interface EditProfileProps {
  open: boolean;
  selectedProfile: Profile;
  onClose: () => void;
}

const EditProfile: React.FC<EditProfileProps> = (props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation(['dialogs']);

  const [profile, setProfile] = useState<Profile>(
    props.selectedProfile
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setProfile(
      {
        ...props.selectedProfile,
        createdAt: props.selectedProfile.createdAt > 0 ? props.selectedProfile.createdAt : Math.floor(Date.now() / 1000),
      }
    )
  }, [props.selectedProfile])


  const saveProfile = async () => {
    setLoading(true);
    try {
      await saveProfileReq(profile);
      await renewToken();
      const user = (await getUserReq()).data;
      dispatch(userActions.setUser(user));
      setLoading(false);
      close();
    } catch (e) {
      const err = getErrorMsg(e);
      console.error(err);
      setError(err);
      setLoading(false);
    }
  }

  const close = () => {
    setError("");
    setProfile({
      id: '',
      alias: '',
      avatarId: 'default',
      createdAt: 0,
      consentConfirmedAt: 0,
      mainProfile: false
    });
    props.onClose();
  }

  const isNewProfile: boolean = profile.id.length < 1;

  return (
    <Dialog
      open={props.open}
      onClose={close}
      title={
        isNewProfile ?
          t('dialogs:editProfile.new.title') : t('dialogs:editProfile.edit.title')}
      ariaLabelledBy="editProfileDialogTitle"
    >
      <div className={clsx(
        dialogPaddingXClass,
        'py-3',
        'bg-grey-1'
      )}>

        <label
          className="mb-1 form-label"
          htmlFor="consent">
          {t('dialogs:editProfile.consentCheckboxLabel')}
        </label>
        <Checkbox
          id="consent"
          name="consent"
          checked={profile.consentConfirmedAt > 0}
          onChange={
            (value: boolean) => {
              if (value) {
                setProfile(prev => {
                  return { ...prev, consentConfirmedAt: Math.floor(Date.now() / 1000) };
                });
              } else {
                setProfile(prev => {
                  return { ...prev, consentConfirmedAt: 0 };
                });
              }
            }
          }
        >
          {t('dialogs:editProfile.consentCheckboxText')}
        </Checkbox>

        <TextField
          className="my-2"
          id="nickname"
          name="nickname"
          maxLength={35}
          required={true}
          label={t('dialogs:editProfile.aliasInputLabel')}
          placeholder={t('dialogs:editProfile.aliasInputPlaceholder')}
          value={profile.alias}
          autoComplete="off"
          onChange={(event) => {
            const value = event.target.value;
            setProfile(prev => { return { ...prev, alias: value } });
          }}
        />

        <AvatarSelector
          className=""
          title={t('dialogs:editProfile.avatarSelectorLabel')}
          selectedAvatarId={profile.avatarId}
          onSelectAvatar={(avatar) => {
            setProfile(prev => { return { ...prev, avatarId: avatar } });
          }}
        />

        <AlertBox
          type="danger"
          className="mt-2"
          hide={!error}
          closable={true}
          useIcon={true}
          onClose={() => setError("")}
          content={error}
        />

        <div className="d-flex flex-wrap">
          <DialogBtn
            className="mt-2 me-2"
            type="button"
            color="primary"
            outlined={true}
            label={isNewProfile ?
              t('dialogs:editProfile.new.cancelBtn') :
              t('dialogs:editProfile.edit.cancelBtn')}
            onClick={() => close()}
          />
          <DialogBtn
            className="mt-2"
            type="button"
            color="primary"
            loading={loading}
            disabled={loading || profile.alias.length < 1 || profile.consentConfirmedAt <= 1}
            label={isNewProfile ?
              t('dialogs:editProfile.new.submitBtn') :
              t('dialogs:editProfile.edit.submitBtn')}
            onClick={() => saveProfile()}
          />
        </div>
      </div>
    </Dialog>
  );
};

export default EditProfile;
