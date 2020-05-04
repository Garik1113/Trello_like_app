import React from "react";
import { Link } from "react-router-dom";
export default class Header extends React.Component {
  render() {
    return (
      <header className='homepage-header'>
        <Link to='/' className='logo-link'>
          <div className='logo-wrapper'></div>
        </Link>
        <div>
          <Link to='/login' className='home-login-link'>
            Login
          </Link>
          <Link to='/signup' className='home-login-link'>
            Signup
          </Link>
        </div>
      </header>
    );
  }
}
