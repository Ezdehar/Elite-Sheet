import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API.js"


class Detail extends Component {

  state = {
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    errorMessage:""
  }

  handleInputChange = event => {
    const {name, value} = event.target;

    this.setState({
      [name]: value
    });
  }

  handleSubmit = event => {
    event.preventDefault();

    let userData = {
      email: this.state.email,
      password: this.state.password,
      name: this.state.name
    }

    if (!userData.email || !userData.password || !this.state.confirmPassword || !userData.name) {
      this.setState({
        errorMessage: "Please ensure all fields are filled."
      });
      return;
    }

    if (this.state.password !== this.state.confirmPassword) {
      this.setState({
        errorMessage: "Please ensure your passwords match."
      });
      return;
    }

    if (this.state.password.length < 6 ) {
      this.setState({
        errorMessage: "Please ensure your password is at least 6 characters long."
      });
      return;
    }

    API.signup(userData)
    .then((res) => {
      // console.log(res);
      if (res.data.errors) {
        this.setState({
          errorMessage: "There was an error with the server:\n" + res.data.errors[0].message
        })
      } else {
        window.location.replace("/login");
      }
    }).catch((err) => {
      console.log(err);
      this.setState({
        errorMessage: "There was an error. Please try again."
      });
    })
  }

  render() {
    return (
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="/">
            eliteSheets
          </a>
          <button
            className="navbar-toggler"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
    
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Home <span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="/"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false">
                  User
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a className="dropdown-item" href="/login">
                    Login
                  </a>
                  <a className="dropdown-item" href="/signup">
                    Sign up
                  </a>
                  <div className="dropdown-divider" />
                  <a className="dropdown-item" href="/accountinfo">
                    Account Info
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </nav>
        <div className="jumbotron">
          <h1>Sign up for eliteSheets</h1>
            {this.state.errorMessage ? 
              (<p>{this.state.errorMessage}</p>) :
              (<p>Please complete the form below to sign up for eliteSheets.</p>)}
            <form className="signup">
                <div className="form-group">
                    <label htmlFor="inputName">Name</label>
                    <input type="text" 
                           className="form-control" 
                           id="name-input" 
                           placeholder="Name"
                           name="name"
                           onChange={this.handleInputChange}></input>
                </div>
                <div className="form-group">
                    <label htmlFor="inputEmail">Email Address</label>
                    <input type="Email" 
                           className="form-control" 
                           id="email-input" 
                           placeholder="Email"
                           name="email"
                           onChange={this.handleInputChange}></input>
                </div>
                <div className="form-group">
                    <label htmlFor="inputPassword">Password</label>
                    <input type ="password" 
                          className= "form-control" 
                          id="password-input" 
                          placeholder="Password"
                          name="password"
                          onChange={this.handleInputChange}></input>
                </div>
                <div className="form-group">
                    <label htmlFor="inputPassword">Confirm Password</label>
                    <input type ="password" 
                          className= "form-control" 
                          id="confirmPassword-input" 
                          placeholder="Confirm Password"
                          name="confirmPassword"
                          onChange={this.handleInputChange}></input>
                </div>
                <button type="submit" className="btn btn-default" onClick={this.handleSubmit}>Sign Up</button>
            </form>
        </div>
      </div>
    );
  }
}

export default Detail;
