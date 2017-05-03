import * as types from './actionTypes';
import sessionApi from '../api/SessionApi';
import auth from '../auth/authenticator';


export function loginSuccess() {
  return {type: types.LOG_IN_SUCCESS}
}

export function loginUser(credentials) {
  return function(dispatch) {
    return sessionApi.login(credentials).then(response => {
      debugger
      console.log(response);
      sessionStorage.setItem('jwt', response.token);
      dispatch(loginSuccess());
    }).catch(error => {
      debugger;
      throw(error);
    });
  };
}

export function logOutUser() {
  auth.logOut();
  return {type: types.LOG_OUT}
}