import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import loginSvg from "../assets/login.svg";
import dataquestLogo from "../assets/DataQuest.png";
const axios = require("axios");

class Login extends Component {
  state = {
    email: "",
    password: "",
    loggedIn: false,
  };

  componentDidMount = () => {
    localStorage.removeItem("yourTok");
    this.authListener();
  };

  authListener = () => {
    let tok = null;
    tok = localStorage.getItem("yourTok");
    if (tok) {
      this.setState({
        loggedIn: true,
      });
    }
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleUpdate = (e) => {
    e.preventDefault();
    let u = null;
    axios
      .post(`${process.env.REACT_APP_NODEJS_URL}/login`, {
        email: this.state.email,
        password: this.state.password,
      })
      .then((response) => {
        localStorage.setItem("yourTok", response.data.token);
        this.setState({
          loggedIn: true,
        });
      })
      .catch(function (error) {
        console.log(error);
        alert(error.response.data.error)
      });
  };
  
  render() {
    if (this.state.loggedIn) return <Redirect to="competition" />;
    return (
      <>
        <div
          style={{
            background: "#0077b6",
            padding: "0.5em",
            display: "flex",
            margin: "auto",
            justifyContent: "center",
            boxShadow: "0 0 10px",
          }}
        >
          <h1 style={{ width: "fit-content", color: "#ffffff" }}>Dataquest</h1>
          <img
            src={dataquestLogo}
            style={{ height: "50px", marginLeft: "1em" }}
          />
        </div>

        <div className="container-box">
          <div className="sign-in-svg">
            <lottie-player
              src="https://assets4.lottiefiles.com/packages/lf20_8hddy41z.json"
              background="transparent"
              speed="1"
              loop
              autoplay
            ></lottie-player>
          </div>
          <div className="sign-in-container">
            <div className="sign-in">
              <h1
                style={{
                  paddingTop: "30px",
                  paddingBottom: "40px",
                  color: "#03045e",
                }}
              >
                Sign In
              </h1>
            </div>

            <form className="form-sign-in">
              {/* <label htmlFor="email">Email</label> */}
              <div
                class="form-group"
                style={{
                  border: "1px solid darkgrey",
                  marginLeft: "10px",
                  marginRight: "10px",
                  borderRadius: "5px",
                }}
              >
                <input
                  type="text"
                  id="email"
                  placeholder="Email"
                  name="email"
                  onChange={this.handleChange}
                  class="form-control"
                  style={{ padding: "10px" }}
                  required={true}
                />
              </div>

              <div
                class="form-group"
                style={{
                  border: "1px solid darkgrey",
                  marginTop: "20px",
                  marginLeft: "10px",
                  marginRight: "10px",
                  borderRadius: "5px",
                }}
              >
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  name="password"
                  onChange={this.handleChange}
                  class="form-control"
                  style={{ padding: "10px" }}
                  required={true}
                />
              </div>

              <div
                class="custom-control custom-control-alternative custom-checkbox"
                style={{ marginLeft: "15px", textAlign: "left" }}
              ></div>
              <div>
                <a
                  href="https://pulzion.in/forgot-password"
                  style={{ color: "#fff" }}
                >
                  Forgot Password?
                </a>
              </div>
              <br></br>
              <button
                onClick={this.handleUpdate}
                className="btn
           button-sign-in"
                style={{ padding: "10px" }}
              >
                Login
              </button>
                <br/><br/>
                (Details same as Pulzion Website)
            </form>

            <br />
            <br />
          </div>
        </div>
      </>
    );
  }
}

export default Login;
