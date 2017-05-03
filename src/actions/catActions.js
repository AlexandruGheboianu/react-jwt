import * as types from './actionTypes';
import catApi from '../api/CatsApi';

export function loadEmployeesSuccess(employees) {
  return {type: types.LOAD_EMPLOYEES_SUCCESS, employees};
}

export function updateCatSuccess(cat) {
  return {type: types.UPDATE_CAT_SUCCESS, cat}
}

export function createEmployeeSuccess(employee) {
  return {type: types.CREATE_EMPLOYEE_SUCCESS, employee}
}

export function deleteCatSuccess(cat) {
  return {type: types.DELETE_CAT_SUCCESS, cat}
}

export function loadEmployees() {
  // make async call to api, handle promise, dispatch action when promise is resolved
  return function(dispatch) {
    return catApi.getAllEmployees().then(employees => {
      dispatch(loadEmployeesSuccess(employees));
    }).catch(error => {
      throw(error);
    });
  };
}

export function updateCat(cat) {
  return function (dispatch) {
    return catApi.updateCat(cat).then(responseCat => {
      dispatch(updateCatSuccess(responseCat));
    }).catch(error => {
      throw(error);
    });
  };
}

export function createEmployee(employee) {
  return function (dispatch) {
    return catApi.createEmployee(employee).then(responseEmployee => {
      dispatch(createEmployeeSuccess(responseEmployee));
      return responseEmployee;
    }).catch(error => {
      throw(error);
    });
  };
}

export function deleteCat(cat) {
  return function(dispatch) {
    return catApi.deleteCat(cat).then(() => {
      console.log(`Deleted ${cat.id}`)
      dispatch(deleteCatSuccess(cat));
      return;
    }).catch(error => {
      throw(error);
    })
  }
}







