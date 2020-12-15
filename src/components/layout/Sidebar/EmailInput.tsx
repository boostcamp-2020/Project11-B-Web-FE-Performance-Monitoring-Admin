import React, { ChangeEvent, KeyboardEvent, FocusEvent, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  input: {
    outline: 'none',
  },
});

interface IProps {
  value: string;
  handleInput: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: KeyboardEvent<HTMLInputElement> & FocusEvent<HTMLInputElement>) => void;
}

function EmailInput(props: IProps): React.ReactElement {
  const inputEl = useRef<HTMLInputElement | null>(null);
  const { value, handleInput, handleSubmit } = props;
  const classes = useStyles();
  useEffect(() => {
    if (inputEl !== null) {
      inputEl.current?.focus();
    }
  }, []);
  return (
    <input
      className={classes.input}
      ref={inputEl}
      type="text"
      value={value}
      onChange={handleInput}
      onKeyPress={handleSubmit}
      onBlur={handleSubmit}
    />
  );
}

export default EmailInput;
