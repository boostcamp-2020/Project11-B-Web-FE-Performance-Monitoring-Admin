import React from 'react';
import { Button, ButtonGroup } from '@material-ui/core';

interface IProps {
  leftButtonText?: string;
  rightButtonText?: string;
  disableBack?: boolean;
  disableNext?: boolean;
  handleBack: () => void;
  handleNext: () => void;
}

function BackNextButtons(props: IProps): React.ReactElement {
  const {
    leftButtonText,
    rightButtonText,
    disableBack,
    disableNext,
    handleBack,
    handleNext,
  } = props;

  return (
    <ButtonGroup>
      <Button onClick={handleBack} disabled={disableBack}>
        {leftButtonText}
      </Button>
      <Button onClick={handleNext} disabled={disableNext} variant="contained" color="primary">
        {rightButtonText}
      </Button>
    </ButtonGroup>
  );
}

BackNextButtons.defaultProps = {
  leftButtonText: 'back',
  rightButtonText: 'next',
  disableBack: false,
  disableNext: false,
};

export default BackNextButtons;
