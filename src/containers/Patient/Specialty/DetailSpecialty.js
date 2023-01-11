import React, { Component } from "react";
import { connect } from "react-redux";
import "./DetailSpecialty.scss";
import { LANGUAGES } from "../../../utils";
// import * as actions from "../../../store/actions";
import { FormattedMessage } from "react-intl";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfo from "../Doctor/DoctorExtraInfo";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import { getDetailSpecialtyByIdService } from "~/services/userService";
import HomeHeader from "~/containers/HomePage/HomeHeader";

class DetailSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctorId: [],
      dataDetailSpecialty: {},
    };
  }
  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;

      let res = await getDetailSpecialtyByIdService({
        id: id,
        location: "ALL",
      });
      console.log("check res", res);
      if (res && res.errCode === 0) {
        this.setState({
          dataDetailSpecialty: res.data,
        });
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.language !== this.props.language) {
    }
  }

  render() {
    let { arrDoctorId } = this.state;
    return (
      <div className="detail-specialty-container">
        <HomeHeader />
        <div className="detail-specialty-body">
          <div className="description-specialty">sdaasdas</div>

          {arrDoctorId.map((item, index) => {
            return (
              <div className="each-doctor" key={index}>
                <div className="dt-content-left">
                  <div className="profile-doctor">
                    <ProfileDoctor
                      doctorId={item}
                      isShowDescriptionDoctor={true}
                      // dataTime={dataTime}
                    />
                  </div>
                </div>
                <div className="dt-content-right">
                  <div className="doctor-schedule">
                    <DoctorSchedule doctorIdFromParent={item} />
                  </div>
                  <div className="doctor-extra-info">
                    <DoctorExtraInfo doctorIdFromParent={item} />
                  </div>
                </div>
              </div>
            );
          })}
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
