import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Issue from './pages/Issue';
import Discover from './pages/Discover';
import IssueDetail from './pages/IssueDetail';

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
      <Route path="/issue" exact component={Issue} />
      <Route path="/discover" exact component={Discover} />
      <Route path="/issue/:id" exact component={IssueDetail} />
    </Switch>
  );
}

export { PublicRouter, PrivateRouter };
