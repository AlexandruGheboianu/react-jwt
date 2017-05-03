import React from 'react';
import {Route} from 'react-router-dom'
import App from './components/App';
import HomePage from './components/home/HomePage';
import AboutPage from './components/about/AboutPage';
import EmployeePage from './components/cats/EmployeePage';
import NewEmployeePage from './components/cats/NewEmployeePage';
import LogInPage from './components/LogInPage';
import auth from './auth/authenticator';

export default (
  <Route path="/" component={App}>
    <Route exact path="/home" component={HomePage} />
    <Route path="/login" component={LogInPage} />
    <Route path="/employees" component={EmployeePage} onEnter={requireAuth}>
      <Route path="/employees/new" component={NewEmployeePage} />
      <Route path="/employees/:id" component={EmployeePage} />
    </Route>
    <Route path="/about" component={AboutPage} />
  </Route>
);

function requireAuth(nextState, replace) {
  console.log(auth.loggedIn());
  if (!auth.loggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}
