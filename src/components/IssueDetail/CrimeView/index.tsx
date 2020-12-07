import React, { useState, useEffect } from 'react';
import { Box } from '@material-ui/core';

import CrimeHeader from './CrimeHeader';
import CrimeTags from './CrimeTags';
import CrimeStack from './CrimeStack';
import TagDetail from './TagDetail';

import service from '../../../service';

interface IStack {
  _id: string;
  columnNo: string;
  lineNo: string;
  function: string;
  filename: string;
}

interface ICrime {
  _id: string;
  meta: {
    browser: {
      name: string;
      version: string;
    };
    os: {
      name: string;
      version: string;
    };
    url: string;
    ip: string;
  };
  message: string;
  type: string;
  stack: IStack[];
  occuredAt: string;
  sdk: {
    name: string;
    version: string;
  };
}

interface IProps {
  issueId: string;
  errorIds: string[];
}

function CrimeView(props: IProps): React.ReactElement {
  const { issueId, errorIds } = props;

  return (
    <Box>
      <CrimeHeader />
      <CrimeTags />
      <CrimeStack />
      {/* <TagDetail title="USER" content={} />
      <TagDetail title="BROWSER" content={} />
      <TagDetail title="OPERATING SYSTEM" content={} /> */}
    </Box>
  );
}

export default CrimeView;
