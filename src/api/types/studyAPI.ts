import { SurveyResponse, Survey, SurveyContext, LocalizedString } from "survey-engine/lib/data_types";


export interface SurveyReferenceReq {
  studyKey: string;
  surveyKey: string;
  profileId: string;
}

export interface SurveyResponseReq {
  studyKey: string;
  response: SurveyResponse;
  profileId: string;
}

export interface SurveyAndContextMsg {
  survey: Survey;
  context?: SurveyContext;
  prefill?: SurveyResponse;
}

export interface AssignedSurvey {
  studyKey: string;
  surveyKey: string;
  validFrom?: number;
  validUntil?: number;
  category: string;
  profileId: string;
}

export interface AssignedSurveys {
  surveys: AssignedSurvey[];
  surveyInfos: SurveyInfo[];
}

export interface StudyInfos {
  key: string;
  status: string;
  props: {
    name: LocalizedString[];
    description: LocalizedString[];
    tags?: Array<{ label: LocalizedString[] }>;
    startDate?: number;
    endDate?: number;
    systemDefaultStudy?: boolean;
  };
  stats: {
    participantCount: number;
    responseCount: number;
  }
}

export interface StudyInfoForUser extends StudyInfos {
  profileIds: string[];
}


export interface Studies {
  studies: StudyInfos[];
}

export interface StudiesForUser {
  studies: StudyInfoForUser[];
}

export interface SurveyInfo {
  studyKey: string;
  surveyKey: string;
  name: LocalizedString[];
  description: LocalizedString[];
  typicalDuration: LocalizedString[];
}

export interface SurveyInfos {
  infos: SurveyInfo[];
}
