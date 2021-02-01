import React from 'react';
import { DefaultRoutes } from '../../../../../types/config/routing';

interface InvitationProps {
  defaultRoutes: DefaultRoutes;
}

const Invitation: React.FC<InvitationProps> = (props) => {
  return (
    <p>Invitation</p>
  );
};

export default Invitation;
