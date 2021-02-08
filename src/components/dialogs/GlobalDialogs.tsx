import React from 'react';
import AlertDialog from './GlobalDialogs/AlertDialog';
import ChangeEmail from './GlobalDialogs/ChangeEmail';
import ChangeEmailReminder from './GlobalDialogs/ChangeNotifications';
import ChangePassword from './GlobalDialogs/ChangePassword';
import DeleteAccount from './GlobalDialogs/DeleteAccount';
import Login from './GlobalDialogs/Login';
import ManageProfiles from './GlobalDialogs/ManageProfiles';
import PasswordForgotten from './GlobalDialogs/PasswordForgotten';
import Signup from './GlobalDialogs/Signup';
import SignupSuccess from './GlobalDialogs/SignupSuccess';

interface GlobalDialogsProps {
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
      <ChangeEmailReminder />
    </React.Fragment>
  );
};

export default GlobalDialogs;
