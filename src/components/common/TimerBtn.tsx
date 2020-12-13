import React, { useState } from 'react';
import SyncIcon from '@material-ui/icons/Sync';
import { Button } from '@material-ui/core';

interface IProps {
  count: number;
  action: () => void;
}

function TimerBtn(props: IProps): React.ReactElement {
  const { count, action } = props;
  const [resetDisable, setResetDisable] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(count);

  const countDown = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    action();
    setResetDisable(true);
    let timerId: any = null;
    let run = count;
    const onInterval = async () => {
      run -= 1;
      setTimer(() => run);
      if (run === 0) {
        clearInterval(timerId);
        setResetDisable(() => false);
        setTimer(() => count);
      }
    };
    timerId = setInterval(onInterval, 1000);
  };

  return (
    <Button
      size="small"
      variant="contained"
      color="primary"
      disabled={resetDisable}
      onClick={countDown}
    >
      {resetDisable ? timer : <SyncIcon />}
    </Button>
  );
}

export default TimerBtn;
