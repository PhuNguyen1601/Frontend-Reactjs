import actionTypes from "./actionTypes";
import {
  getAllCodeService,
  createNewUserService,
  getAllUsers,
  deleteUserService,
  editUserService,
  getTopDoctorHomeService,
  getAllDoctorsService,
  saveDetailDoctorService,
  getMarkdownDoctorService,
} from "../../services/userService";
import { toast } from "react-toastify";

//gender
export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("GENDER");
      if (res && res.errCode === 0) {
        dispatch(fetchGenderSuccess(res.data));
      } else {
        dispatch(fetchGenderFailed());
      }
    } catch (e) {
      dispatch(fetchGenderFailed());
      console.log("fetchGenderStart error", e);
    }
  };
};
export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
});

export const fetchGenderFailed = () => ({
  type: actionTypes.FETCH_GENDER_FAILED,
});

//position
export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("POSITION");
      if (res && res.errCode === 0) {
        dispatch(fetchPositionSuccess(res.data));
      } else {
        dispatch(fetchPositionFailed());
      }
    } catch (e) {
      dispatch(fetchPositionFailed());
      console.log("fetchPositionStart error", e);
    }
  };
};
export const fetchPositionSuccess = (positionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: positionData,
});

export const fetchPositionFailed = () => ({
  type: actionTypes.FETCH_POSITION_FAILED,
});

//role
export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("ROLE");
      if (res && res.errCode === 0) {
        dispatch(fetchRoleSuccess(res.data));
      } else {
        dispatch(fetchRoleFailed());
      }
    } catch (e) {
      dispatch(fetchRoleFailed());
      console.log("fetchRoleStart error", e);
    }
  };
};
export const fetchRoleSuccess = (roleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: roleData,
});

export const fetchRoleFailed = () => ({
  type: actionTypes.FETCH_ROLE_FAILED,
});
//create new user
export const createNewUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewUserService(data);
      console.log("check api", res);
      if (res && res.errCode === 0) {
        toast.success("Create a new user succeed!");
        dispatch(saveUserSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        toast.error("Create a new user error!");
        dispatch(saveUserFailed());
      }
    } catch (e) {
      toast.error("Create a new user error!");
      dispatch(saveUserFailed());
      console.log("createNewUser error", e);
    }
  };
};

export const saveUserSuccess = () => ({
  type: actionTypes.CREATE_USER_SUCCESS,
});

export const saveUserFailed = () => ({
  type: actionTypes.CREATE_USER_FAILED,
});

export const fetchAllUsersStart = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllUsers("ALL");
      if (res && res.errCode === 0) {
        dispatch(fetchAllUsersSuccess(res.users.reverse()));
      } else {
        toast.error("Fetch all user error!");
        dispatch(fetchAllUsersFailed());
      }
    } catch (e) {
      toast.error("Fetch all user error!");

      dispatch(fetchAllUsersFailed());
      console.log("fetchAllUsersStart error", e);
    }
  };
};

export const fetchAllUsersSuccess = (userData) => ({
  type: actionTypes.FETCH_ALL_USERS_SUCCESS,
  users: userData,
});

export const fetchAllUsersFailed = () => ({
  type: actionTypes.FETCH_ALL_USERS_FAILED,
});
//delete user
export const deleteAUser = (userId) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteUserService(userId);
      console.log("check api", res);
      if (res && res.errCode === 0) {
        toast.success("Delete the user succeed!");
        dispatch(deleteUserSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        toast.error("Delete the user error!");
        dispatch(deleteUserFailed());
      }
    } catch (e) {
      toast.error("Delete the user error!");
      dispatch(deleteUserFailed());
      console.log("deleteAUser error", e);
    }
  };
};

export const deleteUserSuccess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});

export const deleteUserFailed = () => ({
  type: actionTypes.DELETE_USER_FAILED,
});
//update user
export const updateAUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await editUserService(data);
      console.log("check api", res);
      if (res && res.errCode === 0) {
        toast.success("Update the user succeed!");
        dispatch(updateUserSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        toast.error("Update the user error!");
        dispatch(updateUserFailed());
      }
    } catch (e) {
      toast.error("Update the user error!");
      dispatch(updateUserFailed());
      console.log("updateAUser error", e);
    }
  };
};

export const updateUserSuccess = () => ({
  type: actionTypes.UPDATE_USER_SUCCESS,
});

export const updateUserFailed = () => ({
  type: actionTypes.UPDATE_USER_FAILED,
});

export const fetchTopDoctors = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getTopDoctorHomeService("");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
          dataDoctors: res.data,
        });
      } else {
        dispatch({ type: actionTypes.FETCH_TOP_DOCTOR_FAILED });
      }
    } catch (e) {
      dispatch({ type: actionTypes.FETCH_TOP_DOCTOR_FAILED });
      console.log("fetchTopDoctors error", e);
    }
  };
};

export const fetchAllDoctors = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllDoctorsService();
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
          dataAllDoctors: res.data,
        });
      } else {
        dispatch({ type: actionTypes.FETCH_ALL_DOCTOR_FAILED });
      }
    } catch (e) {
      dispatch({ type: actionTypes.FETCH_ALL_DOCTOR_FAILED });
      console.log("fetchAllDoctors error", e);
    }
  };
};

export const saveDetailDoctor = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await saveDetailDoctorService(data);
      console.log(res);
      if (res && res.errCode === 0) {
        toast.success("Save info detail doctor succeed!");
        dispatch({
          type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
        });
      } else {
        toast.error("Save info detail doctor error!");
        dispatch({
          type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
        });
      }
    } catch (e) {
      toast.error("Save info detail doctor error!");
      dispatch({ type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED });
      console.log("saveDetailDoctor error", e);
    }
  };
};

export const fetchMarkdownDoctor = (doctorId) => {
  return async (dispatch, getState) => {
    try {
      let res = await getMarkdownDoctorService(doctorId);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_MARKDOWN_DOCTOR_SUCCESS,
          dataMarkdownDoctor: res.data,
        });
      } else {
        dispatch({ type: actionTypes.FETCH_MARKDOWN_DOCTOR_FAILED });
      }
    } catch (e) {
      dispatch({
        type: actionTypes.FETCH_MARKDOWN_DOCTOR_FAILED,
      });
      console.log("fetchMarkdownDoctor error", e);
    }
  };
};
