import React from 'react';
import {NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';

const EmployeeList = ({employees}) => {
  return (
      <ul className="list-group">
        {employees.map(employee =>
            <li className="list-group-item" key={employee.id}><NavLink
                to={'/employees/' + employee.id}>{employee.firstName + ' '
            + employee.lastName}</NavLink></li>
        )}
      </ul>
  );
};

EmployeeList.propTypes = {
  employees: PropTypes.array.isRequired
};

export default EmployeeList;