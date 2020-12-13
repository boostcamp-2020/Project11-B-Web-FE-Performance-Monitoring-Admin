import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import NewProject from './pages/NewProject';
import Login from './pages/Login';
import Issue from './pages/Issue';
import Discover from './pages/Discover';
import Visits from './pages/Visits';
import IssueDetail from './pages/IssueDetail';
import InviteProject from './pages/InviteProject';
import Analysis from './pages/Analysis';

function PublicRouter(): React.ReactElement {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/accept" component={InviteProject} />
      <Route path="/auth" />
      <Route path="*">
        <Redirect to="/" />
      </Route>
    </Switch>
  );
}

function PrivateRouter(): React.ReactElement {
  return (
    <Switch>
      <Route path="/projects/new" exact component={NewProject} />
      <Route path="/projects" exact component={Projects} />
      <Route path="/project/:id" exact component={ProjectDetail} />
      <Route path="/issue" exact component={Issue} />
      <Route path="/discover" exact component={Discover} />
      <Route path="/visits" exact component={Visits} />
      <Route path="/issue/:id" exact component={IssueDetail} />
      <Route path="/analysis" exact component={Analysis} />
      <Route path="/">
        <Redirect to="/projects" />
      </Route>
    </Switch>
  );
}

export { PublicRouter, PrivateRouter };
