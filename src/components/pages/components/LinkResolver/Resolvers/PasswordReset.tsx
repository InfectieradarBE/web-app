import React from 'react';
import { DefaultRoutes } from '../../../../../types/config/routing';

interface PasswordResetProps {
  defaultRoutes: DefaultRoutes;
}

const PasswordReset: React.FC<PasswordResetProps> = (props) => {
  return (
    <p>PasswordReset</p>
  );
};

export default PasswordReset;
