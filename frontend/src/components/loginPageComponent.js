import React, { Component } from "react";
import { connect } from "react-redux";
import loginUser from "../actions/user_action";
import { Link } from "react-router-dom";

class loginPageComponent extends Component {
  state = {
    email: "",
    password: "",
    erros: [],
  };
  submitHandler = (e) => {
    e.preventDefault();
    let dataToSubmit = {
      email: this.state.email,
      password: this.state.password,
    };

    if (this.isFormValid(this.state)) {
      this.setState({ erros: [] });
      this.props.dispatch(loginUser(dataToSubmit)).then((res) => {
        if (res.payload.loginSuccess) {
          this.props.history.replace("/");
        } else {
          this.setState({ errors: this.state.erros.concat("Failed to login") });
        }
      });
    }

    console.log("Clicked submit.");
  };

  isFormValid = ({ email, password }) => email && password;

  displayErrors = (errors) => {
    errors.map((error, i) => <p key={i}>{error}</p>);
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="container">
        <h2>Login page</h2>{" "}
        <div className="row">
          <form className="col s12">
            <div className="row">
              <div className="input-field col s12">
                <input
                  type="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  id="email"
                  name="email"
                  className="validate"
                />
                <label htmlFor="email">Email</label>
                <span
                  className="helper-text"
                  data-error="Type a correct email"
                  data-success="right"
                />
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  type="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  id="password"
                  name="password"
                  className="validate"
                />
                <label htmlFor="password">Password</label>
                <span
                  className="helper-text"
                  data-error="Wrong"
                  data-success="right"
                />
              </div>
            </div>

            {this.state.erros.length > 0 && (
              <div>{this.displayErrors(this.state.erros)}</div>
            )}
            <div className="row">
              <div className="col s12">
                <button
                  className="btn waves-effect red lighten-2"
                  type="submit"
                  name="action"
                  onClick={this.submitHandler}
                >
                  Login
                </button>
                &nbsp; &nbsp;
                <Link to="/register">
                  <button
                    className="btn waves-effect red lighten-2"
                    type="submit"
                    name="action"
                  >
                    Sign up
                  </button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(loginPageComponent);
