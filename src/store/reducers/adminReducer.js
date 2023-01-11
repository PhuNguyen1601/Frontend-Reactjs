import actionTypes from "../actions/actionTypes";

const initialState = {
  isLoadingGender: false,
  genders: [],
  roles: [],
  positions: [],
  users: [],
  topDoctors: [],
  allDoctors: [],
  infoDoctor: [],
  allScheduleTime: [],
  allSchedule: [],
  allRequiredDoctorInfo: [],
  extraInfoDoctor: [],
  profileDoctor: [],
  allSpecialty: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    //gender
    case actionTypes.FETCH_GENDER_START:
      let copyState = { ...state };
      copyState.isLoadingGender = true;
      return {
        ...copyState,
      };
    case actionTypes.FETCH_GENDER_SUCCESS:
      state.genders = action.data;
      state.isLoadingGender = false;

      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_FAILED:
      state.genders = [];
      state.isLoadingGender = false;
      return {
        ...state,
      };
    //position
    case actionTypes.FETCH_POSITION_SUCCESS:
      state.positions = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_FAILED:
      state.positions = [];
      return {
        ...state,
      };
    //role
    case actionTypes.FETCH_ROLE_SUCCESS:
      state.roles = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_FAILED:
      state.roles = [];
      return {
        ...state,
      };
    //all users
    case actionTypes.FETCH_ALL_USERS_SUCCESS:
      state.users = action.users;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_USERS_FAILED:
      state.users = [];
      return {
        ...state,
      };
    //top doctor
    case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
      state.topDoctors = action.dataDoctors;
      return {
        ...state,
      };
    case actionTypes.FETCH_TOP_DOCTOR_FAILED:
      state.topDoctors = [];
      return {
        ...state,
      };
    //all doctor
    case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
      state.allDoctors = action.dataAllDoctors;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_DOCTOR_FAILED:
      state.allDoctors = [];
      return {
        ...state,
      };
    //info doctor
    case actionTypes.FETCH_INFO_DOCTOR_SUCCESS:
      state.infoDoctor = action.dataInfoDoctor;
      return {
        ...state,
      };
    case actionTypes.FETCH_INFO_DOCTOR_FAILED:
      state.infoDoctor = [];
      return {
        ...state,
      };
    //time schedule
    case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS:
      state.allScheduleTime = action.dataTime;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED:
      state.allScheduleTime = [];
      return {
        ...state,
      };
    //schedule doctor
    case actionTypes.FETCH_SCHEDULE_TIME_SUCCESS:
      state.allSchedule = action.dataSchedule;
      return {
        ...state,
      };
    case actionTypes.FETCH_SCHEDULE_TIME_FAILED:
      state.allSchedule = [];
      return {
        ...state,
      };

    //doctor info
    case actionTypes.FETCH_REQUIRED_DOCTOR_INFO_SUCCESS:
      state.allRequiredDoctorInfo = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_REQUIRED_DOCTOR_INFO_FAILED:
      state.allRequiredDoctorInfo = [];
      return {
        ...state,
      };
    //extra info doctor
    case actionTypes.FETCH_EXTRA_INFO_DOCTOR_SUCCESS:
      state.extraInfoDoctor = action.dataExtraInfoDoctor;
      return {
        ...state,
      };
    case actionTypes.FETCH_EXTRA_INFO_DOCTOR_FAILED:
      state.extraInfoDoctor = [];
      return {
        ...state,
      };
    //profile doctor
    case actionTypes.FETCH_PROFILE_DOCTOR_SUCCESS:
      state.profileDoctor = action.dataProfileDoctor;
      return {
        ...state,
      };
    case actionTypes.FETCH_PROFILE_DOCTOR_FAILED:
      state.profileDoctor = [];
      return {
        ...state,
      };
    //all specialty
    case actionTypes.FETCH_ALL_SPECIALTY_SUCCESS:
      state.allSpecialty = action.dataAllSpecialty;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_SPECIALTY_FAILED:
      state.allSpecialty = [];
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default adminReducer;
