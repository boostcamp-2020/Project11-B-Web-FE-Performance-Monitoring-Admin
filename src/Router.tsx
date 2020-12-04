import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import NewProject from './pages/NewProject';
import Login from './pages/Login';
import Issue from './pages/Issue';
import Discover from './pages/Discover';
import IssueDetail from './pages/IssueDetail';

function PublicRouter(): React.ReactElement {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
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
      <Route path="/issue/:id" exact component={IssueDetail} />
      <Route path="/">
        <Redirect to="/projects" />
      </Route>
    </Switch>
  );
}

export { PublicRouter, PrivateRouter };
