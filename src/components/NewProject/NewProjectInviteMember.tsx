import React from 'react';
import { Box, Typography } from '@material-ui/core';
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
  const descText =
    '프로젝트에 같이 참여하는 팀원이 있나요? 이메일을 통해 팀원을 프로젝트로 초대할 수 있습니다.';

  return (
    <>
      <Typography>{descText}</Typography>
      <InviteMember handleSend={handleSend} />
      <Box pb={2}>
        <BackNextButtons
          rightButtonText="Finish"
          handleBack={handleBack}
          handleNext={handleFinish}
        />
      </Box>
    </>
  );
}

export default NewProjectInviteMember;
