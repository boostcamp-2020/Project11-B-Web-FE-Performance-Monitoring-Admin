import React from 'react';
import { Box, Typography, Grid, styled } from '@material-ui/core';

interface IProps {
  className: string;
  title: string;
  contents: {
    label: string;
    content: string;
  }[];
}

const ContentBox = styled(Box)({
  backgroundColor: '#F2EEF6',
  paddingLeft: '10px',
  padding: '5px',
});

function TagDetail(props: IProps): React.ReactElement {
  const { className, title, contents } = props;

  return (
    <Box className={className}>
      <Typography variant="h4" color="primary">
        {title}
      </Typography>
      <Box mt={2} display="flex" flexDirection="column" gridGap="5">
        <Grid container direction="column" spacing={1}>
          {contents.map((item) => (
            <Grid container item>
              <Grid item xs={3}>
                <Typography>{item.label}</Typography>
              </Grid>
              <Grid item xs={9}>
                <ContentBox>{item.content}</ContentBox>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default TagDetail;
