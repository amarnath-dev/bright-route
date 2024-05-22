import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema } from "../../../validations/loginSchema";
import { useAppDispatch } from "../../../hooks/useAppSelector";
import { signin } from "../../../services/authServices";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import GoogleAuth from "../GoogleAuth";
import { SigninCredential } from "../../../interfaces/common.interface";
import { useEffect, useState } from "react";
import { MentorLogin } from "../../../services/authServices";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { toast } from "react-toastify";

const SigninForm: React.FC = () => {
  const [userData, setUser] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.userAuth);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const response = await axiosPrivate.get("/checkToken", {
          withCredentials: true,
        });
        if (response.data.status === "exists") {
          if (user?.role === "mentee") {
            navigate("/");
          }
          if (user?.role === "mentor") {
            console.log("Navigating");
            navigate("/mentor/home");
          }
          if (user?.role === "admin") {
            navigate("/admin/dashboard");
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
          const userData = payloadData.user;
          if (userData.role === "mentee") {
            navigate("/");
          } else if (userData?.role === "mentor") {
            //error because mentor have seperate login page
            toast.error("Canno't Find Email");
          } else if (userData.role === "admin") {
            //error because admin have seperate login page
            toast.error("Canno't Find Email");
          }
        } else {
          toast.error(payloadData.message);
        }
      }
    } catch (error) {
      console.log(error);
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
      {userData ? (
        <>
          <div className="w-full h-screen bg-background-two">
            <div className="flex justify-center items-center h-full">
              <form
                onSubmit={handleSubmit(submitDataMentor)}
                className="border border-gray-500 py-12 px-5 rounded-md"
              >
                <div className="flex">
                  <h1 className="text-md px-4 py-1 md:py-0 md:px-0 md:text-2xl font-bold mb-5 text-gray-300">
                    Log in as Mentor
                  </h1>
                  <button
                    onClick={() => setUser(false)}
                    type="button"
                    className="text-md px-5 py-1 md:px-0 md:py-0 md:text-xl h-8 font-bold text-color-five md:ml-12 underline"
                  >
                    I am a Mentee
                  </button>
                </div>
                <label className="flex justify-center">
                  <input
                    className="placeholder:text-slate-400 block border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-md focus:outline-none bg-gray-800 text-gray-300 focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-72 md:w-96 sm:text-lg"
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
                    className="placeholder:text-slate-400 block border border-slate-300 bg-gray-800 text-gray-400 rounded-md mt-4 py-2 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-72 md:w-96 sm:text-lg"
                    placeholder="Password"
                    type="password"
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
                  <h1 className="mt-3 text-white">
                    Don’t have an account?
                    <Link
                      to={"/signup"}
                      className="ml-2 text-color-five font-bold"
                    >
                      Signup
                    </Link>
                  </h1>
                </div>
                <div className="text-white text-center p-2">
                  <h6>Demo User</h6>
                  <p>
                    Email : <strong>amaranthas234@gmail.com</strong>
                  </p>
                  <p>
                    Password : <strong>Amar@12344</strong>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="w-full h-screen bg-background-two">
            <div className="flex justify-center items-center h-full py-16">
              <form
                onSubmit={handleSubmit(submitDataMentee)}
                className="border border-gray-500 py-12 px-5 rounded-md"
              >
                <div className="flex">
                  <h1 className="text-md px-4 py-1 md:py-0 md:px-0 md:text-2xl font-bold mb-5 text-white">
                    Log in as Mentee
                  </h1>
                  <button
                    type="button"
                    className="text-md px-5 py-1 md:px-0 md:py-0 md:text-xl h-8 font-bold text-color-five md:ml-12 underline"
                    onClick={() => setUser(true)}
                  >
                    I am a Mentor
                  </button>
                </div>
                <label className="flex justify-center">
                  <input
                    className="placeholder:text-slate-400 block border border-slate-300 bg-gray-800 text-gray-300 rounded-md py-2 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-72 md:w-96 sm:text-lg"
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
                    className="placeholder:text-slate-400 block border border-slate-300 bg-gray-800 text-gray-300 rounded-md mt-4 py-2 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-72 md:w-96 sm:text-lg"
                    placeholder="Password"
                    type="password"
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
                    Forgot Password?
                  </Link>
                </div>

                <div className="mt-3 flex justify-center items-center">
                  <GoogleAuth />
                </div>

                <div className="flex justify-center">
                  <h1 className="mt-3 text-gray-300 text-lg font-bold">
                    Don’t have an account?
                    <Link
                      to={"/signup"}
                      className="ml-2 text-color-five font-bold underline"
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
