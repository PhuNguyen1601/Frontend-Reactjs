import React, { Component } from "react";
import { connect } from "react-redux";
import "./ProfileDoctor.scss";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";
import * as actions from "~/store/actions";
import { NumericFormat } from "react-number-format";
import _ from "lodash";
import moment from "moment";
import "moment/locale/vi";

class ProfileDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileDoctor: {},
    };
  }
  async componentDidMount() {
    let id = this.props.doctorId;
    if (id) {
      this.props.fetchProfileDoctor(id);
      let arrProfileDoctor = this.props.profileDoctor;
      this.setState({
        profileDoctor: arrProfileDoctor,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.language !== this.props.language) {
    }
    if (prevProps.profileDoctor !== this.props.profileDoctor) {
      let arrProfileDoctor = this.props.profileDoctor;
      this.setState({
        profileDoctor: arrProfileDoctor,
      });
    }
  }
  renderTimeBooking = (dataTime) => {
    let { language } = this.props;
    if (dataTime && !_.isEmpty(dataTime)) {
      let days = moment.unix(+dataTime.date / 1000).format("dddd - DD/MM/YYYY");
      let date =
        language === LANGUAGES.VI
          ? days.charAt(0).toUpperCase() + days.slice(1)
          : moment
              .unix(+dataTime.date / 1000)
              .locale("en")
              .format("ddd - DD/MM/YYYY");
      let time =
        language === LANGUAGES.VI
          ? dataTime.timeTypeData.valueVi
          : dataTime.timeTypeData.valueEn;
      return (
        <>
          <div>
            {time} - {date}
          </div>
          <div className="booking-free">
            <FormattedMessage id="patient.profile-doctor.free-booking" />
          </div>
        </>
      );
    }
    return <></>;
  };
  render() {
    let { profileDoctor } = this.state;
    let { language, isShowDescriptionDoctor, dataTime } = this.props;
    let nameVi = "";
    let nameEn = "";
    if (profileDoctor && profileDoctor.positionData) {
      nameVi = `${profileDoctor.positionData.valueVi}, ${profileDoctor.fullName}`;
      nameEn = `${profileDoctor.positionData.valueEn}, ${profileDoctor.fullName}`;
    }

    return (
      <div className="profile-doctor-content">
        <div className="intro-doctor">
          <div
            className="content-left"
            style={{
              backgroundImage: `url(${
                profileDoctor.image && profileDoctor.image
                  ? profileDoctor.image
                  : ""
              })`,
            }}
          ></div>
          <div className="content-right">
            <div className="up">
              {language === LANGUAGES.VI ? nameVi : nameEn}
            </div>
            <div className="down">
              {isShowDescriptionDoctor === true ? (
                <>
                  {profileDoctor.Markdown &&
                    profileDoctor.Markdown.description && (
                      <span>{profileDoctor.Markdown.description}</span>
                    )}
                </>
              ) : (
                <>{this.renderTimeBooking(dataTime)}</>
              )}
            </div>
          </div>
        </div>
        <div className="price">
          <FormattedMessage id="patient.extra-info-doctor.price" />{" "}
          {profileDoctor &&
            profileDoctor.Doctor_Info &&
            language === LANGUAGES.VI && (
              <NumericFormat
                className="currency"
                value={profileDoctor.Doctor_Info.priceData.valueVi}
                displayType={"text"}
                thousandSeparator={true}
                suffix={"đ"}
              />
            )}
          {profileDoctor &&
            profileDoctor.Doctor_Info &&
            language === LANGUAGES.EN && (
              <NumericFormat
                className="currency"
                value={profileDoctor.Doctor_Info.priceData.valueEn}
                displayType={"text"}
                thousandSeparator={true}
                suffix={"$"}
              />
            )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    profileDoctor: state.admin.profileDoctor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProfileDoctor: (doctorId) =>
      dispatch(actions.fetchProfileDoctor(doctorId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
