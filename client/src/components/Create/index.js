import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router'
import { createEmployee } from '../../actions';
import { uploadAvatar } from '../../utils';

class CreateEmployee extends Component {
  state = {
    employee: {
      name: '',
      phone: '',
      dob: '',
      doj: '',
      address: '',
      address_type: '',
    }
  };

  updateValue = event => {
    const { employee } = this.state;
    this.setState({
      employee: { ...employee, [`${event.target.name}`]: event.target.value }
    });
  };

  createEmployee = (e) => {
    e.preventDefault();
    const { employee } = this.state;
    createEmployee(employee, this.props.history);
  };

  uploadAvatar = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      uploadAvatar(event.target.files[0], this.setAvatarInState);
    }
  };

  setAvatarInState = (avatar) => {
    const { employee } = this.state;
    this.setState({
      employee: { ...employee, avatar }
    });
  }

  render() {
    const { employee } = this.state;
    console.log('employee', employee)
    return (
      <div>
        <form onSubmit={this.createEmployee}>
          <div class="form-group">
            <label htmlFor='text'>Name:</label>
            <input type="text" id='text' name="name" value={employee.name} onChange={this.updateValue} />

          </div>
          <div class="form-group">
            <label htmlFor='dob'>Date of birth: </label>
            <input type="date" id='dob' name="dob" value={employee.dob} onChange={this.updateValue} />

          </div>
          <div class="form-group">
            <label htmlFor='doj'>Date of join: </label>
            <input type="date" id='doj' name="doj" value={employee.doj} onChange={this.updateValue} />

          </div>
          <div class="form-group">
            <label htmlFor='phone'>Phone: </label>
            <input type="text" id='phone' name="phone" value={employee.phone} onChange={this.updateValue} />
          </div>
          <div class="form-group">
            <label for="address_type">Address Type</label>
            <select class="form-control" id="address_type" name="address_type" value={employee.address_type} onChange={this.updateValue} >
              <option>HOME</option>
              <option>OFFICE</option>
              <option>OTHER</option>
            </select>
          </div>

          <div class="form-group">
            <label htmlFor='address'>Address: </label>
            <input type="text" id='address' name="address" value={employee.address} onChange={this.updateValue} />
          </div>
          <div class="form-group">
            <label htmlFor='avatar'>Avatar</label>

            <img src={employee.avatar} height="100px" width="100px" />
          </div>

          <div className='form-group'>
            <input type="file" id='avatar' onChange={this.uploadAvatar} />
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
        <div><Link to={`/`}><input type='button' value='Go To List Page' /></Link></div>
      </div>
    );
  }
}

export default withRouter(CreateEmployee);
