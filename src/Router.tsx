import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Issue from './pages/Issue';
import IssueList from './pages/IssueList';
import Discover from './pages/Discover';

//   <Route
//   path="/new-issue"
//   exact={true}
//   component={NewIssuePage}
// />
function PublicRouter(): React.ReactElement {
  return (
    <Switch>
      <Route path="/login" />
    </Switch>
  );
}

function PrivateRouter(): React.ReactElement {
  return (
    <Switch>
      <Route path="/" exact component={IssueList} />
      <Route path="/issue/:id" exact component={Issue} />
      <Route path="/discover" exact component={Discover} />
      {/* <Route path="/alerts" exact /> */}
    </Switch>
  );
}

export { PublicRouter, PrivateRouter };
