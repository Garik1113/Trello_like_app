import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getProfileData, logOut, toggleUserMenu } from "../actions/userActions";
import { openCreateTeamWindow } from "../actions/teamActions";
class Header extends React.Component {
  componentDidMount() {
    //  this.props.getProfileData();
  }
  render() {
    return (
      <header className="homepage-header">
        <Link to="/" className="logo-link">
          <div className="logo-wrapper"></div>
        </Link>
        {!this.props.isAuthorizated && (
          <div>
            <Link to="/login" className="home-login-link">
              Login
            </Link>
            <Link to="/signup" className="home-login-link">
              Signup
            </Link>
          </div>
        )}
        {this.props.isAuthorizated && (
          <div className="header-auth-btn-wrapper">
            <button
              className="header-auth-add-btn"
              onClick={() => this.props.openCreateTeamWindow()}
            >
              +
            </button>
            {this.props.user && this.props.user.email && (
              <button
                className="header-auth-btn"
                onClick={() => this.props.toggleUserMenu()}
              >
                {this.props.user.email[0].toUpperCase()}
              </button>
            )}

            {/* <Link
              to="/"
              className="home-login-link"
              onClick={this.props.logOut}
            >
              Log Out
            </Link> */}
          </div>
        )}
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthorizated: state.user.isAuthorizated,
  user: state.user.user,
});

export default connect(mapStateToProps, {
  getProfileData,
  logOut,
  openCreateTeamWindow,
  toggleUserMenu,
})(Header);
