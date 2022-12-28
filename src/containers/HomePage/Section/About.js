import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";

class About extends Component {
  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };
  render() {
    return (
      <div className="section-share section-about">
        <div className="section-about-header">
          Truyền thông nói về Chúng tôi
        </div>
        <div className="section-about-content">
          <div className="content-left">
            <iframe
              width="100%"
              height="400px"
              src="https://www.youtube.com/embed/fm1fo1b60Jw"
              title="Chủ tịch FPT Software: Sinh viên IT Việt ngại học sâu nhưng giỏi học cái mới| VTV24"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="content-right">
            <p>
              Đó là nhận định của ông Hoàng Nam Tiến, chủ tịch của FPT Software
              khi nói về nguồn nhân lực IT tại Việt Nam.
              <br /> Chủ tịch FPT Software: Sinh viên IT Việt ngại học sâu nhưng
              giỏi học cái mới | VTV24
            </p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
