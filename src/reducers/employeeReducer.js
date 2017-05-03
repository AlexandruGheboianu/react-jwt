import * as types from '../actions/actionTypes';
import initialState from './initialState';
import {browserHistory} from 'react-router';


export default function employeeReducer(state = initialState.employees, action) {
  switch(action.type) {
    case types.LOAD_EMPLOYEES_SUCCESS:
     return action.employees;
    case types.CREATE_EMPLOYEE_SUCCESS:
      browserHistory.push(`/employees/${action.employee.id}`);
      return [
        ...state.filter(employee => employee.id !== action.employee.id),
        Object.assign({}, action.employee)
      ];
    case types.UPDATE_CAT_SUCCESS:
      return [
        ...state.filter(cat => cat.id !== action.cat.id),
        Object.assign({}, action.cat)
      ];
    case types.DELETE_CAT_SUCCESS: {
      const newState = Object.assign([], state);
      const indexOfCatToDelete = state.findIndex(cat => {return cat.id == action.cat.id});
      newState.splice(indexOfCatToDelete, 1);
      browserHistory.push('/cats');
      return newState;
    }
    default: 
      return state;
  }
}
