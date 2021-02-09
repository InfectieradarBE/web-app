import React from 'react';
import AlertDialog from './GlobalDialogs/AlertDialog';
import ChangeEmail from './GlobalDialogs/ChangeEmail';
import ChangeLanguage from './GlobalDialogs/ChangeLanguage';
import ChangeEmailReminder from './GlobalDialogs/ChangeNotifications';
import ChangePassword from './GlobalDialogs/ChangePassword';
import DeleteAccount from './GlobalDialogs/DeleteAccount';
import Login from './GlobalDialogs/Login';
import ManageProfiles from './GlobalDialogs/ManageProfiles';
import PasswordForgotten from './GlobalDialogs/PasswordForgotten';
import Signup from './GlobalDialogs/Signup';
import SignupSuccess from './GlobalDialogs/SignupSuccess';

interface GlobalDialogsProps {
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
        onChangeLanguage={props.onChangeLanguage}
      />
      <ChangeEmailReminder />
    </React.Fragment>
  );
};

export default GlobalDialogs;
