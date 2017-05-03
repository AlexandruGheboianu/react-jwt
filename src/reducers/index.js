import {combineReducers} from 'redux';
import employees from './employeeReducer';
import hobbies from './hobbyReducer';
import session from './sessionReducer';

const rootReducer = combineReducers({
  // short hand property names
  employees,
  hobbies,
  session
})

export default rootReducer;