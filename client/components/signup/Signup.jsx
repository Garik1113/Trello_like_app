import React from "react";
import { Link } from "react-router-dom";
import Header from "../Header.jsx";
import { ValidInput } from "./validationInput.jsx";
export default class SignUp extends React.Component {
  state = {
    name: "",
    nameError: false,
    email: "",
    emailError: false,
    password: "",
    passwordError: false,
    confirmPassword: "",
    confirmPasswordError: false,
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    this.validateInput(e.target.name);
    // this.validateInput(e.target.name);
  };
  validateInput = (name) => {
    const value = this.state[name];
    console.log(value);
    if (value.length < 4) {
      this.setState({ [`${name}Error`]: true });
    } else {
      this.setState({ [`${name}Error`]: false });
    }
  };
  render() {
    return (
      <div className='login-wrapper'>
        <Header />
        <h2 className='login-title'>Sign Up</h2>
        <form className='login-form'>
          <div>
            <input
              type='text'
              placeholder='Name'
              className='login-input'
              name='name'
              autoComplete='none'
              onChange={this.handleChange}
            />
            {this.state.nameError && <div>Error</div>}
          </div>

          <input
            type='text'
            placeholder='Email'
            className='login-input'
            name='email'
            onChange={this.handleChange}
          />
          <input
            type='text'
            placeholder='Password'
            className='login-input'
            name='password'
            onChange={this.handleChange}
          />
          <input
            type='text'
            placeholder='Confirm Password'
            name='confirmPassword'
            className='login-input'
            onChange={this.handleChange}
          />
          <button className='login-btn'>Sign Up</button>
          <br />
          <Link to='/login' className='signup-link'>
            Have an account ?
          </Link>
        </form>
      </div>
    );
  }
}
