import React from 'react';
import AlertDialog from './GlobalDialogs/AlertDialog';
import DeleteAccount from './GlobalDialogs/DeleteAccount';
import Login from './GlobalDialogs/Login';
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
      {/*

      <EmailVerificationSuccess />
      */}
    </React.Fragment>
  );
};

export default GlobalDialogs;
