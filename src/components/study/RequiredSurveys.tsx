import React from 'react';
import SurveyCard, { SurveyCardProps } from '../cards/SurveyCard';
import AlertBox from '../displays/AlertBox';

interface RequiredSurveysProps {
  title: string;
  successMessage: string;
  info: string;
  surveys: Array<SurveyCardProps>;
  openSurvey: (studyKey: string, surveyKey: string, profileId: string) => void;
}

const RequiredSurveys: React.FC<RequiredSurveysProps> = (props) => {
  const surveyCards = () => props.surveys.map(s => <SurveyCard
    key={s.studyKey + s.surveyKey + s.profiles[0].id}
    {...s}
    onClick={props.openSurvey}
  />)

  const successCase = () => <AlertBox
    type="success"
    useIcon={true}
    content={props.successMessage}
  />

  const hasSurveys = props.surveys.length > 0;
  return (
    <React.Fragment>
      <div className="border-primary border-top-2 border-bottom-2 py-2 mb-2">
        <h2 className="m-0">
          {props.title + ':'}
          <span className="text-primary ms-1">{props.surveys.length}</span>
        </h2>
      </div>
      {props.info ? <p>{props.info}</p> : null}
      {hasSurveys ? surveyCards() : successCase()}
    </React.Fragment>
  );
};

export default RequiredSurveys;
