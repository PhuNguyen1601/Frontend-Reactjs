import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import "./Login.scss";
// import { FormattedMessage } from "react-intl";

import { handleLoginApi } from "../../services/userService";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errMessage: "",
    };
  }
  handleOnChangeUsername = (event) => {
    this.setState({
      username: event.target.value,
    });
  };
  handleOnChangePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };
  handleLogin = async () => {
    this.setState({
      errMessage: "",
    });
    try {
      let data = await handleLoginApi(this.state.username, this.state.password);
      if (data && data.errCode !== 0) {
        this.setState({
          errMessage: data.message,
        });
      }
      if (data && data.errCode === 0) {
        this.props.userLoginSuccess(data.user);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          this.setState({
            errMessage: error.response.data.message,
          });
        }
      }
    }
  };
  render() {
    return (
      <div className="login-background">
        <div className="login-container">
          <div className="login-content row">
            <div className="login-box">
              <div className="title-box">LOGIN ADMIN</div>
              <div className="form-login">
                <div className="user-box">
                  <input
                    type="text"
                    value={this.state.username}
                    onChange={(event) => this.handleOnChangeUsername(event)}
                    autoComplete="off"
                    required
                  />
                  <label>Username</label>
                </div>
                <div className="user-box">
                  <input
                    type="password"
                    value={this.state.password}
                    onChange={(event) => this.handleOnChangePassword(event)}
                    autoComplete="off"
                    required
                  />
                  <label>Password</label>
                </div>
                <div className="errMsg">{this.state.errMessage}</div>

                <div className="text-center">
                  <button
                    onClick={() => {
                      this.handleLogin();
                    }}
                  >
                    <span />
                    <span />
                    <span />
                    <span />
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    userLoginFail: () => dispatch(actions.userLoginFail()),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
