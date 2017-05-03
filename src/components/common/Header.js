import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as sessionActions from '../../actions/sessionActions';


class Header extends React.Component {
  constructor(props) {
    super();
    this.logOut = this.logOut.bind(this);
  }

  logOut(event) {
    event.preventDefault();
    this.props.actions.logOutUser();
  }

  render() {
    if (this.props.logged_in) {
      return (
        <nav>
          <NavLink to="/" activeClassName="active">Home</NavLink>
          {" | "}
          <NavLink to="/cats" activeClassName="active">Cats</NavLink>
          {" | "}
          <NavLink to="/about" activeClassName="active">About</NavLink>
          {" | "}
          <a href="/logout" onClick={this.logOut}>log out</a>
        </nav>
      );
    } else {
      return (
        <nav>
          <NavLink to="/" activeClassName="active">Home</NavLink>
          {" | "}
          <NavLink to="/cats" activeClassName="active">Cats</NavLink>
          {" | "}
          <NavLink to="/about" activeClassName="active">About</NavLink>
          {" | "}
          <NavLink to="/login" activeClassName="active">log in</NavLink>
        </nav>
      );
    }
  }
}

Header.propTypes = {
  actions: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
  return {logged_in: state.session};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(sessionActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
