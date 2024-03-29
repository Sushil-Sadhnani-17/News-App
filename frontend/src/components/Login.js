import React, { Component } from 'react'
import { login } from './userFunctions'

class Login extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      errors: {}
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  onSubmit(e) {
    e.preventDefault()

    const user = {
      email: this.state.email,
      password: this.state.password
    }
    const options = {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch("http://localhost:5000/api/login/", options)
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        if (!responseJson.status) {
          alert(responseJson.message);
          throw new Error("Something went wrong");
        }
        console.log(responseJson);
        alert(responseJson.message);
        window.location.pathname = "/";
        localStorage.setItem("newsAppData", JSON.stringify({
          token: responseJson.jwtToken,
          loggedIn: true
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="container" style={{ marginTop: "50px" }}>
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Enter email"
                  value={this.state.email}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.onChange}
                />
              </div>
              <button
                type="submit"
                className="btn btn-lg btn-primary btn-block"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login