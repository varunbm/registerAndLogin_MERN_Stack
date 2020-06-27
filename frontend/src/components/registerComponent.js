import React, { Component } from "react";
import registerUser from "../actions/register_user";
import { connect } from "react-redux";

class registerComponent extends Component {
  state = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    cnfpassword: "",
    errors: [],
  };

  displayErrors = (errors) => {
    errors.map((error, i) => <p key={i}>{error}</p>);
  };

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  validate = () => {
    let errors = [];
    let error;
    if (this.isFormEmpty(this.state)) {
      error = { message: "Fill all fields" };
      this.setState({ errors: errors.concat(error) });
    } else if (!this.isPasswordIsValid(this.state)) {
      error = { message: "Password is invalid" };
      this.setState({ errors: errors.concat(error) });
    }
  };

  isPasswordIsValid = ({ password, cnfpassword }) => {
    if (password.length < 6 || cnfpassword.length < 6) {
      return false;
    } else if (password !== cnfpassword) {
      return false;
    } else {
      return true;
    }
  };

  isFormEmpty = ({ firstname, lastname, email, password, cnfpassword }) => {
    return (
      !firstname.length ||
      !lastname.length ||
      !email ||
      !password ||
      !cnfpassword
    );
  };

  submitHandler = (e) => {
    e.preventDefault();
    let dataToSubmit = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      password: this.state.password,
      cnfpassword: this.state.cnfpassword,
    };

    if (this.validate) {
      this.setState({ errors: [] });
      this.props
        .dispatch(registerUser(dataToSubmit))
        .then((res) => {
          if (res.payload.success) {
            this.props.history.replace("/login");
          } else {
            this.setState({
              errors: this.state.errors.concat("Mongodb - Gerneral failure"),
            });
          }
        })
        .catch((err) => {
          this.setState({
            errors: this.state.errors.concat("Mongodb - Gerneral failure"),
          });
          console.log(err);
        });
    } else {
      console.log("Form is not valid");
    }
  };
  render() {
    return (
      <>
        <div className="container">
          <h2>Sign up</h2>
          <div className="row">
            <form className="col s12">
              <div className="row">
                <div className="input-field col s12">
                  <input
                    type="text"
                    name="firstname"
                    value={this.state.firstname}
                    onChange={this.changeHandler}
                    id="firstname"
                    className="validate"
                  />
                  <label htmlFor="firstname">Firstname</label>
                  <span
                    className="helper-text"
                    data-error="Error"
                    data-success="right"
                  />
                </div>
              </div>

              <div className="row">
                <div className="input-field col s12">
                  <input
                    type="text"
                    name="lastname"
                    value={this.state.lastname}
                    onChange={this.changeHandler}
                    id="lastname"
                    className="validate"
                  />
                  <label htmlFor="lastname">Lastname</label>
                  <span
                    className="helper-text"
                    data-error="Error"
                    data-success="right"
                  />
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input
                    type="text"
                    name="email"
                    value={this.state.email}
                    onChange={this.changeHandler}
                    id="email"
                    className="validate"
                  />
                  <label htmlFor="email">Email</label>
                  <span
                    className="helper-text"
                    data-error="Error"
                    data-success="right"
                  />
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.changeHandler}
                    id="password"
                    className="validate"
                  />
                  <label htmlFor="password">Password</label>
                  <span
                    className="helper-text"
                    data-error="Error"
                    data-success="right"
                  />
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input
                    type="password"
                    name="cnfpassword"
                    value={this.state.cnfpassword}
                    onChange={this.changeHandler}
                    id="cnfpassword"
                    className="validate"
                  />
                  <label htmlFor="cnfpassword">Confirm password</label>
                  <span
                    className="helper-text"
                    data-error="Error"
                    data-success="right"
                  />
                </div>
              </div>
              {this.state.errors.length > 0 && (
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
                    Create an account
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}
// function mapStateToProps(state) {
//   return {
//     user: state.user,
//   };
// }

export default connect()(registerComponent);
