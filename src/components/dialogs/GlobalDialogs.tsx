import React from 'react';
import Login from './GlobalDialogs/Login';
import Signup from './GlobalDialogs/Signup';

interface GlobalDialogsProps {
}

const GlobalDialogs: React.FC<GlobalDialogsProps> = (props) => {
  return (
    <React.Fragment>
      <Login />
      <Signup />
      {/*
      <SignupSuccessDialog />
      <PasswordForgottenDialog />
      <ResetPasswordDialog />
      <EmailVerificationSuccess />
      <SuccessDialog />
      <ErrorDialog />*/}
    </React.Fragment>
  );
};

export default GlobalDialogs;
