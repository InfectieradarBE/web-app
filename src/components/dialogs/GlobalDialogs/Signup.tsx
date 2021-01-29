import React, { useState } from 'react';
import Dialog from '../Dialog';
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../../store/rootReducer';
import { closeDialog, openDialogWithoutPayload } from '../../../store/dialogSlice';
import clsx from 'clsx';
import { dialogPaddingXClass } from '../contants';
import { useTranslatedMarkdown } from '../../../hooks/useTranslatedMarkdown';
import ConsentDialog from '../DialogTypes/ConsentDialog';
import { Trans, useTranslation } from 'react-i18next';
import Checkbox from '../../inputs/Checkbox';
import DialogBtn from '../../buttons/DialogBtn';
import TextLink from '../../buttons/TextLink';
import AlertBox from '../../displays/AlertBox';
import TextField from '../../inputs/TextField';

const marginBottomClass = "mb-2";

interface SignupFormProps {
  isLoading?: boolean;
  onOpenDialog: (dialog: 'login') => void;
}

const SignupForm: React.FC<SignupFormProps> = (props) => {
  const { t } = useTranslation(['dialogs']);
  const [signupData, setSignupData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })

  const privacyConsentText = useTranslatedMarkdown('consent/privacy.md');
  const recaptchaConsentText = useTranslatedMarkdown('consent/recaptcha.md');

  const [openPrivacyConsent, setOpenPrivacyConsent] = useState(false);
  const [openRecaptchaConsent, setOpenRecaptchaConsent] = useState(false);

  const [acceptedPrivacyPolicy, setAcceptedPrivacyPolicy] = useState(false);
  const [reCaptchaAccepted, setReCaptchaAccepted] = useState(false);

  const isDisabled = (): boolean => {
    return true;
  }

  const infoText: string = t('signup.info');
  const emailInputLabel = t('signup.emailInputLabel');
  const emailInputPlaceholder = t('signup.emailInputPlaceholder');
  const passwordInputLabel = t('signup.passwordInputLabel');
  const passwordInputPlaceholder = t('signup.passwordInputPlaceholder');
  const confirmPasswordInputLabel = t('signup.confirmPasswordInputLabel');
  const confirmPasswordPlaceholder = t('signup.confirmPasswordInputLabel');

  return (
    <React.Fragment>
      {infoText && infoText.length > 0 ?
        <AlertBox
          type="info"
          className={marginBottomClass}
          content={infoText}
        /> : null}

      <form onSubmit={(event) => {
        event.preventDefault();
      }}>
        <TextField
          id="signupEmail"
          label={emailInputLabel}
          placeholder={emailInputPlaceholder}
          type="email"
          name="email"
          className={marginBottomClass}
          value={signupData.email}
          required={true}
          onChange={(event) => {
            const value = event.target.value;
            setSignupData(prev => { return { ...prev, email: value } })
          }}
        />
        <TextField
          id="signupPW"
          label={passwordInputLabel}
          placeholder={passwordInputPlaceholder}
          type="password"
          name="password"
          className={marginBottomClass}
          value={signupData.password}
          required={true}
          onChange={(event) => {
            const value = event.target.value;
            setSignupData(prev => { return { ...prev, password: value } })
          }}
        />
        <TextField
          id="signupConfirmPw"
          label={confirmPasswordInputLabel}
          placeholder={confirmPasswordPlaceholder}
          type="password"
          name="confirmPassword"
          className={marginBottomClass}
          value={signupData.confirmPassword}
          required={true}
          onChange={(event) => {
            const value = event.target.value;
            setSignupData(prev => { return { ...prev, confirmPassword: value } })
          }}
        />

        <Checkbox
          className={marginBottomClass}
          id="acceptPrivacyConsent"
          name="privacyConsent"
          checked={acceptedPrivacyPolicy}
          onClick={() => {
            if (!acceptedPrivacyPolicy) {
              setOpenPrivacyConsent(true);
            }
          }}
          onChange={(checked) => {
            if (!checked) {
              setAcceptedPrivacyPolicy(checked);
            }
          }}
        >
          <Trans t={t} i18nKey="signup.informedConsentCheckbox">
            {'...'}<span
              onClick={() => setOpenPrivacyConsent(true)}
              className="text-primary text-decoration-none">{'...'}</span>{'...'}
          </Trans>
        </Checkbox>

        <Checkbox
          className={marginBottomClass}
          id="recaptchaConsent"
          name="recaptchaConsent"
          checked={reCaptchaAccepted}
          onClick={() => {
            if (!reCaptchaAccepted) {
              setOpenRecaptchaConsent(true);
            }
          }}
          onChange={(checked) => {
            if (!checked) {
              setReCaptchaAccepted(checked);
            }
          }}
        >
          <Trans t={t} i18nKey="signup.reCaptchaCookieCheckbox">
            {'...'}<span
              onClick={() => setOpenRecaptchaConsent(true)}
              className="text-primary text-decoration-none">{'...'}</span>{'...'}
          </Trans>
        </Checkbox>

        <DialogBtn
          className={marginBottomClass}
          type="submit"
          label={t('signup.signupBtn')}
          disabled={isDisabled() || props.isLoading}
          loading={props.isLoading}
          loadingLabel={t('loadingMsg')}
        />

        <div className={marginBottomClass}>
          <button
            type="button"
            className="btn btn-link p-0 text-decoration-none text-start text-uppercase"
            onClick={(event) => {
              event.preventDefault();
              props.onOpenDialog('login');
            }}
          >{t('signup.loginLink')}</button>
        </div>

        <div className="mt-2 captchaBadgeAlt">
          <Trans t={t} i18nKey="signup.reCaptchaLinks">
            Intro Text
            <TextLink
              href="https://policies.google.com/privacy"
              style={{ textDecoration: 'none' }}
            >
              Privacy link
            </TextLink>
            and
            <TextLink
              href="https://policies.google.com/terms"
              style={{ textDecoration: 'none' }}
            >
              Terms of Service
            </TextLink>
            apply.
          </Trans>
        </div>

      </form>
      <ConsentDialog
        open={openPrivacyConsent}
        title={t("privacyConsent.title")}
        content={privacyConsentText}
        cancelBtn={t("privacyConsent.cancelBtn")}
        acceptBtn={t("privacyConsent.acceptBtn")}
        onCancelled={() => {
          setAcceptedPrivacyPolicy(false)
          setOpenPrivacyConsent(false)
        }}
        onConfirmed={() => {
          setAcceptedPrivacyPolicy(true)
          setOpenPrivacyConsent(false)
        }}
      />
      <ConsentDialog
        open={openRecaptchaConsent}
        title={t("recaptchaConsent.title")}
        content={recaptchaConsentText}
        cancelBtn={t("recaptchaConsent.cancelBtn")}
        acceptBtn={t("recaptchaConsent.acceptBtn")}
        onCancelled={() => {
          setReCaptchaAccepted(false)
          setOpenRecaptchaConsent(false)
        }}
        onConfirmed={() => {
          setReCaptchaAccepted(true)
          setOpenRecaptchaConsent(false)
        }}
      />
    </React.Fragment>
  )
}

const Signup: React.FC = () => {
  const { t } = useTranslation(['dialogs']);

  const dialogState = useSelector((state: RootState) => state.dialog)
  const open = dialogState.config?.type === 'signup';

  const dispatch = useDispatch();


  const handleClose = () => {
    dispatch(closeDialog())
  }

  const isLoading = true;

  return (
    <Dialog
      open={open}
      title={t('signup.title')}
      onClose={handleClose}
      ariaLabelledBy="signupDialogTitle"
    >
      <div className={clsx(
        dialogPaddingXClass,
        'py-3',
        'bg-grey-1'
      )}>
        <SignupForm
          isLoading={isLoading}
          onOpenDialog={(dialog) => dispatch(openDialogWithoutPayload(dialog))}
        />
      </div>
    </Dialog>
  );
};

export default Signup;
