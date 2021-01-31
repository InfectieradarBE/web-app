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
import { useLogout } from '../../../hooks/useLogout';
import { signupWithEmailRequest } from '../../../api/authAPI';
import { minuteToMillisecondFactor } from '../../../constants';
import { useSetAuthState } from '../../../hooks/useSetAuthState';
import { setAppAuth } from '../../../store/appSlice';
import { setDefaultAccessTokenHeader } from '../../../api/instances/authenticatedApi';
import { userActions } from '../../../store/userSlice';
import { getErrorMsg } from '../../../api/utils';

const marginBottomClass = "mb-2";

interface SignupFormData {
  email: string;
  password: string;
  confirmPassword: string;
  captchaToken?: string;
}

interface SignupFormProps {
  isLoading?: boolean;
  initialSignupData?: SignupFormData;
  onSubmit: (data: SignupFormData) => void;
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
  const { t, i18n } = useTranslation(['dialogs']);

  const instanceId = useSelector((state: RootState) => state.app.instanceId);
  const dialogState = useSelector((state: RootState) => state.dialog)
  const open = dialogState.config?.type === 'signup';

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const setAuthState = useSetAuthState();
  const logout = useLogout();


  const handleClose = () => {
    setError('')
    setLoading(false)
    dispatch(closeDialog())
  }

  const closeWithSuccess = () => {
    setError('')
    setLoading(false)
    dispatch(openDialogWithoutPayload('signupSuccess'));
  }


  const handleSignup = async (data: SignupFormData) => {
    if (loading) return;
    logout();
    try {
      setLoading(true);

      const response = await signupWithEmailRequest({
        email: data.email,
        password: data.password,
        instanceId: instanceId,
        preferredLanguage: i18n.language,
        wantsNewsletter: true,
        use2fa: true
      }, data.captchaToken);

      // TODO: update user correctly
      setAuthState(response.data, {
        id: '',
        account: {
          type: 'email',
          accountId: data.email,
          accountConfirmedAt: 0,
          preferredLanguage: "en",
        },
        roles: [],
        contactPreferences: { subscribedToNewsletter: false, sendNewsletterTo: [], subscribedToWeekly: true, receiveWeeklyMessageDayOfWeek: 0 },
        contactInfos: [],
        profiles: [],
        timestamps: {
          createdAt: 0,
          updatedAt: 0,
          lastLogin: 0,
          lastTokenRefresh: 0,
        },
      })
      let tokenRefreshedAt = new Date().getTime();

      dispatch(setAppAuth({
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
        expiresAt: tokenRefreshedAt + response.data.expiresIn * minuteToMillisecondFactor,
      }));

      setDefaultAccessTokenHeader(response.data.accessToken);

      dispatch(userActions.setFromTokenResponse(response.data));
      setLoading(false);
      closeWithSuccess();
    } catch (e) {
      console.log(e.response);
      if (!e.response) {
        handleError('request failed');
      } else if (e.response.status === 404) {
        handleError('not found');
      } else {
        const errMsg = getErrorMsg(e);
        handleError(errMsg);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleError = (error?: string) => {
    switch (error) {
      case 'email not valid':
        setError(t("dialogs:signup.errors.invalidEmail"));
        break;
      case 'user creation failed':
        setError(t("dialogs:signup.errors.userCreationFailed"));
        break;
      case 'not found':
        setError(t("dialogs:signup.errors.noRegistrationAllowed"));
        break;
      default:
        setError(t("dialogs:signup.errors.unknown"));
        break;
    }

  }

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
          isLoading={loading}
          onSubmit={(data) => handleSignup(data)}
          onOpenDialog={(dialog) => dispatch(openDialogWithoutPayload(dialog))}
          error={error}
          clearError={() => setError('')}
        />
      </div>
    </Dialog>
  );
};

export default Signup;
