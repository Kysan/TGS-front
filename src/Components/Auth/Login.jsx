import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../../Services/userService";

class Login extends Component {
  state = {
    data: { email: "", password: "" },
    apiResponse: "",
  };
  componentDidMount = () => {};

  handleChange = ({ currentTarget: input }) => {
    const { data } = this.state;

    this.setState({ data: { ...data, [input.name]: input.value } });
  };

  handleLoginSuccess = (token, user) => {
    localStorage.token = token;
    this.props.onLogin(user);
    this.props.history.push("/search");
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(this.state.data);
      if (!data) return;
      const { token, user } = data;
      this.handleLoginSuccess(token, user);
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const {
      apiResponse,
      data: { email, password },
    } = this.state;
    return (
      <div class="container mx-auto h-full flex flex-1 justify-center items-center">
        <form
          className="w-full max-w-lg h-auto bg-gray-800 rounded p-5 space-y-5"
          onSubmit={this.handleSubmit}
        >
          <h1>LOGIN</h1>
          <div>
            <div className="">
              <label htmlFor="email">email</label>
              <input
                name="email"
                className="bg-gray-500 rounded w-full"
                value={email}
                onChange={this.handleChange}
              />
            </div>
            <div className="">
              <label htmlFor="password">password</label>
              <input
                name="password"
                type="password"
                className="bg-gray-500 rounded w-full"
                value={password}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <button className="rounded p-1 bg-red-600">Login</button>
          <div>
            Didn't have an account ? <Link to="/register">register</Link>
          </div>

          {apiResponse && (
            <div className="rounded bg-red-600 w-max h-min p-1">
              {" "}
              {apiResponse}
            </div>
          )}
        </form>
      </div>
    );
  }
}

export default Login;
