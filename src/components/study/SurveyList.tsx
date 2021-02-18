import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { enterStudyReq, getAllAssignedSurveysReq, getAllAvailableStudiesReq, getStudiesForUserReq } from '../../api/studyAPI';
import { AssignedSurvey, StudyInfoForUser, StudyInfos, SurveyInfo } from '../../api/types/studyAPI';
import { RootState } from '../../store/rootReducer';
import { DefaultRoutes } from '../../types/config/routing';
import { SurveyCardProps } from '../cards/SurveyCard';
import OptionalSurveys from './OptionalSurveys';
import RequiredSurveys from './RequiredSurveys';

interface SurveyListProps {
  pageKey: string;
  itemKey: string;
  className?: string;
  defaultRoutes: DefaultRoutes;
}

const SurveyList: React.FC<SurveyListProps> = (props) => {
  const [loading, setLoading] = useState(false);
  const { t, i18n } = useTranslation([props.pageKey]);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const history = useHistory();

  const [subscribedStudies, setSubscribedStudies] = useState<StudyInfos[]>([]);
  const [assignedSurveys, setAssigndSurveys] = useState<AssignedSurvey[]>([]);
  const [surveyInfos, setSurveyInfos] = useState<SurveyInfo[]>([]);

  useEffect(() => {

    fetchStudies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (subscribedStudies.length < 1) {
      return;
    }
    fetchAllAssignedSurveys();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subscribedStudies]);

  const fetchStudies = async () => {
    if (loading) { return; }
    setLoading(true);
    let available: StudyInfos[] = [];
    let subscribed: StudyInfoForUser[] = [];
    try {
      available = (await getAllAvailableStudiesReq()).data.studies;
      subscribed = (await getStudiesForUserReq()).data.studies;
      if (!subscribed) {
        subscribed = [];
      }
    } catch (e) {
      console.error(e.response);
      return;
    }

    let subscribedForAtLeastOne = false;
    for (const study of available) {
      if (study.props.systemDefaultStudy) {
        const userInfosForStudy = subscribed.find(subs => subs.key === study.key);
        const success = await enterStudyForAllProfiles(study.key, userInfosForStudy ? userInfosForStudy.profileIds : []);
        if (success) {
          subscribedForAtLeastOne = true;
        }
      }
    }
    setLoading(false);
    setSubscribedStudies(subscribed.slice());
    if (subscribedForAtLeastOne) {
      await fetchStudies();
    }
  }

  const enterStudyForAllProfiles = async (studyKey: string, alreadySubscribedProfiles: string[]): Promise<boolean> => {
    let counter = 0;
    for (const p of currentUser.profiles) {
      if (alreadySubscribedProfiles.includes(p.id)) {
        continue;
      }
      try {
        await enterStudyReq(studyKey, p.id)
        counter += 1;
      } catch (e) {
        console.log(e.response);
      }
    }
    return counter > 0;
  }

  const fetchAllAssignedSurveys = async () => {
    if (loading) { return; }
    setLoading(true);
    try {
      const response = (await getAllAssignedSurveysReq()).data;
      setAssigndSurveys(response.surveys.slice());
      setSurveyInfos(response.surveyInfos.slice())
    } catch (e) {
      console.error(e.response);
    }
    setLoading(false);
  }

  const activeSurveys = assignedSurveys.filter(s => {
    const now = new Date().getTime() / 1000;
    if (s.validFrom && s.validFrom > now) {
      return false;
    }
    if (s.validUntil && s.validUntil < now) {
      return false;
    }
    return true;
  });

  const cardInfos: SurveyCardProps[] = [];
  for (const s of activeSurveys) {
    // const ind = cardInfos.findIndex(ci => ci.surveyKey === s.surveyKey && ci.studyKey === s.studyKey && ci.category === s.category);
    const ind = -1; // separate card for every profile

    const profile = currentUser.profiles.find(p => p.id === s.profileId);
    if (!profile) {
      console.warn("profile cannot be added")
      continue;
    }
    const currentSurveyInfo = surveyInfos.find(si => si.studyKey === s.studyKey && si.surveyKey === s.surveyKey);
    if (!currentSurveyInfo) {
      continue;
    }
    if (ind > -1) {
      cardInfos[ind].profiles.push({ ...profile });
    } else {
      cardInfos.push({
        ...s,
        profiles: [
          profile
        ],
        selectedLanguage: i18n.language,
        surveyInfos: currentSurveyInfo,
      })
    }
  };

  const sortedCardInfos = cardInfos.sort((a, b) => a.profiles[0].id.localeCompare(b.profiles[0].id));
  const optionalSurveys = sortedCardInfos.filter(s => s.category === 'optional');
  const requiredSurveys = sortedCardInfos.filter(s => s.category !== 'optional');


  const openSurvey = (studyKey: string, surveyKey: string, profileId: string) => {
    history.push(props.defaultRoutes.surveyPage + `/${studyKey}/${surveyKey}?pid=${profileId}`);
  }

  const renderContent = () => <div className={props.className}>
    <RequiredSurveys
      title={t(`${props.itemKey}.requiredSurveys.title`)}
      successMessage={t(`${props.itemKey}.requiredSurveys.successMsg`)}
      info={t(`${props.itemKey}.requiredSurveys.info`)}
      surveys={requiredSurveys}
      openSurvey={openSurvey}
    />
    <OptionalSurveys
      title={t(`${props.itemKey}.optionalSurveys.title`)}
      info={t(`${props.itemKey}.optionalSurveys.info`)}
      hideBtn={t(`${props.itemKey}.optionalSurveys.hideBtn`)}
      showBtn={t(`${props.itemKey}.optionalSurveys.showBtn`)}
      surveys={optionalSurveys}
      openSurvey={openSurvey}
    />
  </div>

  const loadingContent = () => <div
    className="d-flex align-items-center bg-secondary justify-content-center h-100"
    style={{ minHeight: 300 }}>
    <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>


  return (
    <React.Fragment>
      {loading ? loadingContent() : renderContent()}
    </React.Fragment>
  );
};

export default SurveyList;
