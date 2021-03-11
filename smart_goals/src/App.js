import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Navigation from "./components/navigation";
import Network from "./components/network";
import HomePage from "./components/homepage";
import UserSection from "./components/usersection";
import "./App.css";
import Signin from "./components/signin";
import Register from "./components/register";
import values from "./components/values";
import { connect } from "react-redux";
import { setAluminiSearch } from "./components/redux/actions";
import { searchAlumini } from "./components/redux/reducer";
import { searchFiltered } from "./components/redux/reducer";
import { setFilteredSearch } from "./components/redux/actions";
import { Button } from "@material-ui/core";
import Particles from "react-particles-js";
import { Card } from "@material-ui/core";
import Admin from "./admin";
import { AppBar, Toolbar, IconButton, Tooltip } from "@material-ui/core";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { withRouter } from "react-router-dom";
import UserForm from "./components/userForm";
let prof = "";

const mapStateToProps = (state) => {
  return state;
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      routes: "unsuccess",
      signUp: false,
    };
  }

  componentDidUpdate() {
    fetch("https://smart-network.herokuapp.com/getImage", {
      method: "get",
      headers: { Authentication: "Content-Type:multipart/form-data" },
    })
      .then((response) => response.json())
      .then((data) => {
        for (let i = 0; i < data.values.length; i++) {
          if (
            data.values[i].email === this.props.emailDetails.emailCredentials
          ) {
            prof = data.values[i].image;
            prof = prof.substring(15, prof.length);
            localStorage.setItem("prof", prof);
          }
        }
      })
      .catch((err) => console.log(err));
  }
  componentDidMount() {
    fetch("https://smart-network.herokuapp.com/getImage", {
      method: "get",
      headers: { Authentication: "Content-Type:multipart/form-data" },
    })
      .then((response) => response.json())
      .then((data) => {
        for (let i = 0; i < data.values.length; i++) {
          if (
            data.values[i].email === this.props.emailDetails.emailCredentials
          ) {
            prof = data.values[i].image;
            prof = prof.substring(15, prof.length);
            localStorage.setItem("prof", prof);
          }
        }
      })
      .catch((err) => console.log(err));
  }
  rerender = async (routes) => {
    await this.setState({ routes: routes });
    localStorage.setItem("routes", routes);
  };

  logout = async () => {
    let r;
    await fetch("https://smart-network.herokuapp.com/logout", {
      method: "post",
      headers: { Authentication: "Content-Type:application/json" },
      body: JSON.stringify({}),
    })
      .then((response) => response.json())
      .then((user) => {
        r = user;
        localStorage.setItem("routes", user);
        localStorage.removeItem("prof");
      });
    await this.setState({ routes: r });
  };
  funCalling = () => {
    this.setState({ signUp: !this.state.signUp });
  };

  render() {
    return localStorage.getItem("routes") === "admin" ? (
      <Admin logout={this.logout} />
    ) : localStorage.getItem("routes") === "success" ? (
      <div className=''>
        <AppBar>
          <Toolbar>
            <div>
              <Navigation />
            </div>
            <Button style={{ marginLeft: "auto" }}>
              <Tooltip title={this.props.userNameDetails.userNameCredentials}>
                <IconButton aria-label='Image'>
                  {prof.length ? (
                    <img
                      src={
                        "https://smart-network.herokuapp.com/uploads/" +
                        localStorage.getItem("prof")
                      }
                      alt='profile'
                      height='50'
                      width='50'
                      className='br-100 '
                      style={{ marginLeft: "auto" }}
                    />
                  ) : (
                    <AccountCircleIcon
                      style={{
                        height: "50px",
                        width: "50px",
                        marginLeft: "auto",
                        color: "white",
                      }}
                    />
                  )}
                </IconButton>
              </Tooltip>
              <Tooltip title='Log Out'>
                <Button
                  onClick={this.logout}
                  style={{ marginLeft: "auto", color: "white" }}
                >
                  <ExitToAppOutlinedIcon />
                </Button>
              </Tooltip>
            </Button>
          </Toolbar>
        </AppBar>
        <div className=' '>
          <Switch>
            <Route path='/usersection' component={UserSection} />
            <Route path='/network' component={Network} />
            <Route path='/' component={HomePage} />
          </Switch>
        </div>
      </div>
    ) : (
      <div>
        {!this.state.signUp && this.state.SignUp !== false ? (
          <div class='particles'>
            <Particles
              className='particles'
              params={{
                particles: {
                  number: {
                    value: 45,
                    density: {
                      enable: true,
                      value_area: 800,
                    },
                  },
                },
                shape: {
                  type: "circle",
                  stroke: {
                    width: 1,
                    color: "tomato",
                  },
                },
                size: {
                  value: 8,
                  random: true,
                  anim: {
                    enable: true,
                    speed: 10,
                    size_min: 0.1,
                    sync: true,
                  },
                },
              }}
            />
            <div className='bgds'>
              <Signin
                onEmailChange={this.onEmailChange}
                onStateChange={this.onStateChange}
                rerender={this.rerender}
                funCalling={this.funCalling}
              />
            </div>
          </div>
        ) : (
          <UserForm funCalling={this.funCalling} admin='user' />
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(withRouter(App));
