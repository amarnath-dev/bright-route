import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema } from "../../../validations/loginSchema";
import { useAppDispatch } from "../../../app/hooks";
import { signin } from "../../../services/authServices";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import GoogleAuth from "../GoogleAuth/GoogleAuth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SigninCredential } from "../../../datatypes/Datatypes";
import { useEffect, useState } from "react";
import { MentorLogin } from "../../../services/authServices";
import useAxiosPrivate from "../../../app/useAxiosPrivate";
import { useAppSelector } from "../../../app/hooks";

const SigninForm: React.FC = () => {
  const [user, setUser] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userData = useAppSelector((state) => state.userAuth.user);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const response = await axiosPrivate.get("/checkToken", {
          withCredentials: true,
        });
        if (response.data.status === "exists") {
          if (userData?.role === "mentee") {
            navigate("/");
            return;
          }
          if (userData?.role === "mentor") {
            navigate("/mentor/home");
            return;
          }
          if (userData?.role === "admin") {
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
  }, [axiosPrivate, navigate, userData?.role]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninCredential>({
    resolver: zodResolver(loginSchema),
  });

  // Menteee
  const submitDataMentee = async (data: SigninCredential) => {
    try {
      const response = await dispatch(signin(data));
      if (response) {
        const payloadData = response.payload;
        if (payloadData.status === "success") {
          const user = payloadData.user;
          if (user.role === "mentee") {
            console.log("Redirecting to home page");
            navigate("/");
          } else if (user.role === "mentor") {
            //error because mentor have seperate login page
            toast.error("Canno't Find Email");
          } else if (user.role === "admin") {
            //error because admin have seperate login page
            toast.error("Canno't Find Email");
          }
        } else {
          toast.error(payloadData.message);
        }
      }
    } catch (error) {
      if (typeof error == "string") {
        console.log(error);
      }
    }
  };

  //Mentor
  const submitDataMentor = async (data: SigninCredential) => {
    try {
      const response = await dispatch(MentorLogin(data));
      const payloadData = response.payload;
      if (payloadData.status === "success") {
        navigate("/mentor/home");
      } else {
        toast.error(payloadData.message);
      }
    } catch (error) {
      if (typeof error == "string") {
        console.log(error);
      }
    }
  };

  return (
    <>
      {user ? (
        <>
          {/* Mentee Login  */}
          <ToastContainer className="w-40 md:w-80" />
          <div className="grid grid-cols-12 w-screen h-screen">
            <div className="hidden md:col-span-4 md:flex justify-center items-center">
              <img
                src="https://media.istockphoto.com/id/1281150061/vector/register-account-submit-access-login-password-username-internet-online-website-concept.jpg?s=612x612&w=0&k=20&c=9HWSuA9IaU4o-CK6fALBS5eaO1ubnsM08EOYwgbwGBo="
                alt="signin_img"
                className="ml-28"
              />
            </div>

            <div className="col-span-full flex justify-center mt-20 md:mt-28 md:col-span-8">
              <form onSubmit={handleSubmit(submitDataMentor)}>
                <div className="flex">
                  <h1 className="text-md px-4 py-1 md:py-0 md:px-0 md:text-2xl font-bold mb-5">
                    Log in as mentor
                  </h1>
                  <button
                    onClick={() => setUser(false)}
                    type="button"
                    className="text-md px-5 py-1 md:px-0 md:py-0 md:text-xl h-8 font-bold text-color-five md:ml-12 underline"
                  >
                    I am a mentee
                  </button>
                </div>
                <label className="flex justify-center">
                  <input
                    className="placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-72 md:w-96 sm:text-lg"
                    placeholder="Email"
                    type="email"
                    {...register("email")}
                  />
                </label>
                <div className="flex flex-col">
                  {errors.email && (
                    <small className="text-red-600 text-sm italic">
                      *{errors.email.message}
                    </small>
                  )}
                </div>
                <label className="flex justify-center flex-row">
                  <input
                    className="placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md mt-4 py-2 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-72 md:w-96 sm:text-lg"
                    placeholder="Password"
                    type="text"
                    {...register("password")}
                  />
                </label>
                <div className="flex flex-col">
                  {errors.password && (
                    <small className="text-red-600 text-sm italic">
                      *{errors.password.message}
                    </small>
                  )}
                </div>
                <br />
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="border-1 border-slate-300 mt-2 bg-color-five text-white rounded-md font-bold py-2 w-72 md:w-96 sm:text-lg"
                  >
                    Signin
                  </button>
                </div>
                <div className="flex justify-center">
                  <h1 className="mt-3">
                    Don’t have an account?
                    <Link
                      to={"/signup"}
                      className="ml-2 text-color-five font-bold"
                    >
                      Signup
                    </Link>
                  </h1>
                </div>
              </form>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Mentee Login  */}
          <ToastContainer className="w-40 md:w-80" />
          <div className="grid grid-cols-12 w-screen h-screen">
            <div className="hidden md:col-span-4 md:flex justify-center items-center">
              <img
                src="https://st.depositphotos.com/18722762/51522/v/450/depositphotos_515228796-stock-illustration-online-registration-sign-login-account.jpg"
                alt="signin_img"
                className="ml-28"
              />
            </div>

            <div className="col-span-full flex justify-center mt-20 md:mt-28 md:col-span-8">
              <form onSubmit={handleSubmit(submitDataMentee)}>
                <div className="flex">
                  <h1 className="text-md px-4 py-1 md:py-0 md:px-0 md:text-2xl font-bold mb-5">
                    Log in as mentee
                  </h1>
                  <button
                    type="button"
                    className="text-md px-5 py-1 md:px-0 md:py-0 md:text-xl h-8 font-bold text-color-five md:ml-12 underline"
                    onClick={() => setUser(true)}
                  >
                    I am a mentor
                  </button>
                </div>
                <label className="flex justify-center">
                  <input
                    className="placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-72 md:w-96 sm:text-lg"
                    placeholder="Email"
                    type="email"
                    {...register("email")}
                  />
                </label>
                <div className="flex flex-col">
                  {errors.email && (
                    <small className="text-red-600 text-sm italic">
                      *{errors.email.message}
                    </small>
                  )}
                </div>
                <label className="flex justify-center flex-row">
                  <input
                    className="placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md mt-4 py-2 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-72 md:w-96 sm:text-lg"
                    placeholder="Password"
                    type="text"
                    {...register("password")}
                  />
                </label>
                <div className="flex flex-col">
                  {errors.password && (
                    <small className="text-red-600 text-sm italic">
                      *{errors.password.message}
                    </small>
                  )}
                </div>
                <br />
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="border-1 border-slate-300 bg-color-five text-white rounded-md font-bold py-2 w-72 md:w-96 sm:text-lg"
                  >
                    Signin
                  </button>
                </div>
                <div className="mt-2">
                  <Link
                    to={"/forgotpassword"}
                    className="text-blue-500 underline"
                  >
                    Forgot Password ?
                  </Link>
                </div>

                <div className="mt-3 flex justify-center items-center">
                  <GoogleAuth />
                </div>

                <div className="flex justify-center">
                  <h1 className="mt-3">
                    Don’t have an account?
                    <Link
                      to={"/signup"}
                      className="ml-2 text-color-five font-bold"
                    >
                      Signup
                    </Link>
                  </h1>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SigninForm;
