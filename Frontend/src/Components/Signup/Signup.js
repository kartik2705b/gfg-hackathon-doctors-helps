import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import ToastContext from "../../context/toastContext";
import { BACKEND_URL } from "../../constants";
import { RegisterApi } from "../../API/apis";

const signUpSchema = z
  .object({
    firstName: z.string().min(1, { message: "Firstname is required" }),
    lastName: z.string().min(1, { message: "Lastname is required" }),
    emailId: z.string().min(1, { message: "Email is required" }).email({
      message: "Must be a valid email",
    }),
    phoneNo: z.string().min(1, { message: "Phone Number is required" }),
    password: z
      .string()
      .min(6, { message: "Password must be atleast 6 characters" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm Password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password don't match",
  });

export const Signup = () => {
  const { toast } = useContext(ToastContext);
  const [selectedRole, setSelectedRole] = useState("patient");
  const [doctorsData, setDoctorInfo] = useState({
    experience: "",
    education: "",
    fees: "",
    title: "",
    description: "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });
  const onSubmit = async (data) => {
    if (selectedRole === "doctor") {
      data.role = "doctor";
      data.doctorsData = doctorsData;
    } else {
      data.role = "patient";
    }
    console.log(data, "data");
    const response = await RegisterApi(data);
    if (!response.status) {
      toast.error(response.message);
      return;
    } else {
      console.log(response);
      toast.success(response.message);
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
      clearTimeout(() => {});
      return reset();
    }
  };

  const doctorsFields = () => {
    if (selectedRole !== "doctor") {
      return null;
    }

    return (
      <div className="space-y-4 md:space-y-6">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Experience in years
          </label>
          <input
            value={doctorsData.experience}
            onChange={(e) =>
              setDoctorInfo({ ...doctorsData, experience: e.target.value })
            }
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required=""
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Education
          </label>
          <input
            value={doctorsData.education}
            onChange={(e) =>
              setDoctorInfo({ ...doctorsData, education: e.target.value })
            }
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required=""
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Fees
          </label>
          <input
            value={doctorsData.fees}
            onChange={(e) =>
              setDoctorInfo({ ...doctorsData, fees: e.target.value })
            }
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required=""
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Title
          </label>
          <input
            value={doctorsData.title}
            onChange={(e) =>
              setDoctorInfo({ ...doctorsData, title: e.target.value })
            }
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required=""
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Description
          </label>
          <input
            value={doctorsData.description}
            onChange={(e) =>
              setDoctorInfo({ ...doctorsData, description: e.target.value })
            }
            className="bg-gray-50  border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required=""
          />
        </div>
      </div>
    );
  };
  return (
    <section class="bg-gray-50 dark:bg-gray-900 py-10 my-10">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <form
            className="px-8 pt-6 pb-8 mb-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="mb-4 md:flex md:justify-between">
              <div className="mb-4 md:mr-2 md:mb-0">
                <label
                  className="block mb-2 text-sm font-bold text-gray-700"
                  htmlFor="firstName"
                >
                  First Name
                </label>
                <input
                  className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border ${
                    errors.firstName && "border-red-500"
                  } rounded appearance-none focus:outline-none focus:shadow-outline`}
                  id="firstName"
                  type="text"
                  placeholder="First Name"
                  {...register("firstName")}
                />
                {errors.firstName && (
                  <p className="text-xs italic text-red-500 mt-2">
                    {errors.firstName?.message}
                  </p>
                )}
              </div>
              <div className="md:ml-2">
                <label
                  className="block mb-2 text-sm font-bold text-gray-700"
                  htmlFor="lastName"
                >
                  Last Name
                </label>
                <input
                  className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border ${
                    errors.lastName && "border-red-500"
                  } rounded appearance-none focus:outline-none focus:shadow-outline`}
                  id="lastName"
                  type="text"
                  placeholder="Last Name"
                  {...register("lastName")}
                />
                {errors.lastName && (
                  <p className="text-xs italic text-red-500 mt-2">
                    {errors.lastName?.message}
                  </p>
                )}
              </div>
            </div>
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="emailId"
              >
                Email
              </label>
              <input
                className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border ${
                  errors.emailId && "border-red-500"
                } rounded appearance-none focus:outline-none focus:shadow-outline`}
                id="emailId"
                type="email"
                placeholder="Email"
                {...register("emailId")}
              />
              {errors.emailId && (
                <p className="text-xs italic text-red-500 mt-2">
                  {errors.emailId?.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="phoneNo"
                className="block mb-2 text-sm font-bold text-gray-700"
              >
                Phone Number
              </label>
              <input
                className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border ${
                  errors.phoneNo && "border-red-500"
                } rounded appearance-none focus:outline-none focus:shadow-outline`}
                id="phoneNo"
                type="tel"
                placeholder="Phone Number"
                {...register("phoneNo")}
              />
              {errors.phoneNo && (
                <p className="text-xs italic text-red-500 mt-2">
                  {errors.phoneNo?.message}
                </p>
              )}
            </div>
            <div className="mb-4 md:flex md:justify-between">
              <div className="mb-4 md:mr-2 md:mb-0">
                <label
                  className="block mb-2 text-sm font-bold text-gray-700"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border ${
                    errors.password && "border-red-500"
                  } rounded appearance-none focus:outline-none focus:shadow-outline`}
                  id="password"
                  type="password"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-xs italic text-red-500 mt-2">
                    {errors.password?.message}
                  </p>
                )}
              </div>
              <div className="md:ml-2">
                <label
                  className="block mb-2 text-sm font-bold text-gray-700"
                  htmlFor="c_password"
                >
                  Confirm Password
                </label>
                <input
                  className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border ${
                    errors.confirmPassword && "border-red-500"
                  } rounded appearance-none focus:outline-none focus:shadow-outline`}
                  id="c_password"
                  type="password"
                  {...register("confirmPassword")}
                />
                {errors.confirmPassword && (
                  <p className="text-xs italic text-red-500 mt-2">
                    {errors.confirmPassword?.message}
                  </p>
                )}
              </div>
            </div>
            <div className="mb-4">
              <div className="flex items-center">
                <input
                  id="role-patient"
                  type="radio"
                  value="patient"
                  name="role"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  checked={selectedRole === "patient"}
                  onChange={() => setSelectedRole("patient")}
                />
                <label
                  htmlFor="role-patient"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Patient
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="role-doctor"
                  type="radio"
                  value="doctor"
                  name="role"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  checked={selectedRole === "doctor"}
                  onChange={() => setSelectedRole("doctor")}
                />
                <label
                  htmlFor="role-doctor"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Doctor
                </label>
              </div>
            </div>
            {selectedRole && <div>{doctorsFields()}</div>}

            <div className="mb-6 text-center mt-4">
              <button
                className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Register Account
              </button>
            </div>
            <hr className="mb-6 border-t" />
            <div className="text-center">
              <a
                className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                href="#test"
              >
                Forgot Password?
              </a>
            </div>
            <div className="text-center">
              <Link
                className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                to="/login"
              >
                Already have an account?{" "}
                <span className="font-bold">Login!</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
