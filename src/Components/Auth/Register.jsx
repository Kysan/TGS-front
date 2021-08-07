import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { API_URL } from "../../app-config";
import { registerUser } from "../../Services/userService";

class Register extends Component {
  state = {
    data: { username: "", emal: "", password: "" },
    apiResponse: "",
  };

  componentDidMount = () => {};

  handleChange = ({ currentTarget: input }) => {
    const { data } = this.state;

    this.setState({ data: { ...data, [input.name]: input.value } });
  };

  handleAccountCreationSuccess = () => {
    setTimeout(() => {
      this.props.history.push("/login");
    }, 2000);
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const user = await registerUser(this.state.data);
    if (!user) return;
    toast.dark("Account created!");
    this.handleAccountCreationSuccess();
  };

  render() {
    const {
      apiResponse,
      data: { username, password, email },
    } = this.state;
    return (
      <div class="container mx-auto h-full flex flex-1 justify-center items-center">
        <form
          className="w-full max-w-lg h-auto bg-gray-800 rounded p-5 space-y-5"
          onSubmit={this.handleSubmit}
        >
          <h1>REGISTER</h1>
          <div>
            <div className="">
              <label htmlFor="username">username</label>
              <input
                name="username"
                className="bg-gray-500 rounded w-full"
                value={username}
                onChange={this.handleChange}
              />
            </div>
            <div className="">
              <label htmlFor="email">email</label>
              <input
                name="email"
                type="mail"
                className="bg-gray-500 rounded w-full"
                value={email}
                onChange={this.handleChange}
              />
            </div>
            <div className="">
              <label htmlFor="username">password</label>
              <input
                name="password"
                type="password"
                className="bg-gray-500 rounded w-full"
                value={password}
                onChange={this.handleChange}
              />
            </div>
          </div>

          <button className="rounded p-1 bg-red-600"> Register</button>

          <div>
            Already have an account ? <Link to="/login">log in</Link>
          </div>

          {apiResponse && (
            <div className="rounded bg-red-600 w-full h-min p-1">
              {" "}
              {apiResponse}
            </div>
          )}
        </form>
      </div>
    );
  }
}

export default Register;
