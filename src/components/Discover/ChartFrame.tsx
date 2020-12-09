import React from 'react';
import { Grid, Theme } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    chart: {
      border: '2px solid black',
      borderColor: theme.palette.text.secondary,
      margin: '20px',
      backgroundColor: 'white',
      borderRadius: '10px',
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }),
);

interface IProps {
  children: React.ReactElement;
  xs?: boolean | 'auto' | 12 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | undefined;
}

function IssueDetailSideBar({ children, xs }: IProps): React.ReactElement {
  const styles = useStyle();
  return (
    <Grid item xs={xs} className={styles.chart}>
      {children}
    </Grid>
  );
}
IssueDetailSideBar.defaultProps = {
  xs: 'auto',
};

export default IssueDetailSideBar;
