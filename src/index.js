/*eslint-disable import/default */
import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import App from './components/App';
import HomePage from './components/home/HomePage';
import AboutPage from './components/about/AboutPage';
import EmployeesPage from './components/cats/EmployeesPage';
import NewEmployeePage from './components/cats/NewEmployeePage';
import LogInPage from './components/LogInPage';
import auth from './auth/authenticator';

const store = configureStore();

render(
    <Provider store={store}>
      <BrowserRouter>
        <App>
          <Switch>
            <Route exact path='/' component={HomePage}/>
            <Route path="/login" component={LogInPage} />
            <Route path='/employees' component={EmployeesPage} onEnter={requireAuth}/>
            <Route path="/about" component={AboutPage} />
          </Switch>
        </App>

      </BrowserRouter>
    </Provider>,
    document.getElementById('app')
);

function requireAuth(nextState, replace) {
  console.log(auth.loggedIn());
  if (!auth.loggedIn()) {
    replace({
      pathname: '/login',
      state: {nextPathname: nextState.location.pathname}
    })
  }
}