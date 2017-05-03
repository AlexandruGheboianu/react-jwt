import React from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import EmployeeList from './EmployeeList';
import PropTypes from 'prop-types';
import * as actions from '../../actions/catActions'

class EmployeesPage extends React.Component {
  componentWillMount() {
    if (this.props.employees[0].id == '') {
      this.props.actions.loadEmployees();
    }
  }
  render() {
    const employees = this.props.employees;
    return (
      <div className="col-md-12">
        <h1>Employees <NavLink to={'/employees/new'} className="btn btn-primary">+ employee</NavLink></h1>
        <div className="col-md-4">
          <EmployeeList employees={employees} />
        </div>
        <div className="col-md-8">
          {this.props.children}
        </div>
      </div>
    );
  }
}

EmployeesPage.propTypes = {
  employees: PropTypes.array.isRequired,
  children: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  if (state.employees.content && state.employees.content.length > 0) {
    return {
      employees: state.employees.content
    };
  } else {
    return {
      employees: [{id: '', firstName: '', lastName: '', email: '', hobbies: []}]
    }
  }
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actions, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeesPage);





