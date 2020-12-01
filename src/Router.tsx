import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Projects from './pages/Projects';
import Issue from './pages/Issue';
import Discover from './pages/Discover';
import IssueDetail from './pages/IssueDetail';

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
      <Route path="/projects" exact component={Projects} />
      <Route path="/issue" exact component={Issue} />
      <Route path="/discover" exact component={Discover} />
      <Route path="/issue/:id" exact component={IssueDetail} />
    </Switch>
  );
}

export { PublicRouter, PrivateRouter };
