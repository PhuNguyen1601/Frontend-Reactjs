import React, { Component } from "react";
// import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../utils/emitter";
class ModalUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      fullName: "",
      phoneNumber: "",
      address: "",
      gender: "",
      roleId: "",
    };
    this.listenToEmitter();
  }
  listenToEmitter() {
    emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
      this.setState({
        email: "",
        password: "",
        fullName: "",
        phoneNumber: "",
        address: "",
        gender: "",
        roleId: "",
      });
    });
  }

  componentDidMount() {}

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
    let arrInput = [
      "email",
      "password",
      "fullName",
      "phoneNumber",
      "address",
      "gender",
      "roleId",
    ];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Missing parameter: " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };

  handleAddNewUser = () => {
    //validate
    let isValid = this.checkValidateInput();
    if (isValid === true) {
      //call api
      this.props.createNewUser(this.state);
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
          Create New User
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
                placeholder="Email"
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
                placeholder="Password"
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
                placeholder="Nguyen Phu"
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
                placeholder="City"
              />
            </div>
            <div className="input-container ">
              <label htmlFor="inputState">
                <b>Sex</b>
              </label>
              <select
                onChange={(event) => {
                  this.handleOnChangeInput(event, "gender");
                }}
                value={this.state.gender}
                className="form-control form-select"
              >
                <option defaultValue>Select gender</option>
                <option value="1">Male</option>
                <option value="0">Female</option>
              </select>
            </div>
            <div className="input-container">
              <label htmlFor="inputZip">
                <b>Role</b>
              </label>
              <select
                onChange={(event) => {
                  this.handleOnChangeInput(event, "roleId");
                }}
                value={this.state.roleId}
                className="form-control form-select"
              >
                <option defaultValue>Select role</option>
                <option value="1">Admin</option>
                <option value="2">Doctor</option>
                <option value="3">Patient</option>
              </select>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="px-3"
            onClick={() => {
              this.handleAddNewUser();
            }}
          >
            Add New
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
