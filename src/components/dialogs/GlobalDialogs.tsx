import React from 'react';
import Login from './GlobalDialogs/Login';

interface GlobalDialogsProps {
}

const GlobalDialogs: React.FC<GlobalDialogsProps> = (props) => {
  return (
    <React.Fragment>
      <Login />
      {/*<SignupDialog />
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
