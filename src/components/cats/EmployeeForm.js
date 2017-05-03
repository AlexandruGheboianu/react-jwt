import React from 'react';
import TextInput from '../common/TextInput';
import CheckBox from '../common/CheckBox';
import PropTypes from 'prop-types';

class EmployeeForm extends React.Component {
  constructor(props) {
    super(props);
    this.makeCheckBoxes = this.makeCheckBoxes.bind(this);
  }

  makeCheckBoxes() {
    return this.props.hobbies.map(hobby => {
      return <CheckBox item={hobby} handleChange={this.props.onHobbyChange} key={hobby.id}/>
    })
  }

  render() {
    const boxes = this.makeCheckBoxes();
    return (
      <div>
        <form>
          <TextInput
            name="firstName"
            label="First name"
            value={this.props.employee.firstName}
            onChange={this.props.onChange}/>

          {boxes}

          <TextInput
            name="lastName"
            label="Last name"
            value={this.props.employee.lastName}
            onChange={this.props.onChange}/>

          <TextInput
            name="email"
            label="Email"
            value={this.props.employee.email}
            onChange={this.props.onChange}/>


          <input
            type="submit"
            disabled={this.props.saving}
            value={this.props.saving ? 'Saving...' : 'Save'}
            className="btn btn-primary"
            onClick={this.props.onSave}/>
        </form>
      </div>
  );
  }
}

EmployeeForm.propTypes = {
  employee: PropTypes.object.isRequired,
  hobbies: PropTypes.array.isRequired,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onHobbyChange: PropTypes.func.isRequired,
  saving: PropTypes.bool
};

export default EmployeeForm;
