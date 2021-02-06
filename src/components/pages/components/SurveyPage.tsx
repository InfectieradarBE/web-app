import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Prompt, useHistory, useParams } from 'react-router-dom';
import { getAssignedSurveyRequest, submitSurveyResponseRequest } from '../../../api/studyAPI';
import { SurveyAndContextMsg } from '../../../api/types/studyAPI';
import { Profile } from '../../../api/types/user';
import { getErrorMsg } from '../../../api/utils';
import { useIsAuthenticated } from '../../../hooks/useIsAuthenticated';
import { useLocalization } from '../../../hooks/useLocalization';
import { useUrlQuery } from '../../../hooks/useUrlQuery';
import { RootState } from '../../../store/rootReducer';
import { DefaultRoutes } from '../../../types/config/routing';
import TitleBar from '../../displays/TitleBar';
import { SurveyResponse, SurveySingleItemResponse } from 'survey-engine/lib/data_types';
import { closeSurveyMode, openSurveyMode } from '../../../store/appSlice';
import ConfirmDialog from '../../dialogs/DialogTypes/ConfirmDialog';
import AlertBox from '../../displays/AlertBox';
import SurveyView from '../../survey/SurveyView/SurveyView';


interface SurveyPageProps {
  defaultRoutes: DefaultRoutes;
}

const SurveyPage: React.FC<SurveyPageProps> = (props) => {
  const { t, i18n } = useTranslation(['surveyPage']);
  const dispatch = useDispatch();
  const localize = useLocalization();
  const history = useHistory();
  const isAuth = useIsAuthenticated();

  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  const query = useUrlQuery();
  const profileID = query.get("pid");

  const { studyKey, surveyKey } = useParams<{ surveyKey: string, studyKey: string }>();

  // local state:
  const [surveyAndContext, setSurveyAndContext] = useState<SurveyAndContextMsg | undefined>();
  const [loading, setLoading] = useState(false);
  const [openWarning, setOpenWarning] = useState(false);
  const [currentProfile, setCurrentProfile] = useState<Profile | undefined>();
  const [navigateTo, setNavigateTo] = useState('');
  const [protectRoute, setProtectRoute] = useState(true);

  const currentSurveyName = localize(surveyAndContext?.survey.props?.name);


  useEffect(() => {
    window.scrollTo(0, 0);
    getProfile();
    return () => {
      dispatch(closeSurveyMode());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!currentProfile) {
      return;
    }
    dispatch(openSurveyMode(currentProfile));
    fetchSurveyDef(studyKey, surveyKey, currentProfile.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentProfile, surveyKey, studyKey]);

  useEffect(() => {
    if (!protectRoute) {
      history.replace(navigateTo);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [protectRoute]);



  const getProfile = () => {
    let profile = currentUser.profiles.find(p => p.mainProfile);
    if (profileID) {
      profile = currentUser.profiles.find(p => p.id === profileID);
    }
    if (!profile) {
      profile = currentUser.profiles[0];
    }
    setCurrentProfile(profile);
  }

  const fetchSurveyDef = async (studyKey: string, surveyKey: string, profileID: string) => {
    setLoading(true);
    try {
      const response = await getAssignedSurveyRequest({
        surveyKey: surveyKey,
        studyKey: studyKey,
        profileId: profileID
      });
      console.log(response.data);
      setSurveyAndContext(response.data);
    } catch (e) {
      const err = getErrorMsg(e);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const onSurveySubmit = async (responses: SurveySingleItemResponse[]) => {
    console.log(process.env.REACT_APP_SURVEY_ENGINE_VERSION);
    const now = Math.round(new Date().getTime() / 1000);
    const surveyResponse: SurveyResponse = {
      key: surveyKey,
      submittedAt: now,
      responses: [...responses],
      context: {
        engineVersion: process.env.REACT_APP_SURVEY_ENGINE_VERSION,
      }
    }
    setLoading(true);
    if (!currentProfile) {
      console.error('cannot submit without selected profile');
      return;
    }
    try {
      await submitSurveyResponseRequest({
        studyKey: studyKey,
        profileId: currentProfile?.id,
        response: surveyResponse
      });
      setLoading(false);
      setProtectRoute(false);
      history.push(
        isAuth ? props.defaultRoutes.studyPage : props.defaultRoutes.unauth
      );
    } catch (e) {
      const err = getErrorMsg(e);
      console.error(err);
      setLoading(false);
    }
  }

  const renderContent = () => <React.Fragment>
    <Prompt
      when={protectRoute}
      message={(location, action) => {
        setOpenWarning(true);
        setNavigateTo(location.pathname);
        return false;
      }}
    />
    {openWarning ? <ConfirmDialog
      color="warning"
      open={openWarning}
      title={t('exitSurveyWarningDialog.title')}
      confirmText={t('exitSurveyWarningDialog.confirmBtn')}
      cancelText={t('exitSurveyWarningDialog.cancelBtn')}
      onConfirm={() => {
        setProtectRoute(false);
        setOpenWarning(false);
      }}
      onClose={() => { setOpenWarning(false) }}
    >
      <AlertBox
        type="warning"
        content={t('exitSurveyWarningDialog.warning')}
      />
    </ConfirmDialog> : null}
    {surveyAndContext ?
      <SurveyView
        loading={loading}
        survey={surveyAndContext.survey}
        context={surveyAndContext.context}
        languageCode={i18n.language}
        onSubmit={onSurveySubmit}
        nextBtnText={t('nextBtn')}
        backBtnText={t('backBtn')}
        submitBtnText={t('submitBtn')}
        invalidResponseText={t('notValidQuestion')}
      /> :
      <AlertBox type="danger"
        useIcon={true}
        content={t('noSurveyLoaded')}
      />
    }
  </React.Fragment>

  const loadingContent = () => <div
    className="d-flex align-items-center bg-secondary justify-content-center h-100"
  >
    <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>

  return (
    <React.Fragment>
      <TitleBar
        content={currentSurveyName}
        showAlways={true}
      />
      <div className="container py-3">
        <div className="row">
          <div className="col-12 col-lg-8 offset-lg-2"
            style={{ minHeight: '60vh' }}
          >
            {loading ? loadingContent() : renderContent()}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SurveyPage;
