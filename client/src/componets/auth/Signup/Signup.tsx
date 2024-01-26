import React, { useState } from "react";
import SignupOtp from "../Modal/SignupOtp";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "../../../validations/menteeSignupSchema";
import GoogleAuth from "../GoogleAuth/GoogleAuth";
import API from "../../../api";

interface Credentials {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

const SignupForm: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);

  const [serverResponse, setServerResponse] = useState<{
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    otp: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Credentials>({
    resolver: zodResolver(schema),
  });

  const submitData = async (data: Credentials) => {
    try {
      const response = await API.post("/signup", {
        data,
      });
      if (response.data.status === "success") {
        if (response.data.user) {
          setServerResponse(response.data.user);
          setOpenModal(true);
        }
      } else {
        console.log("something went wrong");
      }
    } catch (error) {
      if (typeof error == "string") {
        console.log(error);
      } else {
        console.log("An unexpected error occured");
      }
    }
  };

  return (
    <>
      <SignupOtp
        openModal={openModal}
        setOpenModal={setOpenModal}
        serverResponse={serverResponse}
      />
      <div>
        <div className="grid grid-cols-12 h-screen w-screen">
          <div className="hidden md:col-span-4 md:flex items-center justify-center">
            <div className="w-96">
              <img
                src="https://img.freepik.com/free-vector/login-concept-illustration_114360-739.jpg"
                alt="login_image"
              />
            </div>
          </div>

          <div className="col-span-full mx-5 md:col-span-8">
            <div className="flex items-center justify-center">
              <h2 className="mt-24 text-2xl text-center font-bold">
                Sign up as a Mentee
              </h2>
            </div>
            <form
              action=""
              onSubmit={handleSubmit(submitData)}
              className="flex items-center justify-center"
            >
              <div className="mt-5 flex items-center justify-center flex-col">
                <label>
                  {/* <span className="absolute inset-y-0 left-0 flex items-center pl-2"></span> */}
                  <input
                    className="placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-72 md:w-96 sm:text-sm"
                    placeholder="First name"
                    type="text"
                    {...register("first_name")}
                  />
                  {errors.first_name && (
                    <small className="text-red-600 text-sm italic">
                      *{errors.first_name.message}
                    </small>
                  )}
                </label>
                <label>
                  {/* <span className="absolute inset-y-0 left-0 flex items-center pl-2"></span> */}
                  <input
                    className="placeholder:text-slate-400 block bg-white mt-2 border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-72 md:w-96 sm:text-sm"
                    placeholder="Last name"
                    type="text"
                    {...register("last_name")}
                  />
                  {errors.last_name && (
                    <span className="text-red-600 text-sm italic">
                      *{errors.last_name.message}
                    </span>
                  )}
                </label>
                <label>
                  {/* <span className="absolute inset-y-0 left-0 flex items-center pl-2"></span> */}
                  <input
                    className="placeholder:text-slate-400 block bg-white mt-2 border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-72 md:w-96 sm:text-sm"
                    placeholder="Email"
                    type="text"
                    {...register("email")}
                  />
                  {errors.email && (
                    <span className="text-red-600 text-sm italic">
                      *{errors.email.message}
                    </span>
                  )}
                </label>
                <label>
                  {/* <span className="absolute inset-y-0 left-0 flex items-center pl-2"></span> */}
                  <input
                    className="placeholder:text-slate-400 block bg-white mt-2 border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-72 md:w-96 sm:text-sm"
                    placeholder="Password"
                    type="text"
                    {...register("password")}
                  />
                  {errors.password && (
                    <span className="text-red-600 text-sm italic">
                      *{errors.password.message}
                    </span>
                  )}
                </label>
                <br />
                <button
                  type="submit"
                  className="border-2 border-slate-300 bg-emerald-400 px-1 py-1 mt-3 rounded-md text-base shadow-md font-bold w-72 md:w-96 sm:text-sm"
                >
                  Sign up
                </button>
              </div>
            </form>

            {/* Google auth */}
            <div className="flex justify-center items-center mt-5">
              <GoogleAuth />
            </div>

            <span className="w-full flex justify-center items-center mt-3">
              Alredy have an account?
              <h6 className="text-blue-500 underline cursor-pointer">Log in</h6>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupForm;
