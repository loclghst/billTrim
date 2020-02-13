import React, { Component } from 'react';
import { Container } from 'flux/utils';
import { formatDate } from '../../utils';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { deleteEmployee, updateEmployee } from '../../actions';
import EmployeeStore from '../../store/employee';
import './styles.css';

class EmployeeDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      employee: undefined
    };
  }

  componentWillMount() {
    const { employees, match: { params: { id } } } = this.props;
    if (employees && id) {
      this.setCurrentEmployee(employees, id);
    }
  }

  componentWillReceiveProps(props) {
    const { employees, match: { params: { id } } } = props;
    if ((this.props.employees !== employees) && id) {
      this.setCurrentEmployee(employees, id);
    }
  }

  setCurrentEmployee(employees, id) {
    const employee = employees.find(emp => emp.id === id);
    this.setState({
      employee
    });
  }

  deleteEmployee = () => {
    const { id } = this.state.employee;
    deleteEmployee(id);
    this.props.history.push('/');
  };

  toggleEditEmployee = () => {
    const { editing } = this.state;
    this.setState({
      editing: !editing
    });
  };

  updateValue = event => {
    const { employee } = this.state;
    this.setState({
      employee: {
        ...employee,
        [`${event.target.name}`]: event.target.value
      }
    });
  };

  updateEmployee = (e) => {
    console.log('Here')
    e.preventDefault();
    const { name, phone, dob, doj, id } = this.state.employee;
    updateEmployee(name, phone, dob, doj, id);
    this.toggleEditEmployee();
  };

  render() {
    const { employee: emp, editing } = this.state;
    if (editing) {
      return (
        <div>
          <form onSubmit={this.updateEmployee}>

            <div className='form-group'>
              <label htmlFor='name'>
                Name:
            </label>
              <input placeholder="Name" id="name" name="name" value={emp && emp.name} onChange={this.updateValue} />

            </div>
            <div className='form-group'>
              <label htmlFor='phone'>
                Phone:
            </label>
              <input placeholder="phone" id='phone' name="phone" value={emp && emp.phone} onChange={this.updateValue} />

            </div>
            <div className='form-group'>
              <label htmlFor='dob'>
                Date of birth
            </label>
              <input type="date" id='dob' placeholder="dob" name="dob" value={emp && formatDate(emp.dob)} onChange={this.updateValue} />

            </div>
            <div className='form-group'>
              <label htmlFor='doj'>
                Date of Joining:
            </label>
              <input type="date" id='doj' placeholder="doj" name="doj" value={emp && formatDate(emp.doj)} onChange={this.updateValue} />

            </div>
            <button type='submit' >Update Details</button>
          </form>
        </div>
      );
    }
    return (
      <div>
        <div>
          <h1>Details page</h1>
          <div className='flex'>
            <div>
              <img src={emp && emp.avatar} className='details_photo' />
            </div>
            <div>
              <div>Name : {emp && emp.name}</div>
              <div>Phone : {emp && emp.phone}</div>
              <div>Date of birth: {emp && formatDate(emp.dob)}</div>
              <div>Date of joining: {emp && formatDate(emp.doj)}</div>
            </div>
          </div>
        </div>
        <Link to={`/`}><input type='button' value='Go To List Page' /></Link>
        <input type='button' value='delete' onClick={this.deleteEmployee} />
        <input type="button" value="Edit" onClick={this.toggleEditEmployee} />
      </div>
    );
  }
}

function getStores() {
  return [
    EmployeeStore
  ];
}

function getState() {
  return {
    employees: EmployeeStore.getState(),
  };
}

export default Container.createFunctional(withRouter(EmployeeDetail), getStores, getState);
