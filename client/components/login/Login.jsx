import React from "react";
import { Link } from "react-router-dom";
import Header from "../Header.jsx";
import { login } from "../../actions/userActions";
import { connect } from "react-redux";
import { clearErrors } from "../../actions/errorActions";
import { Redirect } from "react-router";

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    errorMsg: "",
  };
  componentDidMount() {
    this.props.clearErrors();
  }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  login = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    if (!email) {
      return this.setState({ errorMsg: "Enter email" });
    }
    if (!password) {
      return this.setState({ errorMsg: "Enter password" });
    }
    this.setState({ errorMsg: "" });
    const user = { email, password };
    this.props.login(user);
  };
  render() {
    if (this.props.user.token) {
      return <Redirect to="/" />;
    }
    const { errors } = this.props;
    return (
      <div className="login-wrapper">
        <Header />
        <h2 className="login-title">Login</h2>
        <form className="login-form">
          {this.state.errorMsg && (
            <small className="error-msg">{this.state.errorMsg}</small>
          )}
          {errors.data && <small className="error-msg">{errors.data}</small>}

          <input
            type="text"
            placeholder="email"
            name="email"
            onChange={this.handleChange}
            className="login-input"
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            onChange={this.handleChange}
            className="login-input"
          />
          <button className="login-btn" onClick={this.login}>
            Login
          </button>
          <br />
          <Link to="/signup" className="signup-link">
            Don't have an account ?
          </Link>
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  errors: state.errors,
  user: state.user,
});

export default connect(mapStateToProps, { login, clearErrors })(Login);
