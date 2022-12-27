import React, { Component } from "react";
// import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import _ from "lodash";
class ModalEditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      email: "",
      password: "",
      fullName: "",
      phoneNumber: "",
      address: "",
      gender: "",
      roleId: "",
    };
  }

  componentDidMount() {
    let user = this.props.currentUser;
    if (user && !_.isEmpty(user)) {
      this.setState({
        id: user.id,
        email: user.email,
        password: "hashcode",
        fullName: user.fullName,
        phoneNumber: user.phoneNumber,
        address: user.address,
      });
    }
  }

  toggle = () => {
    this.props.toggleFromParent();
  };

  handleOnChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  checkValidateInput = () => {
    let isValid = true;
    let arrInput = ["email", "password", "fullName", "phoneNumber", "address"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Missing parameter: " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };

  handleSaveUser = () => {
    //validate
    let isValid = this.checkValidateInput();
    if (isValid === true) {
      //call api
      this.props.editUser(this.state);
    }
  };

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => {
          this.toggle();
        }}
        size="lg"
        centered
        className={"modal-user-container"}
      >
        <ModalHeader
          toggle={() => {
            this.toggle();
          }}
        >
          Edit A User
        </ModalHeader>
        <ModalBody>
          <div className="modal-user-body">
            <div className="input-container">
              <label htmlFor="inputEmail">
                <b>Email</b>
              </label>
              <input
                type="email"
                className="form-control"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "email");
                }}
                value={this.state.email}
                disabled
              />
            </div>
            <div className="input-container ">
              <label htmlFor="inputPassword">
                <b>Password</b>
              </label>
              <input
                type="password"
                className="form-control"
                value={this.state.password}
                onChange={(event) => {
                  this.handleOnChangeInput(event, "password");
                }}
                disabled
              />
            </div>
            <div className="input-container">
              <label htmlFor="inputAddress">
                <b>FullName</b>
              </label>
              <input
                type="text"
                className="form-control"
                value={this.state.fullName}
                onChange={(event) => {
                  this.handleOnChangeInput(event, "fullName");
                }}
              />
            </div>
            <div className="input-container">
              <label htmlFor="inputCity">
                <b>Phone Number</b>
              </label>
              <input
                type="number"
                className="form-control"
                value={this.state.phoneNumber}
                onChange={(event) => {
                  this.handleOnChangeInput(event, "phoneNumber");
                }}
              />
            </div>
            <div className="input-container max-width-input ">
              <label htmlFor="inputAddress2">
                <b>Address</b>
              </label>
              <input
                type="text"
                className="form-control"
                value={this.state.address}
                onChange={(event) => {
                  this.handleOnChangeInput(event, "address");
                }}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="px-3"
            onClick={() => {
              this.handleSaveUser();
            }}
          >
            Save changes
          </Button>{" "}
          <Button
            color="secondary"
            className="px-3"
            onClick={() => {
              this.toggle();
            }}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
