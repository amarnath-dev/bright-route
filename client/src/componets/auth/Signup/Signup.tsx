import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "../../../validations/menteeSignupSchema";
import { Link } from "react-router-dom";
import SignupOtp from "../Modal/SignupOtp";
import GoogleAuth from "../GoogleAuth/GoogleAuth";
import Snackbar from "@mui/material/Snackbar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AxiosError } from "axios";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { signupOtpSend } from "../../../services/authServices";
import useAxiosPrivate from "../../../app/useAxiosPrivate";
import { useNavigate } from "react-router-dom";

export interface Credentials {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

const SignupForm: React.FC = () => {
  const { user } = useAppSelector((state) => state.userAuth);
  const [openModal, setOpenModal] = useState(false);
  const [open, setOpen] = useState(false);
  const { isLoading } = useAppSelector((state) => state.userAuth);
  const dispatch = useAppDispatch();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      try {
        const response = await axiosPrivate.get("/checkToken", {
          withCredentials: true,
        });
        if (response.data.status === "exists") {
          if (user?.role === "mentee") {
            navigate("/");
            return;
          }
          if (user?.role === "mentor") {
            navigate("/mentor/home");
            return;
          }
          if (user?.role === "admin") {
            navigate("/admin/dashboard");
            return;
          }
        } else {
          console.log("User not logged In");
        }
      } catch (error) {
        console.error("Error checking token:", error);
      }
    };
    checkToken();
  }, [axiosPrivate, navigate, user?.role]);

  const handleClose = (
    _event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

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
      const response = await dispatch(signupOtpSend(data));
      if (response.payload.status === "success") {
        if (response.payload.user) {
          const serverRes = response.payload.user;
          setServerResponse(serverRes);
          setOpenModal(true);
          setOpen(true);
          // toast("Email Sent Successfull");
        }
      } else {
        toast.error(response.payload.message);
      }
    } catch (error) {
      const err = error as AxiosError<{
        message?: string;
        status?: string;
      }>;
      if (err.response?.status === 409) {
        toast.error("Email Alredy Exists");
      } else {
        toast.error("Something went wrong");
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
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        message="Email sent Successfully"
      />
      {/* <ToastContainer className="w-40 md:w-80" /> */}
      {isLoading ? (
        <h1 className="font-bold">Loading...</h1>
      ) : (
        <div>
          <div className="w-full h-screen flex justify-center items-center flex-col bg-background-two">
            <form
              onSubmit={handleSubmit(submitData)}
              className="flex items-center justify-center"
            >
              <div className="mt-5 flex items-center justify-center flex-col border px-5 py-5 rounded-md">
                <h2 className="text-2xl text-center font-bold text-gray-400 py-3">
                  Sign up as Mentee
                </h2>
                <label>
                  <input
                    className="placeholder:text-slate-400 block bg-gray-800 text-gray-400 border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-72 md:w-96 sm:text-sm"
                    placeholder="First name"
                    type="text"
                    required
                    {...register("first_name")}
                  />
                  {errors.first_name && (
                    <small className="text-red-500 text-sm italic">
                      *{errors.first_name.message}
                    </small>
                  )}
                </label>
                <label>
                  <input
                    className="placeholder:text-slate-400 block bg-gray-800 text-gray-400 mt-2 border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-72 md:w-96 sm:text-sm"
                    placeholder="Last name"
                    type="text"
                    required
                    {...register("last_name")}
                  />
                  {errors.last_name && (
                    <span className="text-red-500 text-sm italic">
                      *{errors.last_name.message}
                    </span>
                  )}
                </label>
                <label>
                  <input
                    className="placeholder:text-slate-400 block bg-gray-800 text-gray-400 mt-2 border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-72 md:w-96 sm:text-sm"
                    placeholder="Email"
                    type="text"
                    required
                    {...register("email")}
                  />
                  {errors.email && (
                    <span className="text-red-500 text-sm italic">
                      *{errors.email.message}
                    </span>
                  )}
                </label>
                <label>
                  <input
                    className="placeholder:text-slate-400 block bg-gray-800 text-gray-400 mt-2 border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-72 md:w-96 sm:text-sm"
                    placeholder="Password"
                    type="password"
                    required
                    {...register("password")}
                  />
                  {errors.password && (
                    <span className="text-red-500 text-sm italic">
                      *{errors.password.message}
                    </span>
                  )}
                </label>
                <br />
                <button
                  type="submit"
                  className="bg-emerald-400 px-1 py-2 mt-1 rounded-md text-base shadow-md font-bold w-72 md:w-96 sm:text-sm text-white"
                >
                  Sign up
                </button>
                {/* Google auth */}
                <div className="flex justify-center items-center mt-5">
                  <GoogleAuth />
                </div>
              </div>
            </form>

            <span className="w-full flex justify-center items-center mt-3 text-gray-500">
              Alredy have an account?
              <Link to={"/signin"} className="ml-2 text-color-five font-bold">
                Log in
              </Link>
            </span>

            <div className="flex justify-center items-center mt-1 mb-5">
              <span className="text-gray-500">
                Apply as a mentor?
                <Link
                  to={"/mentor/apply"}
                  className="ml-2 text-color-five font-bold"
                >
                  Apply now
                </Link>
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SignupForm;
