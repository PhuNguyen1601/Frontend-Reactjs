import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorExtraInfo.scss";
import { LANGUAGES } from "../../../utils";
import * as actions from "../../../store/actions";
import { FormattedMessage } from "react-intl";
import { NumericFormat } from "react-number-format";
import "moment/locale/vi";
class DoctorExtraInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDetailInfo: false,
      arrExtraInfoDoctor: [],
    };
  }
  async componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.language !== this.props.language) {
    }
    if (prevProps.doctorIdFromParent !== this.props.doctorIdFromParent) {
      this.props.fetchExtraInfoDoctor(this.props.doctorIdFromParent);
    }
    if (prevProps.extraInfoDoctor !== this.props.extraInfoDoctor) {
      let extraInfoDoctor = this.props.extraInfoDoctor;
      this.setState({
        arrExtraInfoDoctor: extraInfoDoctor,
      });
    }
  }
  showHideDetailInfo = (status) => {
    this.setState({
      isShowDetailInfo: status,
    });
  };
  removeVietnameseTones = (str) => {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g, " ");
    str = str.trim();
    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    str = str.replace(
      /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
      " "
    );
    return str;
  };

  render() {
    let { isShowDetailInfo, arrExtraInfoDoctor } = this.state;
    let { language } = this.props;
    return (
      <div className="doctor-extra-info-container">
        <div className="content-up">
          <div className="text-address">
            <FormattedMessage id="patient.extra-info-doctor.text-address" />
          </div>
          <div className="name-clinic">
            {arrExtraInfoDoctor &&
            arrExtraInfoDoctor.nameClinic &&
            language === LANGUAGES.VI
              ? arrExtraInfoDoctor.nameClinic
              : ""}
            {arrExtraInfoDoctor &&
            arrExtraInfoDoctor.nameClinic &&
            language === LANGUAGES.EN
              ? this.removeVietnameseTones(arrExtraInfoDoctor.nameClinic)
              : ""}
          </div>
          <div className="detail-address">
            {arrExtraInfoDoctor &&
            arrExtraInfoDoctor.addressClinic &&
            language === LANGUAGES.VI
              ? arrExtraInfoDoctor.addressClinic
              : ""}
            {arrExtraInfoDoctor &&
            arrExtraInfoDoctor.addressClinic &&
            language === LANGUAGES.EN
              ? this.removeVietnameseTones(arrExtraInfoDoctor.addressClinic)
              : ""}
          </div>
        </div>
        <div className="content-down">
          {isShowDetailInfo === false ? (
            <div>
              <div className="short-info">
                <FormattedMessage id="patient.extra-info-doctor.price" />
                {arrExtraInfoDoctor &&
                arrExtraInfoDoctor.priceData &&
                language === LANGUAGES.VI &&
                arrExtraInfoDoctor.priceData.valueVi ? (
                  <NumericFormat
                    className="currency"
                    value={arrExtraInfoDoctor.priceData.valueVi}
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={"đ"}
                  />
                ) : (
                  ""
                )}
                {arrExtraInfoDoctor &&
                arrExtraInfoDoctor.priceData &&
                language === LANGUAGES.EN &&
                arrExtraInfoDoctor.priceData.valueEn ? (
                  <NumericFormat
                    className="currency"
                    value={arrExtraInfoDoctor.priceData.valueEn}
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={"$"}
                  />
                ) : (
                  ""
                )}
                <span
                  className="detail"
                  onClick={() => this.showHideDetailInfo(true)}
                >
                  <FormattedMessage id="patient.extra-info-doctor.detail" />
                </span>
              </div>
            </div>
          ) : (
            <>
              <div className="title-price">
                <FormattedMessage id="patient.extra-info-doctor.price" />
              </div>
              <div className="detail-info">
                <div className="price">
                  <span className="left">
                    <FormattedMessage id="patient.extra-info-doctor.prices" />
                  </span>
                  <span className="right">
                    {arrExtraInfoDoctor &&
                    arrExtraInfoDoctor.priceData &&
                    language === LANGUAGES.VI &&
                    arrExtraInfoDoctor.priceData.valueVi ? (
                      <NumericFormat
                        className="currency"
                        value={arrExtraInfoDoctor.priceData.valueVi}
                        displayType={"text"}
                        thousandSeparator={true}
                        suffix={"đ"}
                      />
                    ) : (
                      ""
                    )}
                    {arrExtraInfoDoctor &&
                    arrExtraInfoDoctor.priceData &&
                    language === LANGUAGES.EN &&
                    arrExtraInfoDoctor.priceData.valueEn ? (
                      <NumericFormat
                        className="currency"
                        value={arrExtraInfoDoctor.priceData.valueEn}
                        displayType={"text"}
                        thousandSeparator={true}
                        suffix={"$"}
                      />
                    ) : (
                      ""
                    )}
                  </span>
                </div>
                <div className="note">
                  {arrExtraInfoDoctor &&
                  arrExtraInfoDoctor.note &&
                  language === LANGUAGES.VI
                    ? arrExtraInfoDoctor.note
                    : ""}
                  {arrExtraInfoDoctor &&
                  arrExtraInfoDoctor.note &&
                  language === LANGUAGES.EN
                    ? this.removeVietnameseTones(arrExtraInfoDoctor.note)
                    : ""}
                </div>
              </div>
              <div className="payment">
                <FormattedMessage id="patient.extra-info-doctor.payment" />
                {arrExtraInfoDoctor &&
                arrExtraInfoDoctor.paymentData &&
                arrExtraInfoDoctor.paymentData.valueVi &&
                language === LANGUAGES.VI
                  ? arrExtraInfoDoctor.paymentData.valueVi
                  : ""}
                {arrExtraInfoDoctor &&
                arrExtraInfoDoctor.paymentData &&
                arrExtraInfoDoctor.paymentData.valueEn &&
                language === LANGUAGES.EN
                  ? arrExtraInfoDoctor.paymentData.valueEn
                  : ""}
              </div>
              <div className="hide-price">
                <span onClick={() => this.showHideDetailInfo(false)}>
                  <FormattedMessage id="patient.extra-info-doctor.hide-price" />
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    extraInfoDoctor: state.admin.extraInfoDoctor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchExtraInfoDoctor: (doctorId) =>
      dispatch(actions.fetchExtraInfoDoctor(doctorId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
