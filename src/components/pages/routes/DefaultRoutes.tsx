import React from 'react';
import { Route } from 'react-router-dom';

export const commonRoutes: React.ReactNodeArray = [

];

export const todo = "todo";
/*
import FaqPage from '../pages/FaqPage';
import AboutPage from '../pages/AboutPage';
import PrivacyPage from '../pages/PrivacyPage';
import ResultsPage from '../pages/ResultsPage';
import LinkResolver from '../pages/LinkResolver/LinkResolver';
import LandingPage from '../pages/LandingPage';
import SingleStudyPage from '../pages/SingleStudyPage';
import SettingsPage from '../pages/SettingsPage';
import SurveyPage from '../pages/SurveyPage';
import { useIsAuthenticated } from '../hooks/useIsAuthenticated';
import AccessibilityPage from '../pages/AccessibilityPage';
import DisclaimerPage from '../pages/DisclaimerPage';
import ContactPage from '../pages/ContactPage';
*/

/*
const RootSwitch: React.FC = () => {
  const isAuthenticated = useIsAuthenticated();



  const unAuthRoutes: React.ReactNodeArray = [
    <Route key={AppRoutes.Home} path={AppRoutes.Home} component={LandingPage} />,
    <Redirect key={"redirect"} to={AppRoutes.Home}></Redirect>
  ];

  const authRoutes: React.ReactNodeArray = [
    <Route key={AppRoutes.Home} path={AppRoutes.Home} component={SingleStudyPage} />,
    <Route key={AppRoutes.Survey + '/:studyKey/:surveyKey'} path={AppRoutes.Survey + '/:studyKey/:surveyKey'} component={SurveyPage} />,
    <Route key={AppRoutes.Settings} path={AppRoutes.Settings} component={SettingsPage} />,
    <Redirect key={"redirect"} to={AppRoutes.Home}></Redirect>
  ];

  return (
    <Switch>
      {commonRoutes},
      {isAuthenticated ? authRoutes : unAuthRoutes}
    </Switch>
  );
};

export default RootSwitch;
*/