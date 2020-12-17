import React, { useState } from 'react';
import { Box, Button, CircularProgress, Typography } from '@material-ui/core';

import CopyClipboardBox from '../common/CopyClipboardBox';
import useProgress from '../../hooks/ProgressHooks';
import service from '../../service';

import CodeSnippet from './CodeSnippet';

interface IProps {
  projectId: string;
}

function NewProjectDSN(props: IProps): React.ReactElement {
  const { projectId } = props;
  const [isCreated, setIsCreated] = useState(false);
  const [showProgress, displayProgress, hideProgress] = useProgress();

  const dsn = `http://panopticon.gq/api/sdk/${projectId}`;

  const congratsText =
    '축하합니다! 새로운 프로젝트가 생성되었어요. 아래에서 프로젝트에 부여된 고유한 주소인 DSN을 확인할 수 있습니다.';
  const descText =
    'npm install pan-opt 명령어를 이용해서 Panopticon SDK를 설치하고, 예시 코드를 참조해서 프로젝트에 Panopticon을 적용해 보세요. 프로젝트에 직접 적용하기 이전에 기능들을 살펴보고 싶다면 샘플 데이터를 생성해 보세요.';
  const createSampleText = '샘플 데이터 생성';

  const handleSampleCreate = async () => {
    displayProgress();
    await service.addSampleCrimes(projectId);
    setIsCreated(true);
    hideProgress();
  };

  return (
    <Box display="flex" flexDirection="column">
      <Typography>{congratsText}</Typography>
      <Box pt={2} pb={2} display="flex" flexDirection="column" alignItems="flex-start">
        <Box display="flex" flexDirection="row" alignItems="center">
          <CopyClipboardBox textContent={dsn} />
          <Box pl={2}>
            {showProgress ? (
              <CircularProgress />
            ) : (
              <Button
                onClick={handleSampleCreate}
                disabled={isCreated}
                color="primary"
                variant="contained"
              >
                {createSampleText}
              </Button>
            )}
          </Box>
        </Box>
      </Box>
      <Typography>{descText}</Typography>
      <CodeSnippet DSN={dsn} />
    </Box>
  );
}

export default NewProjectDSN;
