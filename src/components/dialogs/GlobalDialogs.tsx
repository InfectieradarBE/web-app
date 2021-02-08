import React from 'react';
import { DialogConfig } from '../../types/config/dialogs';
import AlertDialog from './GlobalDialogs/AlertDialog';
import ChangeEmail from './GlobalDialogs/ChangeEmail';
import ChangeLanguage from './GlobalDialogs/ChangeLanguage';
import ChangePassword from './GlobalDialogs/ChangePassword';
import DeleteAccount from './GlobalDialogs/DeleteAccount';
import Login from './GlobalDialogs/Login';
import ManageProfiles from './GlobalDialogs/ManageProfiles';
import PasswordForgotten from './GlobalDialogs/PasswordForgotten';
import Signup from './GlobalDialogs/Signup';
import SignupSuccess from './GlobalDialogs/SignupSuccess';

interface GlobalDialogsProps {
  config?: DialogConfig;
  onChangeLanguage: (code: string) => void;
}

const GlobalDialogs: React.FC<GlobalDialogsProps> = (props) => {

  return (
    <React.Fragment>
      <Login />
      <Signup />
      <SignupSuccess />
      <PasswordForgotten />
      <DeleteAccount />
      <AlertDialog />
      <ChangeEmail />
      <ChangePassword />
      <ManageProfiles />
      <ChangeLanguage
        availableLanguages={props.config? props.config.languages : undefined}
        onChangeLanguage={props.onChangeLanguage}
      />
      {/*

      <EmailVerificationSuccess />
      */}
    </React.Fragment>
  );
};

export default GlobalDialogs;
