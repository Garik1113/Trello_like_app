import React from "react";
import { Link } from "react-router-dom";
import Header from "../Header.jsx";
import { connect } from "react-redux";
import { signup } from "../../actions/userActions";
import { Redirect } from "react-router";
import { clearErrors } from "../../actions/errorActions";
class SignUp extends React.Component {
  state = {
    name: "",
    nameError: false,
    email: "",
    emailError: false,
    password: "",
    passwordError: false,
    confirmPassword: "",
    confirmPasswordError: false,
    errorMsg: "",
  };
  componentDidMount() {
    this.props.clearErrors();
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  signup = (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = this.state;
    if (name.length < 3) {
      return this.setState({ errorMsg: "Name length must be between 3 to 16" });
    }
    if (
      !email.match(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      return this.setState({ errorMsg: "Incorrect Email" });
    }
    if (password.length < 3) {
      return this.setState({
        errorMsg: "Password length must be between 3 to 16",
      });
    }
    if (confirmPassword !== password) {
      return this.setState({ errorMsg: "Passwords are not the same" });
    }
    this.setState({ errorMsg: "" });
    const user = { name, email, password, confirmPassword };
    this.props.signup(user);
  };

  render() {
    if (this.props.user.token) {
      return <Redirect to="/" />;
    }
    const { errors } = this.props;
    return (
      <div className="login-wrapper">
        <Header />
        <h2 className="login-title">Sign Up</h2>
        <form className="login-form">
          {this.state.errorMsg && (
            <small className="error-msg">{this.state.errorMsg}</small>
          )}
          {errors.data && <small className="error-msg">{errors.data}</small>}
          <input
            type="text"
            placeholder="Name"
            className="login-input"
            name="name"
            autoComplete="none"
            onChange={this.handleChange}
          />
          <input
            type="text"
            placeholder="Email"
            autoComplete="none"
            className="login-input"
            name="email"
            onChange={this.handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            className="login-input"
            name="password"
            onChange={this.handleChange}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            className="login-input"
            onChange={this.handleChange}
          />
          <button className="login-btn" onClick={this.signup}>
            Sign Up
          </button>
          <br />
          <Link to="/login" className="signup-link">
            Have an account ?
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

export default connect(mapStateToProps, { signup, clearErrors })(SignUp);
