import React, { useState } from 'react';
import SurveyCard, { SurveyCardProps } from '../cards/SurveyCard';
import ChevronDown from '../icons/Arrows/ChevronDown';
import ChevronUp from '../icons/Arrows/ChevronUp';

interface OptionalSurveysProps {
  title: string;
  hideBtn: string;
  showBtn: string;
  info: string;
  surveys: Array<SurveyCardProps>;
  openSurvey: (studyKey: string, surveyKey: string, profileId: string) => void;
}

const OptionalSurveys: React.FC<OptionalSurveysProps> = (props) => {
  const [showOptional, setShowOptional] = useState(false);

  const surveyCards = () => props.surveys.map(s => <SurveyCard
    key={s.studyKey + s.surveyKey + s.profiles[0].id}
    {...s}
    onClick={props.openSurvey}
  />)


  return (
    <React.Fragment>
      <div className="border-top-2 border-primary mt-2 pt-2">
        {props.surveys.length > 0 ?
          <button
            className="btn btn-secondary text-primary d-flex align-items-center text-start"
            onClick={() => setShowOptional(prev => !prev)}
          >
            {showOptional ? props.hideBtn : props.showBtn + ` (${props.surveys.length})`}
            <span className="ms-1 d-flex align-items-center">
              {showOptional ? <ChevronUp /> : <ChevronDown />}
            </span>
          </button>
          : null}
      </div>

      {
        showOptional ? <div>
          <div className="border-primary  border-bottom-2 py-2 mb-2">
            <h2 className="m-0">
              {props.title + ':'}
              <span className="text-dark ms-1">{props.surveys.length}</span>
            </h2>
          </div>
          {props.info ? <p>{props.info}</p> : null}
          {surveyCards()}
        </div> : null
      }
    </React.Fragment >
  );
};

export default OptionalSurveys;
