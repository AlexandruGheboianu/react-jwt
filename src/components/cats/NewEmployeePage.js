import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';
import * as courseActions from '../../actions/catActions';
import EmployeeForm from './EmployeeForm';
import PropTypes from 'prop-types';

class NewEmployeePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      employee: {firstName: '', lastName: '', email: '', hobby_ids: []},
      saving: false
    };
    this.saveEmployee = this.saveEmployee.bind(this);
    this.updateCatHobbies = this.updateCatHobbies.bind(this);
    this.updateEmployeeState = this.updateEmployeeState.bind(this);
  }

  updateCatHobbies(event) {
    const cat = this.state.cat;
    const hobbyId = event.target.value;
    const hobby = this.props.checkBoxHobbies.filter(
        hobby => hobby.id == hobbyId)[0];
    const checked = !hobby.checked;
    hobby['checked'] = !hobby.checked;
    if (checked) {
      cat.hobby_ids.push(hobby.id);
    } else {
      cat.hobby_ids.splice(cat.hobby_ids.indexOf(hobby.id));
    }

    this.setState({cat: cat});
  }

  updateEmployeeState(event) {
    const field = event.target.name;
    const employee = this.state.employee;
    employee[field] = event.target.value;
    return this.setState({employee: employee});
  }

  saveEmployee(event) {
    event.preventDefault();
    this.props.actions.createEmployee(this.state.employee)
  }

  render() {
    return (
        <div>
          <h1>New employee</h1>
          <EmployeeForm
              employee={this.state.employee}
              hobbies={this.props.checkBoxHobbies}
              onSave={this.saveEmployee}
              onChange={this.updateEmployeeState}
              onHobbyChange={this.updateCatHobbies}/>
        </div>
    );
  }
}

function hobbiesForCheckBoxes(hobbies) {
  return hobbies.map(hobby => {
    hobby['checked'] = false;
    return hobby;
  });
}

NewEmployeePage.propTypes = {
  checkBoxHobbies: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  let checkBoxHobbies = [];
  if (state.hobbies.length > 0) {
    checkBoxHobbies = hobbiesForCheckBoxes(Object.assign([], state.hobbies));
  }

  return {
    checkBoxHobbies: checkBoxHobbies
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewEmployeePage);





