import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { deleteEmployee, updateEmployee } from '../../actions';
import { formatDate } from '../../utils';

export default class Employee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      name: props.emp.name,
      address:props.emp.attendance,
      phone:props.emp.phone,
      dob:props.emp.dob,
      doj:props.emp.doj
    };
  }
  
  render() {
    const { editing, name, phone, address , dob, doj } = this.state;
    const { index, emp } = this.props;
    console.log('emp ===>', emp)
    return (
      <tr>
        <td>{index + 1}</td>
        <td><Link to={`/employee/${emp.id}`}>{emp.name} </Link></td>
        <td>{emp.phone}</td>
        <td>{emp.attendance}</td>
        <td>{formatDate(emp.dob)}</td>
        <td>{formatDate(emp.doj)}</td>
        <Link to={`/employee/${emp.id}`}><input type='button' value='preview' /></Link>
      </tr>
    );
  }
}
