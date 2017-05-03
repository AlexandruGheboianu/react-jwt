import React from 'react';
import {Link} from 'react-router';
import PropTypes from 'prop-types';

const HobbyListRow = ({hobby}) => {
  return (
    <tr>
      <td>{hobby.name}</td>
    </tr>
  );
};

HobbyListRow.propTypes = {
  hobby: PropTypes.object.isRequired
};

export default HobbyListRow;
