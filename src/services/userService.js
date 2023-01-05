import axios from "../axios";

const handleLoginApi = (userEmail, userPassword) => {
  return axios.post("/api/login", { email: userEmail, password: userPassword });
};

const getAllUsers = (inputId) => {
  return axios.get(`/api/get-all-users?id=${inputId}`);
};

const createNewUserService = (data) => {
  return axios.post(`/api/create-new-user`, data);
};

const deleteUserService = (userId) => {
  return axios.delete(`/api/del-user`, {
    data: {
      id: userId,
    },
  });
};

const editUserService = (inputData) => {
  return axios.put(`/api/edit-user`, inputData);
};

const getAllCodeService = (inputType) => {
  return axios.get(`/api/allcode?type=${inputType}`);
};

const getTopDoctorHomeService = (limit) => {
  return axios.get(`/api/top-doctor-home?limit=${limit} `);
};

const getAllDoctorsService = (limit) => {
  return axios.get(`/api/get-all-doctors`);
};

const saveDetailDoctorService = (data) => {
  return axios.post(`/api/save-info-doctor`, data);
};

const getDetailInfoDoctorService = (inputId) => {
  return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`);
};

const saveBulkScheduleDoctorService = (data) => {
  return axios.post(`/api/bulk-create-schedule`, data);
};
const getScheduleByDateService = (doctorId, date) => {
  return axios.get(
    `/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`
  );
};

const getExtraInfoDoctorService = (doctorId, date) => {
  return axios.get(`/api/get-extra-info-doctor-by-id?doctorId=${doctorId}`);
};

export {
  handleLoginApi,
  getAllUsers,
  createNewUserService,
  deleteUserService,
  editUserService,
  getAllCodeService,
  getTopDoctorHomeService,
  getAllDoctorsService,
  saveDetailDoctorService,
  getDetailInfoDoctorService,
  saveBulkScheduleDoctorService,
  getScheduleByDateService,
  getExtraInfoDoctorService,
};
