import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorSchedule.scss";
import { LANGUAGES } from "../../../utils";
import moment from "moment";
import * as actions from "~/store/actions";
import { FormattedMessage } from "react-intl";
import BookingModal from "~/containers/Patient/Doctor/Modal/BookingModal";
import "moment/locale/vi";
class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDays: [],
      selectedSchedule: {},
      arrSchedule: {},
      isOpenModalBooking: false,
      dataScheduleTimeModal: {},
    };
  }
  async componentDidMount() {
    let { language } = this.props;
    let allDays = this.getArrayDays(language);
    this.setState({
      allDays: allDays,
    });
  }

  getArrayDays = (language) => {
    let allDays = [];
    for (let i = 0; i < 7; i++) {
      let object = {};
      if (language === LANGUAGES.VI) {
        if (i === 0) {
          let ddMM = moment(new Date()).format("DD/MM");
          let today = `Hôm nay - ${ddMM}`;
          object.label = today;
        } else {
          let days = moment(new Date()).add(i, "days").format("dddd - DD/MM");
          object.label = days.charAt(0).toUpperCase() + days.slice(1);
        }
      } else {
        if (i === 0) {
          let ddMM = moment(new Date()).format("DD/MM");
          let today = `Today - ${ddMM}`;
          object.label = today;
        } else {
          object.label = moment(new Date())
            .add(i, "days")
            .locale("en")
            .format("ddd - DD/MM");
        }
      }

      object.value = moment(new Date()).add(i, "days").startOf("day").valueOf();
      allDays.push(object);
    }
    return allDays;
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.language !== this.props.language) {
      let allDays = this.getArrayDays(this.props.language);
      this.setState({
        allDays: allDays,
      });
    }
    if (prevProps.allSchedule !== this.props.allSchedule) {
      let scheduleArr = this.props.allSchedule;
      this.setState({
        arrSchedule: scheduleArr,
      });
    }
    if (prevProps.doctorIdFromParent !== this.props.doctorIdFromParent) {
      let allDays = this.getArrayDays(this.props.language);
      let scheduleArr = this.props.allSchedule;
      this.props.fetchScheduleTime(
        this.props.doctorIdFromParent,
        allDays[0].value
      );
      this.setState({
        arrSchedule: scheduleArr,
      });
    }
  }
  handleOnchangeSelect = (event) => {
    if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
      let id = this.props.doctorIdFromParent;
      let value = event.target.value;
      this.props.fetchScheduleTime(id, value);
    }
  };
  handleOnClickScheduleTime = (time) => {
    this.setState({
      isOpenModalBooking: true,
      dataScheduleTimeModal: time,
    });
  };
  closeBookingModal = () => {
    this.setState({
      isOpenModalBooking: false,
    });
  };
  render() {
    let { allDays, arrSchedule } = this.state;
    let { language } = this.props;
    return (
      <>
        <div className="doctor-schedule-container">
          <div className="all-schedule">
            <select onChange={(event) => this.handleOnchangeSelect(event)}>
              {allDays &&
                allDays.length > 0 &&
                allDays.map((item, index) => {
                  return (
                    <option value={item.value} key={index}>
                      {item.label}
                    </option>
                  );
                })}
              x
            </select>
          </div>
          <div className="all-available-time">
            <div className="text-calendar">
              <i className="fas fa-calendar-alt">
                <span>
                  <FormattedMessage id="patient.detail-doctor.schedule" />
                </span>
              </i>
            </div>
            <div className="time-content">
              {arrSchedule && arrSchedule.length > 0 ? (
                <>
                  <div className="time-content-btns">
                    {arrSchedule.map((item, index) => {
                      let timeDisplay =
                        language === LANGUAGES.VI
                          ? item.timeTypeData.valueVi
                          : item.timeTypeData.valueEn;
                      return (
                        <button
                          className={
                            language === LANGUAGES.VI
                              ? "btn btn-vie"
                              : "btn btn-en"
                          }
                          key={index}
                          onClick={() => this.handleOnClickScheduleTime(item)}
                        >
                          {timeDisplay}
                        </button>
                      );
                    })}
                  </div>
                  <div className="book-free">
                    <span>
                      <FormattedMessage id="patient.detail-doctor.choose" />
                      <i className="far fa-hand-point-up"></i>
                      <FormattedMessage id="patient.detail-doctor.book-free" />
                    </span>
                  </div>
                </>
              ) : (
                <div className="schedule-content">
                  <span>
                    <FormattedMessage id="patient.detail-doctor.no-plan" />
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        <BookingModal
          isOpenModal={this.state.isOpenModalBooking}
          closeBookingModal={this.closeBookingModal}
          dataTime={this.state.dataScheduleTimeModal}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    allSchedule: state.admin.allSchedule,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchScheduleTime: (doctorId, date) =>
      dispatch(actions.fetchScheduleTime(doctorId, date)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
