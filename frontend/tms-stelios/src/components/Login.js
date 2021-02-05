import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";
import classnames from "classnames";


class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/drive"); // push user to drive when they login
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }

  }

  onChange = e => {
      this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
        e.preventDefault();

        const userData = {
          email: this.state.email,
          password: this.state.password
        };

        this.props.loginUser(userData); 
  };


render() {
    const { errors } = this.state;


return (
      <div className="login-form">

              <h4 className="login-title">
                <b>Login</b> 
              </h4>


            <form noValidate onSubmit={this.onSubmit}>
              <div className="">
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className="login-input-fields"
                />
                <label for="email">Email</label>
                {
                  errors.email || errors.emailnotfound ?
                  <span className="login-error">
                    {errors.email}
                    {errors.emailnotfound}
                  </span>
                  :
                  null
                }
              </div>


              <div className="login-pass-field">
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className="login-input-fields"
                />
                <label for="password">Password</label>
                {
                  errors.password || errors.passwordincorrect ?
                <span className="login-error">
                  {errors.password}
                  {errors.passwordincorrect}
                </span>
                :
                null
                }
              </div>


                <button
                  type="submit"
                  className="login-button"
                >
                  Login
                </button>

            </form>


            <Link to="/register">
            <p className="login-form-register-msg">Need to register? Click here!</p>
            </Link>
      </div>
    );
  }
}
Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
  });
  export default connect(
    mapStateToProps,
    { loginUser }
  )(Login);