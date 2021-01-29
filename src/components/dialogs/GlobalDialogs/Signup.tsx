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

const marginBottomClass = "mb-2";

interface SignupFormProps {
}

const SignupForm: React.FC<SignupFormProps> = (props) => {
  const { t } = useTranslation(['dialogs']);
  const privacyConsentText = useTranslatedMarkdown('consent/privacy.md');
  const recaptchaConsentText = useTranslatedMarkdown('consent/recaptcha.md');

  const [openPrivacyConsent, setOpenPrivacyConsent] = useState(false);
  const [openRecaptchaConsent, setOpenRecaptchaConsent] = useState(false);

  const [acceptedPrivacyPolicy, setAcceptedPrivacyPolicy] = useState(false);
  const [reCaptchaAccepted, setReCaptchaAccepted] = useState(false);


  return (
    <React.Fragment>
      <button onClick={() => setOpenPrivacyConsent(true)}> Open</button>
      <form onSubmit={(event) => {
        event.preventDefault();
      }}>

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
        {/*  */}
        <Checkbox
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
  const dialogState = useSelector((state: RootState) => state.dialog)
  const open = dialogState.config?.type === 'signup';

  const dispatch = useDispatch();


  const handleClose = () => {
    dispatch(closeDialog())
  }

  return (
    <Dialog
      open={open}
      title={'TODO: Signup'}
      onClose={handleClose}
      ariaLabelledBy="signupDialogTitle"
    >
      <div className={clsx(
        dialogPaddingXClass,
        'py-3'
      )}>
        <SignupForm />
      </div>
    </Dialog>
  );
};

export default Signup;
