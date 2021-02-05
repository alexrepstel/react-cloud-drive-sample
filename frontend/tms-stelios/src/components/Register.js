import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../actions/authActions";
import classnames from "classnames";


class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, redirect them to drive
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/drive");
    }
    
  }

  componentWillReceiveProps(nextProps) {
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

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history); 
};


  
render() {
    const { errors } = this.state;
return (
  <div className="login-form">

              
              <h4 className="login-title">
                <b>Register</b> 
              </h4>

              <p className="grey-text text-darken-1">
                Already have an account? <Link to="/login">Log in</Link>
              </p>

            <form noValidate onSubmit={this.onSubmit}>
              <div className="">
                <input
                  onChange={this.onChange}
                  value={this.state.name}
                  error={errors.name}
                  id="name"
                  type="text"
                  className="login-input-fields"
                />
                <label for="name">Name</label>
                {
                  errors.name ?
                  <span className="login-error">{errors.name}</span>
                  : null
                }
              </div>
              <div className="register-email-field">
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
                  errors.email ?
                  <span className="login-error">{errors.email}</span>
                  : null
                }
              </div>
              <div className="register-pass-field">
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
                  errors.password ?
                  <span className="login-error">{errors.password}</span>
                  : null
                }
              </div>
              <div className="register-pass-conf-field">
                <input
                  onChange={this.onChange}
                  value={this.state.password2}
                  error={errors.password2}
                  id="password2"
                  type="password"
                  className="login-input-fields"
                />
                <label for="password2">Confirm Password</label>
                {
                  errors.password2 ?
                  <span className="login-error">{errors.password2}</span>
                  : null
                }
              </div>

              <button
                  type="submit"
                  className="login-button"
                >
                  Register
                </button>

            </form>

      </div>
    );
  }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
  });


export default connect(
    mapStateToProps,
    { registerUser }
  )(withRouter(Register));

