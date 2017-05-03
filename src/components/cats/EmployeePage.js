import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as catActions from '../../actions/catActions';
import HobbyList from '../hobbies/HobbyList';
import EmployeeForm from './EmployeeForm';
import {browserHistory} from 'react-router-dom';
import PropTypes from 'prop-types';


// import toastr from 'toastr'; 

class EmployeePage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      employee: this.props.employee,
      catHobbies: this.props.catHobbies,
      checkBoxHobbies: props.checkBoxHobbies,
      saving: false,
      isEditing: false
    };
    this.saveEmployee = this.saveEmployee.bind(this);
    this.updateEmployeeState = this.updateEmployeeState.bind(this);
    this.updateCatHobbies = this.updateCatHobbies.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.deleteCat = this.deleteCat.bind(this);
    this.redirect = this.redirect.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.employee.id != nextProps.employee.id) {
      this.setState({employee: nextProps.employee});
    }
    if (this.props.checkBoxHobbies.length < nextProps.checkBoxHobbies.length) {
      this.setState({
        catHobbies: nextProps.catHobbies,
        checkBoxHobbies: nextProps.checkBoxHobbies
      });
    }

    this.setState({saving: false, isEditing: false});
  }

  toggleEdit() {
    this.setState({isEditing: true});
  }

  updateCatHobbies(event) {
    const cat = this.state.cat;
    const hobbyId = event.target.value;
    const hobby = this.state.checkBoxHobbies.filter(
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
    this.setState({saving: true});
    this.props.actions.updateCat(this.state.employee);

  }

  deleteCat(event) {
    this.props.actions.deleteCat(this.state.cat);
  }

  redirect() {
    browserHistory.push('/employees');
  }

  render() {
    if (this.state.isEditing) {
      return (
          <div>
            <h1>Edit employee</h1>
            <EmployeeForm
                employee={this.state.employee}
                hobbies={this.state.checkBoxHobbies}
                onSave={this.saveEmployee()}
                onChange={this.updateEmployeeState()}
                onHobbyChange={this.updateCatHobbies}
                saving={this.state.saving}/>
          </div>
      );
    }
    return (
        <div className="col-md-8 col-md-offset-2">
          <h1>{this.state.employee.name}</h1>
          <p>First name: {this.state.employee.firstName}</p>
          <p>Last name: {this.state.employee.lastName}</p>
          <p>Email: {this.state.employee.email}</p>
          <HobbyList hobbies={this.state.catHobbies}/>
          <button onClick={this.toggleEdit} className="btn btn-default  ">edit
          </button>
          <button onClick={this.deleteCat} className="btn btn-default  ">
            delete
          </button>
        </div>
    );
  }
}

EmployeePage.propTypes = {
  employee: PropTypes.object.isRequired,
  catHobbies: PropTypes.array.isRequired,
  checkBoxHobbies: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function getEmployeeById(employees, id) {
  let employee = employees.find(employee => employee.id == id)
  return Object.assign({}, employee)
}

function hobbiesForCheckBoxes(hobbies, cat = null) {
  return hobbies.map(hobby => {
    if (cat && cat.hobby_ids.filter(hobbyId => hobbyId == hobby.id).length
        > 0) {
      hobby['checked'] = true;
    } else {
      hobby['checked'] = false;
    }
    return hobby;
  });
}

function collectCatHobbies(hobbies, cat) {
  let selected = hobbies.map(hobby => {
    if (cat.hobby_ids.filter(hobbyId => hobbyId == hobby.id).length > 0) {
      return hobby;
    }
  });
  return selected.filter(el => el != undefined)
}

function mapStateToProps(state, ownProps) {
  const stateHobbies = Object.assign([], state.hobbies);
  let checkBoxHobbies = [];
  let catHobbies = [];
  let employee = {firstName: '', lastName: '', email: '', hobby_ids: []};
  const employeeId = ownProps.params.id;
  if (employeeId && state.employees.length > 0 && state.hobbies.length > 0) {
    employee = getEmployeeById(state.employees, ownProps.params.id);
    if (employee.id && employee.hobby_ids.length > 0) {
      checkBoxHobbies = hobbiesForCheckBoxes(stateHobbies, employee);
      catHobbies = collectCatHobbies(stateHobbies, employee);
    } else {
      checkBoxHobbies = hobbiesForCheckBoxes(stateHobbies);
    }
  }
  return {employee: employee, checkBoxHobbies: checkBoxHobbies, catHobbies: catHobbies};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(catActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(EmployeePage);

// connect:
// + will invoke mapDispatchToProps, with an argument of the store's dispatch function
// + it has access to the store, b/c you passed store in via the provider 
// + bindActionCreators will take your collection of action creator functions
// + iterate over it, wrap each AC function in store.dispatch(AC function)
// + make them available to your component as this.props.actions = {name of an action: store.dispatch(ac function)}







