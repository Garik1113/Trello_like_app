import React from "react";
import { Link } from "react-router-dom";
import Header from "../Header.jsx";

export default class Login extends React.Component {
  render() {
    return (
      <div className='login-wrapper'>
        <Header />
        <h2 className='login-title'>Login</h2>
        <form className='login-form'>
          <input type='text' placeholder='email' className='login-input' />
          <input type='text' placeholder='password' className='login-input' />
          <button className='login-btn'>Login</button>
          <br />
          <Link to='/signup' className='signup-link'>
            Don't have an account ?
          </Link>
        </form>
      </div>
    );
  }
}
