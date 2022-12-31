import React, { Component } from "react";
// import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./TableManageUser.scss";
import * as actions from "../../../store/actions";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import "./ManageDoctor.scss";
import Select from "react-select";
import { LANGUAGES } from "../../../utils";
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentMarkdown: "",
      contentHTML: "",
      selectedDoctor: "",
      description: "",
      listDoctors: [],
      hasOldData: false,
    };
  }
  componentDidMount() {
    this.props.fetchAllDoctors();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
      this.setState({
        allDoctors: dataSelect,
      });
    }
    if (prevProps.markdownDoctor !== this.props.markdownDoctor) {
      let arrMarkdown = this.props.markdownDoctor;
      if (arrMarkdown !== false) {
        this.setState({
          description: arrMarkdown.description,
          contentHTML: arrMarkdown.contentHTML,
          contentMarkdown: arrMarkdown.contentMarkdown,
          hasOldData: true,
        });
      } else {
        this.setState({
          description: "",
          contentHTML: "",
          contentMarkdown: "",
          hasOldData: false,
        });
      }
    }
  }

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
  };
  handleSaveContentMarkdown = () => {
    this.props.saveDetailDoctor({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      doctorId: this.state.selectedDoctor.value,
    });
  };
  handleChangeSelect = (selectedDoctor) => {
    this.setState({
      selectedDoctor,
    });
    this.props.fetchMarkdownDoctor(selectedDoctor.value);
  };
  handleOnChangeDesc = (event) => {
    this.setState({
      description: event.target.value,
    });
  };
  buildDataInputSelect = (inputData) => {
    let result = [];
    // let { language } = this.props;
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        object.label = item.fullName;
        object.value = item.id;
        result.push(object);
      });
    }
    return result;
  };
  render() {
    let { hasOldData } = this.state;
    return (
      <div className="manage-doctor-container">
        <div className="title manage-doctor-title">
          Tạo thêm thông tin bác sĩ
        </div>
        <div className="more-infor">
          <div className="row">
            <div className="content-left form-group col-5">
              <label>Chọn bác sĩ</label>
              <Select
                value={this.state.selectedDoctor}
                onChange={this.handleChangeSelect}
                options={this.state.allDoctors}
              />
            </div>
            <div className="content-right form-group col-7">
              <label>Thông tin giới thiệu</label>
              <textarea
                className="form-control"
                rows="4"
                onChange={(event) => this.handleOnChangeDesc(event)}
                value={this.state.description}
              ></textarea>
            </div>
          </div>
        </div>
        <div className="manage-doctor-editor">
          <MdEditor
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
            value={this.state.contentMarkdown}
          />
        </div>
        <button
          className={
            hasOldData === true
              ? "save-content-doctor btn btn-warning"
              : "create-content-doctor btn btn-primary"
          }
          onClick={() => this.handleSaveContentMarkdown()}
        >
          {hasOldData === true ? (
            <span>Lưu thông tin</span>
          ) : (
            <span>Tạo thông tin</span>
          )}
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allDoctors: state.admin.allDoctors,
    markdownDoctor: state.admin.markdownDoctor,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
    saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
    fetchMarkdownDoctor: (id) => dispatch(actions.fetchMarkdownDoctor(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
