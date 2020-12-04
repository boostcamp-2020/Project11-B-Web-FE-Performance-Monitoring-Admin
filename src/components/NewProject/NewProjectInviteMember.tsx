import React from 'react';
import { useHistory } from 'react-router-dom';

import BackNextButtons from './BackNextButtons';

import InviteMember from './InviteMember';

interface IProps {
  handleBack: () => void;
  handleSend: (emails: string[]) => Promise<void>;
}

function NewProjectInviteMember(props: IProps): React.ReactElement {
  const { handleBack, handleSend } = props;

  const history = useHistory();

  const handleFinish = () => history.push('/projects');

  return (
    <>
      <InviteMember handleSend={handleSend} />
      <BackNextButtons rightButtonText="Finish" handleBack={handleBack} handleNext={handleFinish} />
    </>
  );
}

export default NewProjectInviteMember;
