import React, { useEffect, useRef, useState } from 'react';
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
import { checkPasswordRules } from '../../../utils/passwordRules';

import ReCAPTCHA from 'react-google-recaptcha';

const marginBottomClass = "mb-2";

interface SignupData {
  email: string;
  password: string;
  confirmPassword: string;
  captchaToken?: string;
}

interface SignupFormProps {
  isLoading?: boolean;
  initialSignupData?: SignupData;
  onSubmit: (data: SignupData) => void;
  onOpenDialog: (dialog: 'login') => void;
  error?: string;
  clearError: () => void;
}

const SignupForm: React.FC<SignupFormProps> = (props) => {
  const { t, i18n } = useTranslation(['dialogs']);
  const [signupData, setSignupData] = useState(props.initialSignupData ? props.initialSignupData : {
    email: '',
    password: '',
    confirmPassword: '',
  });

  const privacyConsentText = useTranslatedMarkdown('consent/privacy.md');
  const recaptchaConsentText = useTranslatedMarkdown('consent/recaptcha.md');

  const [openPrivacyConsent, setOpenPrivacyConsent] = useState(false);
  const [openRecaptchaConsent, setOpenRecaptchaConsent] = useState(false);

  const [acceptedPrivacyPolicy, setAcceptedPrivacyPolicy] = useState(false);
  const [reCaptchaAccepted, setReCaptchaAccepted] = useState(false);

  const [showPasswordError, setShowPasswordError] = useState(false);
  const [showConfirmPasswordError, setShowConfirmPasswordError] = useState(false);

  const recaptchaRef = useRef<ReCAPTCHA>(null);

  useEffect(() => {
    setSignupData(props.initialSignupData ? props.initialSignupData : {
      email: '',
      password: '',
      confirmPassword: '',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.initialSignupData])

  const passwordsMatch = () => {
    return signupData.password === signupData.confirmPassword;
  }

  const isDisabled = (): boolean => {
    const passwordRuleOk = checkPasswordRules(signupData.password);
    return !(!props.isLoading && reCaptchaAccepted && acceptedPrivacyPolicy && signupData.email.length > 4 && passwordRuleOk && passwordsMatch());
  }

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!recaptchaRef.current) {
      console.error('issue with recaptcha');
      // props.onFormError('issue with recaptcha');
      return;
    }

    try {
      recaptchaRef.current?.reset();
      const token = await recaptchaRef.current?.executeAsync();
      props.onSubmit({ ...signupData, captchaToken: token ? token : '' });
    } catch (err) {
      // props.onFormError("unexpected error with recaptcha");
    }
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

      <form onSubmit={submit}>
        <TextField
          id="signupEmail"
          label={emailInputLabel}
          placeholder={emailInputPlaceholder}
          type="email"
          name="email"
          autoComplete="off"
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
          hasError={!checkPasswordRules(signupData.password) && showPasswordError}
          errorMsg={t("dialogs:signup.errors.passwordRules")}
          onBlur={() => {
            setShowPasswordError(true)
          }}
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
          errorMsg={t("dialogs:signup.errors.passwordMatch")}
          hasError={!passwordsMatch() && showConfirmPasswordError}
          onBlur={() => {
            setShowConfirmPasswordError(true)
          }}
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

        <AlertBox
          className={marginBottomClass}
          hide={!props.error}
          content={props.error ? props.error : ''}
          type="danger"
          useIcon={true}
          iconSize="2rem"
          closable={true}
          onClose={() => props.clearError()}
        />

        <DialogBtn
          className={marginBottomClass}
          type="submit"
          label={t('signup.signupBtn')}
          disabled={isDisabled()}
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
        {
          reCaptchaAccepted ? <div>
            {process.env.REACT_APP_RECAPTCHA_SITEKEY ?
              <ReCAPTCHA
                sitekey={process.env.REACT_APP_RECAPTCHA_SITEKEY}
                size="invisible"
                hl={i18n.language}
                ref={recaptchaRef} />
              : null}
          </div> : null
        }

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

  const [error, setError] = useState('');

  const dispatch = useDispatch();


  const handleClose = () => {
    setError('')
    dispatch(closeDialog())
  }

  const isLoading = false;

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
          onSubmit={(data) => console.log(data)}
          onOpenDialog={(dialog) => dispatch(openDialogWithoutPayload(dialog))}
          error={error}
          clearError={() => setError('')}
        />
      </div>
    </Dialog>
  );
};

export default Signup;
