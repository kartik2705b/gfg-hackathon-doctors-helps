import axios from "axios";
import { BACKEND_URL } from "../constants";

export const LoginApi = async (payload) => {
  const response = axios
    .post(`${BACKEND_URL}/api/v1/login`, payload)
    .then((res) => {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem(
        "name",
        `${res.data.user.firstName} ${res.data.user.lastName}`
      );
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
    .put(
      `${BACKEND_URL}/api/v1/updateStatus`,
      {},
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
      };
    })
    .catch((e) => {
      return { message: e.response.data.message, status: false };
    });
  return response;
};

export const getPatientHistory = async () => {
  const response = axios
    .get(`${BACKEND_URL}/api/v1/user/history`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
    .then((res) => {
      return {
        message: res.data.message,
        status: true,
        history: res.data.history,
      };
    })
    .catch((e) => {
      return { message: e.response.data.message, status: false };
    });
  return response;
};

export const createPatientHistory = async (doctorId, fees) => {
  const response = axios
    .post(
      `${BACKEND_URL}/api/v1/create/user/history`,
      {
        id: doctorId,
        fees: fees,
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

export const getDoctorHistory = async () => {
  const response = axios
    .get(`${BACKEND_URL}/api/v1/doctor/history`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
    .then((res) => {
      return {
        message: res.data.message,
        status: true,
        history: res.data.history,
      };
    })
    .catch((e) => {
      return { message: e.response.data.message, status: false };
    });
  return response;
};

export const createDoctorHistory = async (patientId, fees) => {
  const response = axios
    .post(
      `${BACKEND_URL}/api/v1/create/doctor/history`,
      {
        id: patientId,
        fees: fees,
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

export const EmptyCart = async () => {
  const response = await axios
    .patch(
      `${BACKEND_URL}/api/v1/users/cart/clear`,
      {},
      {
        headers: { authorization: localStorage.getItem("token") },
      }
    )
    .then((res) => {
      // setCartItems(res.data.user.CartItems);
    })
    .catch((e) => {
      // console.log(e.response.data.message);
    });
  return response;
};
export const createOrder = async (cart, address, paymentId) => {
  const response = await axios
    .post(
      `${BACKEND_URL}/api/v1/orders`,
      {
        products: cart.state.cartItems,
        totalPrice: cart.state.total,
        shippingAddress: address,
        paymentId: paymentId,
      },
      {
        headers: { authorization: localStorage.getItem("token") },
      }
    )
    .then((res) => {
      // toast.success(res?.data?.message);
      EmptyCart();
      // console.log(res.data);
      // setShow(false)
    })
    .catch((e) => {
      // toast.error(e?.response?.data?.message);
      // console.log(e)
    });
  return response;
};

export const IncreaseQty = async (productId) => {
  const response = await axios
    .patch(
      `${BACKEND_URL}/api/v1/users/cart/update/${productId}`,
      { mode: "add" },
      {
        headers: { authorization: localStorage.getItem("token") },
      }
    )
    .then((res) => {
      // console.log(res.data);
      // CallRequest();
    })
    .catch((e) => {
      // console.log(e);
      // toast.error(e.response.data.message);
    });
  return response;
};

export const DecreseQty = async (productId) => {
  const response = await axios
    .patch(
      `${BACKEND_URL}/api/v1/users/cart/update/${productId}`,
      { mode: "less" },
      {
        headers: { authorization: localStorage.getItem("token") },
      }
    )
    .then((res) => {
      // console.log(res.data);
      // CallRequest();
    })
    .catch((e) => {
      // console.log(e);
      // toast.error(e.response.data.message);
    });
  return response;
};

export const getCart = async () => {
  // console.log("hit")
  const response = await axios
    .get(`${BACKEND_URL}/api/v1/user/cartItems`, {
      headers: { authorization: localStorage.getItem("token") },
    })
    .then((res) => {
      // console.log(res.data)
      // setCartItems(res.data.CartItems);
    })
    .catch((e) => {
      // toast.error(e.response.data.message);
    });

  return response;
};

export const removeCartItems = async (productId) => {
  const response = await axios
    .delete(`${BACKEND_URL}/api/v1/users/cart/delete/${productId}`, {
      headers: { authorization: localStorage.getItem("token") },
    })
    .then((res) => {})
    .catch((e) => {
      console.log(e);
      // toast.error(e.response.data.message);
    });

  return response;
};

export const AddToCart = async (productDetail, qty) => {
  const response = await axios
    .patch(
      `${BACKEND_URL}/api/v1/users/cart`,
      {
        product: productDetail,
        qty: qty,
      },
      {
        headers: { authorization: localStorage.getItem("token") },
      }
    )
    .then((res) => {
      // toast.success("Cart Item Removed");
      // console.log(res.data);
      // CallRequest();
    })
    .catch((e) => {
      // console.log(e);
      // toast.error(e.response.data.message);
    });

  return response;
};

export const getProducts = async (page) => {
  const response = await axios
    .get(`${BACKEND_URL}/api/v1/products?page=${page}`, {
      headers: { authorization: localStorage.getItem("token") },
    })
    .then((res) => {
      return {
        message: res.data.message,
        status: true,
        user: res.data.products,
      };
    })
    .catch((e) => {
      return { message: e.response.data.message, status: false };
    });

  return response;
};

export const getOrdersHistory = async(page) =>{
  const response = await axios.get(`${BACKEND_URL}/api/v1/orders?page=${page}`, {
    headers: { authorization: localStorage.getItem("token") } }).then((res)=>{
    return{
      message:res.data.message,
      status:true,
      orderHistory : res.data.orders
    }
  }).catch((E)=>{
    return{
      message:E.response.data.message,
      state:false
    }
  })
  return response;
}