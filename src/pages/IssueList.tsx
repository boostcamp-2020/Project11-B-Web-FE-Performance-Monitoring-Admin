import React from 'react';
import { Link } from 'react-router-dom';

function IssueList(): React.ReactElement {
  return (
    <div>
      <Link to="/">IssueList(home)</Link>
      <Link to="/issue/1">Issue</Link>
      <Link to="/discover">Discover</Link>
    </div>
  );
}

export default IssueList;
