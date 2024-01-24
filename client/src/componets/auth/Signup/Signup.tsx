import React, { useEffect, useState } from "react";
import SignupOtp from "../Modal/SignupOtp";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "../../../validations/menteeSignupSchema";
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

  useEffect(() => {
    console.log("state data", serverResponse);
  }, [serverResponse]);

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
              <h2 className="mt-28 text-2xl text-center font-bold">
                Sign up as a Mentee
              </h2>
            </div>

            <form
              action=""
              onSubmit={handleSubmit(submitData)}
              className="flex items-center justify-center"
            >
              
              <div className="mt-5">
                <label>
                  <span className="absolute inset-y-0 left-0 flex items-center pl-2"></span>
                  <input
                    className="placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-96 sm:text-sm"
                    placeholder="First name"
                    type="text"
                    {...register("first_name")}
                  />
                  {errors.first_name && (
                    <span className="text-red-600 text-sm italic">
                      *{errors.first_name.message}
                    </span>
                  )}
                </label>
                <label>
                  <span className="absolute inset-y-0 left-0 flex items-center pl-2"></span>
                  <input
                    className="placeholder:text-slate-400 block bg-white w-96 mt-2 border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 sm:text-sm"
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
                  <span className="absolute inset-y-0 left-0 flex items-center pl-2"></span>
                  <input
                    className="placeholder:text-slate-400 block bg-white w-96 mt-2 border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 sm:text-sm"
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
                  <span className="absolute inset-y-0 left-0 flex items-center pl-2"></span>
                  <input
                    className="placeholder:text-slate-400 block bg-white w-96 mt-2 border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 sm:text-sm"
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
                <button
                  type="submit"
                  className="border-2 border-slate-300 bg-emerald-400 px-1 py-1 w-96 mt-5 rounded-md text-base shadow-md font-bold"
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupForm;
