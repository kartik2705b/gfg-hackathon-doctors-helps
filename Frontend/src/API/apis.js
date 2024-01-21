import axios from "axios";
import { BACKEND_URL } from "../constants";

export const LoginApi = async (payload) => {
  const response = axios
    .post(`${BACKEND_URL}/api/v1/login`, payload)
    .then((res) => {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      console.log("login res", res);
      return { message: res.data.message, status: true, user: res.data.user };
    })
    .catch((e) => {
      return { message: e.response.data.message, status: false };
    });
  return response;
};

export const RegisterApi = async (payload) => {
  const response = axios
    .post(`${BACKEND_URL}/api/v1/register`, payload)
    .then((res) => {
      return { message: res.data.message, status: true };
    })
    .catch((e) => {
      return { message: e.response.data.message, status: false };
    });
  return response;
};

export const setMappingAPI = async (roomId) => {
  const response = axios
    .post(
      `${BACKEND_URL}/api/v1/setMapping`,
      {
        roomId: roomId,
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    )
    .then((res) => {
      return { message: res.data.message, status: true };
    })
    .catch((e) => {
      return { message: e.response.data.message, status: false };
    });
  return response;
};

export const getMappedDoctors = async () => {
  const response = axios
    .get(`${BACKEND_URL}/api/v1/getMappedDoctors`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
    .then((res) => {
      return { message: res.data.message, status: true, doctors: res.data.ids };
    })
    .catch((e) => {
      return { message: e.response.data.message, status: false };
    });
  return response;
};

export const getDoctorRoomid = async (doctorid) => {
  const response = axios
    .get(
      `${BACKEND_URL}/api/v1/getDoctorRoomId/${doctorid}`,

      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    )
    .then((res) => {
      return {
        message: res.data.message,
        status: true,
        mappedData: res.data.mappedData,
      };
    })
    .catch((e) => {
      return { message: e.response.data.message, status: false };
    });
  return response;
};

export const removeMapping = async (roomId) => {
  const response = axios
    .delete(`${BACKEND_URL}/api/v1/removeMapping/${roomId}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
    .then((res) => {
      return {
        message: res.data.message,
        status: true,
      };
    })
    .catch((e) => {
      return { message: e.response.data.message, status: false };
    });
  return response;
};

export const updateStatus = async () => {
  const response = axios
    .put(`${BACKEND_URL}/api/v1/updateStatus`, {},{
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
    .then((res) => {
      return {
        message: res.data.message,
        status: true,
      };
    })
    .catch((e) => {
      return { message: e.response.data.message, status: false };
    });
  return response;
};
