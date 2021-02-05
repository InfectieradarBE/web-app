import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import OptionalSurveys from './OptionalSurveys';
import RequiredSurveys from './RequiredSurveys';

interface SurveyListProps {
  pageKey: string;
  itemKey: string;
  className?: string;
}

const SurveyList: React.FC<SurveyListProps> = (props) => {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation([props.pageKey]);

  const renderContent = () => <div className={props.className}>
    <RequiredSurveys
      title={t(`${props.itemKey}.requiredSurveys.title`)}
      successMessage={t(`${props.itemKey}.requiredSurveys.successMsg`)}
      info={t(`${props.itemKey}.requiredSurveys.info`)}
      surveys={[]}
    />
    <OptionalSurveys
      title={t(`${props.itemKey}.optionalSurveys.title`)}
      info={t(`${props.itemKey}.optionalSurveys.info`)}
      hideBtn={t(`${props.itemKey}.optionalSurveys.hideBtn`)}
      showBtn={t(`${props.itemKey}.optionalSurveys.showBtn`)}
      surveys={['test']}
    />
  </div>

  const loadingContent = () => <div
    className="d-flex align-items-center my-3 bg-secondary justify-content-center h-100"
    style={{ minHeight: 300 }}>
    <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>


  return (
    loading ? loadingContent() : renderContent()
  );
};

export default SurveyList;
