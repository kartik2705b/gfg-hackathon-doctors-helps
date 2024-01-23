import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LoginApi } from "../API/apis";
import ToastContext from "../context/toastContext";
import { SocketContext } from "../SocketContext";

const Login = (props) => {
  const { toast } = useContext(ToastContext);
  const [data, setData] = useState({ username: "", password: "" });
  const {
    meetingCode,
    setMeetingCode,
    setNewMeet,
    whoAccessing,
    setWhoAccessing,
  } = useContext(SocketContext);

  //   useEffect(() => {
  //     console.log(props.history);
  //   }, []);

  const handleChange = (e) => {
    // storing Form Data
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(data);
    const response = await LoginApi(data);
    console.log("login res", response);
    if (response.status) {
      toast.success(response.message);
      const { user } = response;
      if (user.role === "doctor") {
        console.log("doctor accessing");
        props.history.push("doctordashboard");
      } else {
        console.log("patient accessing");
        setWhoAccessing("patient");
        props.history.push("patientdashboard");
      }
    } else {
      toast.error(response.message);
    }

    //  if(localStorage.getItem('role') === 'patient'){
    //   window.location.href = "/"
    //  }else{
    //   window.location.href = "/"
    //  }
  };

  return (
    <section class="bg-[#F2F4EA]">
      <div class="flex flex-col items-center justify-center px-6 h-screen">
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center">
              Login
            </h1>
            <form class="space-y-4 md:space-y-6">
              <div>
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your Email / Phone Number
                </label>
                <input
                  type="text"
                  value={data.username}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  name="username"
                  id="username"
                  class="bg-gray-50 border border-green-300 text-gray-900 sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 "
                  placeholder="name@company.com / 1234567890"
                  required="true"
                />
              </div>
              <div>
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={data.password}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  id="password"
                  placeholder="••••••••"
                  class="bg-gray-50 border border-green-300 text-gray-900 sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 "
                  required=""
                />
              </div>

              <button
                class="w-full text-white bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-md px-5 py-2.5 text-center"
                // onClick={() => {
                //   props.history.push("doctors");
                // }}
                onClick={handleLogin}
              >
                Login
              </button>
              <p class="text-sm font-light text-gray-500 text-center">
                Dont have an account?{" "}
                <Link
                  to="/"
                  className="font-medium text-green-600 hover:underline"
                >
                  Signup here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
